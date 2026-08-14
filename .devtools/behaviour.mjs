import { chromium } from "playwright";

const BASE = "http://localhost:3300";
const NEW_IG = "https://www.instagram.com/divya___urjaa/";
const OLD_IG_FRAGMENT = "divya__urjaa"; // two underscores — the suspended one

const browser = await chromium.launch();
let fails = 0;
const fail = (m) => {
  fails++;
  console.log("  FAIL " + m);
};
const ok = (m) => console.log("  ok   " + m);

/* ── 1. Instagram sweep across every route ─────────────────────────── */
console.log("\n[instagram]");
{
  const page = await (await browser.newContext()).newPage();
  for (const r of ["/", "/our-story", "/urjaa-deepak", "/artisans", "/impact", "/contact"]) {
    await page.goto(BASE + r, { waitUntil: "domcontentloaded" });
    const hrefs = await page.$$eval("a[href*='instagram']", (as) =>
      as.map((a) => a.getAttribute("href")),
    );
    const html = await page.content();
    // old handle is a strict substring of the new one, so count occurrences
    const oldCount = (html.match(/instagram\.com\/divya__urjaa/g) || []).length;
    if (oldCount) fail(`${r} still references the suspended handle`);
    const wrong = hrefs.filter((h) => h !== NEW_IG);
    if (wrong.length) fail(`${r} has non-canonical IG links: ${wrong.join(", ")}`);
    else ok(`${r} — ${hrefs.length} IG link(s), all canonical`);
  }
  // mobile menu
  const m = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await m.goto(BASE + "/", { waitUntil: "networkidle" });
  await m.click("button[aria-controls='mobile-menu']");
  await m.waitForTimeout(900);
  const menuIG = await m.$$eval("#mobile-menu a[href*='instagram']", (as) =>
    as.map((a) => a.getAttribute("href")),
  );
  if (menuIG.length && menuIG.every((h) => h === NEW_IG)) ok("mobile menu IG link canonical");
  else fail("mobile menu IG link missing/incorrect: " + JSON.stringify(menuIG));
  const menuVisible = await m.isVisible("#mobile-menu");
  menuVisible ? ok("mobile menu opens") : fail("mobile menu did not open");
  await m.keyboard.press("Escape");
  await m.waitForTimeout(1500); // the menu has an 850ms exit animation
  (await m.isVisible("#mobile-menu")) ? fail("Escape did not close menu") : ok("Escape closes menu");
}

/* ── 2. keyboard traversal ─────────────────────────────────────────── */
console.log("\n[keyboard]");
{
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const first = [];
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    first.push(
      await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return "none";
        const s = getComputedStyle(el);
        return `${el.tagName}:${(el.textContent || "").trim().slice(0, 26)}|outline=${s.outlineWidth}`;
      }),
    );
  }
  const skip = first[0].includes("Skip to content");
  skip ? ok("first tab stop is the skip link") : fail("skip link is not first: " + first[0]);
  const focusRings = first.filter((f) => !f.includes("outline=0px")).length;
  focusRings >= 8 ? ok(`visible focus ring on ${focusRings}/10 stops`) : fail(`only ${focusRings}/10 stops show a focus ring`);

  // FAQ accordion keyboard operation
  await page.goto(BASE + "/urjaa-deepak", { waitUntil: "networkidle" });
  const btn = page.locator("button[aria-controls^='faq-panel-']").nth(1);
  await btn.focus();
  const before = await btn.getAttribute("aria-expanded");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(600);
  const after = await btn.getAttribute("aria-expanded");
  before !== after ? ok("FAQ toggles via keyboard") : fail("FAQ did not toggle via keyboard");
}

/* ── 3. reduced motion: no WebGL, video falls back to poster ───────── */
console.log("\n[reduced motion]");
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
  await page.waitForTimeout(1500);
  const rm = await page.evaluate(() => ({
    canvases: document.querySelectorAll("canvas").length,
    autoplaying: document.querySelectorAll("video[autoplay]").length,
    loadedVideos: [...document.querySelectorAll("video")].filter((v) => v.currentSrc).length,
    cursor: document.documentElement.dataset.cursor ?? "off",
    // is any content still stuck hidden?
    hiddenText: [...document.querySelectorAll("h1,h2,h3,p")].filter((el) => {
      const s = getComputedStyle(el);
      return s.opacity !== "" && parseFloat(s.opacity) < 0.05;
    }).length,
  }));
  rm.canvases === 0 ? ok("no WebGL canvas mounted") : fail(`${rm.canvases} canvas mounted under reduced motion`);
  rm.autoplaying === 0 ? ok("nothing autoplays") : fail(`${rm.autoplaying} autoplaying video(s)`);
  rm.loadedVideos === 0 ? ok("no video data fetched — opt-in player only") : fail(`${rm.loadedVideos} video(s) fetched data`);
  rm.cursor === "off" ? ok("custom cursor disabled") : fail("custom cursor active");
  rm.hiddenText === 0 ? ok("no content left hidden") : fail(`${rm.hiddenText} text node(s) stuck at opacity 0`);
  errs.length ? fail("page errors: " + errs[0]) : ok("no page errors");
  await ctx.close();
}

/* ── 4. no-WebGL fallback ──────────────────────────────────────────── */
console.log("\n[webgl unavailable]");
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => {
    const orig = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (t, ...rest) {
      if (String(t).startsWith("webgl")) return null;
      return orig.call(this, t, ...rest);
    };
  });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2500);
  const headingVisible = await page
    .locator("#finale-heading")
    .isVisible()
    .catch(() => false);
  headingVisible ? ok("finale section renders without WebGL") : fail("finale heading missing without WebGL");
  errs.length ? fail("page errors: " + errs[0]) : ok("no page errors");
  await ctx.close();
}

/* ── 5. internal links resolve ─────────────────────────────────────── */
console.log("\n[links]");
{
  const page = await (await browser.newContext()).newPage();
  const seen = new Set();
  for (const r of ["/", "/our-story", "/urjaa-deepak", "/artisans", "/impact", "/contact"]) {
    await page.goto(BASE + r, { waitUntil: "domcontentloaded" });
    const hrefs = await page.$$eval("a[href^='/']", (as) =>
      as.map((a) => a.getAttribute("href")),
    );
    hrefs.forEach((h) => seen.add(h.split("#")[0]));
  }
  for (const h of [...seen].filter(Boolean)) {
    const res = await page.request.get(BASE + h);
    res.status() === 200 ? ok(`${h} → 200`) : fail(`${h} → ${res.status()}`);
  }
}

console.log(fails ? `\n${fails} check(s) FAILED` : "\nall behaviour checks passed");
await browser.close();
process.exit(fails ? 1 : 0);
