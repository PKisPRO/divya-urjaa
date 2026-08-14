import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT =
  "/private/tmp/claude-501/-Users-panavgupta-Desktop-divya-urja-jai/9d598f3c-7032-46cc-9fc1-df1b9bcbc5d6/scratchpad/shots";
mkdirSync(OUT, { recursive: true });

const ROUTES = [
  ["/", "home"],
  ["/our-story", "story"],
  ["/urjaa-deepak", "product"],
  ["/artisans", "artisans"],
  ["/impact", "impact"],
  ["/contact", "contact"],
];

const VPS = (process.argv[2] || "1440x900,390x844")
  .split(",")
  .map((v) => {
    const [width, height] = v.split("x").map(Number);
    return { width, height };
  });

const browser = await chromium.launch();
let failures = 0;

for (const vp of VPS) {
  for (const [route, slug] of ROUTES) {
    const ctx = await browser.newContext({ viewport: vp });
    const page = await ctx.newPage();
    const errs = [];
    const bad = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
    page.on("response", (r) => {
      if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`);
    });

    await page.goto("http://localhost:3300" + route, {
      waitUntil: "networkidle",
      timeout: 90000,
    });

    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.6);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 70));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);

    const info = await page.evaluate(() => {
      const de = document.documentElement;
      const overflow = de.scrollWidth > window.innerWidth + 1;
      let widest = null;
      if (overflow) {
        for (const el of document.querySelectorAll("*")) {
          const r = el.getBoundingClientRect();
          if (r.right > window.innerWidth + 2 || r.left < -2) {
            widest = `${el.tagName}.${String(el.className).slice(0, 70)} right=${Math.round(r.right)} left=${Math.round(r.left)}`;
            break;
          }
        }
      }
      const imgs = [...document.querySelectorAll("img")];
      const noAlt = imgs.filter((i) => !i.hasAttribute("alt")).length;
      const broken = imgs.filter(
        (i) => i.complete && i.naturalWidth === 0,
      ).length;
      const h1 = document.querySelectorAll("h1").length;
      return {
        h: document.body.scrollHeight,
        overflow,
        widest,
        noAlt,
        broken,
        h1,
      };
    });

    const flag = errs.length || bad.length || info.overflow || info.h1 !== 1;
    if (flag) failures++;
    console.log(
      `${flag ? "FAIL" : "ok  "} [${vp.width}] ${route.padEnd(14)} h=${info.h} h1=${info.h1} overflow=${info.overflow} noAlt=${info.noAlt} brokenImg=${info.broken} err=${errs.length} http4xx=${bad.length}`,
    );
    if (info.widest) console.log("      widest:", info.widest);
    errs.slice(0, 4).forEach((e) => console.log("      ! " + e.slice(0, 180)));
    bad.slice(0, 4).forEach((e) => console.log("      · " + e.slice(0, 160)));

    await page.screenshot({
      path: `${OUT}/full-${slug}-${vp.width}.png`,
      fullPage: false,
    });
    await ctx.close();
  }
}

console.log(failures ? `\n${failures} route(s) flagged` : "\nall clean");
await browser.close();
