import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3300/", { waitUntil: "networkidle", timeout: 90000 });
await p.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.6);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80));
  }
  window.scrollTo(0, 0);
});
await p.waitForTimeout(1200);
const sel = process.argv[2];
const offset = Number(process.argv[3] || 0);
const box = await p.evaluate((s) => {
  const el = document.querySelector(s);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, height: r.height };
}, sel);
if (!box) { console.log("not found", sel); await b.close(); process.exit(0); }
console.log("section top", Math.round(box.top), "height", Math.round(box.height));
await p.evaluate((y) => window.scrollTo(0, y), Math.round(box.top + offset));
await p.waitForTimeout(2200);
await p.screenshot({ path: process.argv[4] });
await b.close();
