import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on("console", (m) => { if (m.type() === "error") console.log("CONSOLE:", m.text()); });
p.on("pageerror", (e) => console.log("PAGEERROR:", e.message));
await p.goto("http://localhost:3300/", { waitUntil: "networkidle", timeout: 90000 });
await p.waitForTimeout(3500);
await b.close();
