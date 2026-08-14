import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3300/our-story", { waitUntil: "load", timeout: 90000 });
await p.waitForTimeout(2000);
const info = await p.evaluate(() => {
  const btn = document.querySelector("button[aria-label='Play the Divya Urjaa overview film']");
  const chain = [];
  let el = btn;
  while (el && el.tagName !== "BODY") {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    chain.push(`${el.tagName}.${String(el.className).slice(0,60)} | ${Math.round(r.width)}x${Math.round(r.height)} pos=${s.position} display=${s.display}`);
    el = el.parentElement;
  }
  return chain;
});
console.log(info.join("\n"));
await b.close();
