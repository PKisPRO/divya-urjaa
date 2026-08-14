import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "/private/tmp/claude-501/-Users-panavgupta-Desktop-divya-urja-jai/9d598f3c-7032-46cc-9fc1-df1b9bcbc5d6/scratchpad/shots";
mkdirSync(OUT, { recursive: true });

const route = process.argv[2] || "/";
const slug = process.argv[3] || "home";
const viewports = (process.argv[4] || "1440x900,390x844").split(",").map((v) => {
  const [w, h] = v.split("x").map(Number);
  return { width: w, height: h };
});
// scroll stops as fractions of full page height
const stops = (process.argv[5] || "0,0.12,0.25,0.38,0.5,0.62,0.75,0.88,1")
  .split(",")
  .map(Number);

const browser = await chromium.launch();

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: vp,
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });
  const page = await ctx.newPage();

  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));

  await page.goto("http://localhost:3300" + route, {
    waitUntil: "networkidle",
    timeout: 90000,
  });
  await page.waitForTimeout(2500);

  // walk the whole page once so scroll-driven work settles the way it would
  // for a real visitor, then return to the top before capturing
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);

  const h = await page.evaluate(() => document.body.scrollHeight);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );

  let i = 0;
  for (const s of stops) {
    const y = Math.round((h - vp.height) * s);
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(1400);
    await page.screenshot({
      path: `${OUT}/${slug}-${vp.width}-${String(i).padStart(2, "0")}.png`,
    });
    i++;
  }

  console.log(
    `[${slug} ${vp.width}x${vp.height}] height=${h} hOverflow=${overflow} errors=${errors.length}`,
  );
  errors.slice(0, 12).forEach((e) => console.log("   ! " + e.slice(0, 220)));
  await ctx.close();
}

await browser.close();
