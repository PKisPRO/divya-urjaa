import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on("response", (r) => { if (r.status() >= 400) console.log(r.status(), r.url()); });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 90000 });
await p.waitForTimeout(3000);
await p.evaluate(() => window.scrollTo(0, 3000));
await p.waitForTimeout(2000);
await b.close();
