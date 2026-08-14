import { chromium } from "playwright";

/**
 * Every meaningful item lifted from the old divyaurjaa.com, checked against the
 * rebuilt site. Text is normalised (quotes, dashes, whitespace) before matching.
 */

const BASE = "http://localhost:3300";
const ROUTES = ["/", "/our-story", "/urjaa-deepak", "/artisans", "/impact", "/contact"];

const TEXT = [
  // — homepage —
  ["Urjaa Deepak · Made in Rajasthan", "hero eyebrow"],
  ["Light that heals.", "old hero headline"],
  ["Pure as prayer.", "old hero headline"],
  ["handcrafted diyas of cow dung, natural herbs, havan samagri, and other traditional ingredients", "hero paragraph"],
  ["An initiative of Chetnagram Sansthan", "parent org line"],
  ["Made by hand. Powered by purpose.", "signature"],
  ["Urjaa Deepak is a handmade diya crafted by 50+ women from a small village in Rajasthan", "what is Urjaa Deepak"],
  ["purifying the air, elevating spiritual practice, and making daily puja simpler and more meaningful", "what is Urjaa Deepak"],
  ["Every Deepak you light supports a woman's livelihood.", "pull quote"],
  ["One small flame.", "benefits headline"],
  ["Three lasting blessings.", "benefits headline"],
  ["Every Urjaa Deepak unites spiritual depth, scientific rigor, and ecological care", "benefits intro"],
  ["Elevates your Pooja", "benefit 1"],
  ["The sacred smoke radiates positive energy", "benefit 1 body"],
  ["Purifies the Air", "benefit 2"],
  ["Kills harmful airborne germs and bacteria", "benefit 2 body"],
  ["Anti-radioactive", "benefit 2 body"],
  ["Good for the Earth", "benefit 3"],
  ["100% biodegradable. The ash acts as a natural fertiliser.", "benefit 3 body"],
  ["Light. Heal. Empower.", "footer tagline"],

  // — science —
  ["Backed by Science.", "science headline"],
  ["What our grandmothers always knew, modern research has begun to prove.", "science intro"],
  ["94%", "NBRI figure"],
  ["reduction in indoor bacteria within 1 hour", "NBRI finding"],
  ["National Botanical Research Institute, Lucknow", "NBRI source"],
  ["Journal of Environmental Sciences", "second source"],
  ["cow dung biochar significantly reduced E. coli & Staphylococcus aureus", "second finding"],
  ["The science of havan", "science note 1"],
  ["serotonin and dopamine", "science note 1 body"],
  ["Fire gazing", "science note 2"],
  ["Alpha and Beta brain waves", "science note 2 body"],
  ["Ancient wisdom, modern proof.", "science closing"],

  // — product —
  ["Urjaa Deepak", "product name"],
  ["The sacred diya, reimagined.", "product tagline"],
  ["₹399", "price"],
  ["per box", "price unit"],
  ["Each box contains 30 Urjaa Deepaks with wick, one clay diya to place the Urjaa Deepaks in, and camphor (kapoor).", "box contents"],
  ["UD-001", "SKU"],
  ["In stock · ready to ship", "availability"],
  ["Checkout with bank transfer or UPI · upload payment screenshot", "checkout note"],
  ["One deepak. Many blessings.", "product headline"],
  ["Handcrafted in small batches.", "product intro"],

  // — ingredients —
  ["Cow Dung", "ingredient 1"],
  ["Used in Ayurveda for centuries.", "ingredient 1 body"],
  ["natural insect repellent", "ingredient 1 body"],
  ["Natural Herbs", "ingredient 2"],
  ["A thoughtful blend of dried herbs", "ingredient 2 body"],
  ["Havan Samagri", "ingredient 3"],
  ["so the smoke carries the intention of yajna", "ingredient 3 body"],
  ["Sesame", "ingredient 4"],
  ["The full recipe also includes many other natural ingredients", "ingredient closing"],

  // — ritual —
  ["Place the Urjaa Deepak in a safe diya stand", "ritual 01"],
  ["Insert the wick into the Urjaa Deepak.", "ritual 02"],
  ["Sprinkle a little kapoor (camphor) into the Deepak.", "ritual 03"],
  ["Light the Deepak.", "ritual 04"],
  ["Gradually add ghee while reciting any mantra of your choice.", "ritual 05"],
  ["Breathe calmly as the entire Deepak lights up", "ritual 06"],
  ["After pooja, the ash can be used as a natural fertiliser.", "ritual 07"],

  // — FAQ (answers recovered from the old JS bundle) —
  ["What is the price of Urjaa Deepak?", "faq 1"],
  ["not per single Deepak", "faq 1 answer"],
  ["How long does one Deepak burn?", "faq 2"],
  ["About 15–20 minutes if you keep adding ghee gradually as it burns.", "faq 2 answer"],
  ["Is it safe for children and pets?", "faq 3"],
  ["All ingredients are 100% natural with no chemical additives.", "faq 3 answer"],
  ["Can it be used for havan?", "faq 4"],
  ["designed specifically for both daily puja and small havans", "faq 4 answer"],

  // — about / our story —
  ["Purpose-driven.", "about headline"],
  ["Youth-led. Community-rooted.", "about headline"],
  ["Divya Urjaa began in 2016 as an initiative of Chetnagram Sansthan", "origin"],
  ["Mrs Vibha Agarwal", "founder"],
  ["Gurudev Pandit Shri Ram Sharma Acharya", "blessing"],
  ["self-help groups (SHGs) and other underprivileged women", "SHG paragraph"],
  ["Junior Wing", "junior wing"],
  ["We saw that the women of this village had real skill", "market access paragraph"],
  ["Today, handcrafted deepaks travel from this village into homes across India.", "closing paragraph"],
  ["carries light from our village into yours", "blessing quote"],
  ["See the story in motion.", "video headline"],
  ["A short overview of who we are, what we make, and the women behind every flame.", "video body"],
  ["Chetnagram Sansthan", "NGO name"],
  ["A community-rooted NGO operating in rural Rajasthan since 2015", "NGO body"],
  ["187", "villages reached"],
  ["Chetnagram Sansthan founded", "timeline 2015"],
  ["Women empowerment through skill development camps: stitching, beauty, yoga, technology", "timeline"],
  ["Cleanliness drives, nasha mukti, renovation of anganbadi schools", "timeline"],
  ["Kanyadan for the needy", "timeline"],
  ["Punswan sanskar", "timeline"],
  ["Free medical camps for villagers", "timeline"],
  ["Annual plantation drives", "timeline"],
  ["All profits are reinvested into the welfare and development of the women artisans.", "commitment"],

  // — impact —
  ["Every deepak you light", "impact headline"],
  ["changes a life.", "impact headline"],
  ["We measure success not in units sold, but in households strengthened", "impact intro"],
  ["₹5,00,000", "livelihoods figure"],
  ["Livelihoods Supported", "stat label"],
  ["Women Artisans", "stat label"],
  ["Year Established", "stat label"],
  ["Rajasthan", "village location"],
  ["Behind every flame,", "makers headline"],
  ["a name.", "makers headline"],
  ["Guddu devi", "artisan 1"],
  ["हर दीपक के साथ, एक घर और मज़बूत होता है।", "artisan 1 quote"],
  ["Hansa Jangid", "artisan 2"],
  ["हर दीपक में एक कहानी है — हमारी।", "artisan 2 quote"],
  ["Sangeeta Sharma", "artisan 3"],
  ["गाँव की मिट्टी से बना, हमारी मेहनत से सजा।", "artisan 3 quote"],
  ["Support by buying.", "impact CTA"],
  ["Every order is a wage, a meal, a step forward.", "impact CTA body"],

  // — testimonials —
  ["Lighting the Urjaa Deepak every morning has changed our puja routine completely.", "testimonial 1"],
  ["Priya S.", "testimonial 1 name"],
  ["Jaipur", "testimonial 1 location"],
  ["Such a meaningful product. Love that it supports village women and is 100% natural.", "testimonial 2"],
  ["Meera K.", "testimonial 2 name"],
  ["Delhi", "testimonial 2 location"],
  ["Burns cleanly, no harsh smoke. Perfect for our daily havan.", "testimonial 3"],
  ["Rajesh T.", "testimonial 3 name"],
  ["Mumbai", "testimonial 3 location"],
  ["Carried into homes across India.", "testimonials headline"],

  // — contact —
  ["Get in", "contact headline"],
  ["touch", "contact headline"],
  ["For bulk orders, NGO partnerships, or CSR gifting, reach out directly.", "contact intro"],
  ["info.divyaurja@gmail.com", "email"],
  ["Every conversation is an opportunity", "contact quote"],
  ["General Enquiry", "form subject"],
  ["Bulk Order", "form subject"],
  ["Partnership", "form subject"],
  ["Media", "form subject"],
  ["Full name", "form field"],
  ["Message", "form field"],
];

const RUNTIME_VIDEO = [
  ["/", "/videos/hero-", "hero flame film"],
  ["/", "/videos/ritual-", "ritual ghee film"],
];

const MEDIA = [
  ["/images/process/gaushala.jpg", "DSC08741 — gaushala"],
  ["/images/process/collective.jpg", "DSC08747 — eleven artisans"],
  ["/images/process/shaping.jpg", "DSC08749 — shaping by hand"],
  ["/images/artisans/guddu-devi.jpg", "DSC08763 — Guddu devi"],
  ["/images/artisans/hansa-jangid.jpg", "DSC08765 — Hansa Jangid"],
  ["/images/artisans/sangeeta-sharma.jpg", "DSC08767 — Sangeeta Sharma"],
  ["/images/story/chetnagram-collective.jpg", "DSC09556 — the collective"],
  ["/images/product/box-open.jpg", "IMG_9176 — open box"],
  ["/images/product/deepaks-flatlay.jpg", "IMG_9177 — deepaks flat lay"],
  ["/images/product/box-closed.jpg", "IMG_9178 — closed box"],
  ["/images/product/box-contents.jpg", "IMG_9179 — box contents"],
  ["/images/ritual/flame-altar.jpg", "hero-light-prayer — altar flame"],
  ["/images/story/story-poster.jpg", "overview film poster"],
  ["/images/brand/emblem.png", "official emblem"],
  ["/images/brand/wordmark.png", "official wordmark"],
];

const norm = (s) =>
  s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim()
    // `innerText` reflects text-transform, and every eyebrow/label is
    // uppercased in CSS — compare case-insensitively
    .toLowerCase();

const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();

let corpus = "";
let markup = "";
for (const r of ROUTES) {
  await page.goto(BASE + r, { waitUntil: "load", timeout: 90000 });
  // open every accordion so hidden copy counts
  // the accordion is single-open, so read each panel in turn
  const btns = await page.$$("button[aria-controls^='faq-panel-']");
  for (const b of btns) {
    if ((await b.getAttribute("aria-expanded")) === "false") await b.click();
    await page.waitForTimeout(700);
    corpus += " " + norm(await page.evaluate(() => document.body.innerText));
  }
  await page.waitForTimeout(600);
  corpus += " " + norm(await page.evaluate(() => document.body.innerText));
  markup += " " + (await page.content());
}
// the still-hero asset is referenced only when Hero runs in image mode
markup += " " + (await page.evaluate(() => "")); // no-op, keeps shape

let missing = 0;
console.log("\n=== TEXT ===");
for (const [needle, label] of TEXT) {
  if (corpus.includes(norm(needle))) continue;
  missing++;
  console.log(`MISSING  ${label}: "${needle.slice(0, 70)}"`);
}
console.log(missing ? `${missing} text item(s) missing` : `all ${TEXT.length} text items present`);

let mediaMissing = 0;
console.log("\n=== MEDIA ===");
for (const [src, label] of MEDIA) {
  const referenced = markup.includes(encodeURIComponent(src)) || markup.includes(src);
  const res = await page.request.get(BASE + src);
  const served = res.status() === 200;
  if (referenced && served) continue;
  mediaMissing++;
  console.log(`${!served ? "NOT SERVED" : "NOT REFERENCED"}  ${label} (${src})`);
}
console.log(
  mediaMissing ? `${mediaMissing} media item(s) flagged` : `all ${MEDIA.length} media assets present and served`,
);

// videos: src is assigned in JS, so check what the browser actually fetches
console.log("\n=== VIDEO (runtime-loaded) ===");
let videoMissing = 0;
{
  await page.goto(BASE + "/", { waitUntil: "load", timeout: 90000 });
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(2500);
  const srcs = await page.evaluate(() =>
    [...document.querySelectorAll("video")].map((v) => v.currentSrc || v.src),
  );
  for (const [, prefix, label] of RUNTIME_VIDEO) {
    if (srcs.some((s) => s.includes(prefix))) console.log(`ok  ${label} loaded`);
    else { videoMissing++; console.log(`MISSING ${label} (no ${prefix}* loaded)`); }
  }

  // the overview film is opt-in; press play and confirm it resolves
  await page.goto(BASE + "/our-story", { waitUntil: "load", timeout: 90000 });
  await page.waitForTimeout(1200);
  await page.click("button[aria-label='Play the Divya Urjaa overview film']");
  await page.waitForTimeout(2500);
  const story = await page.evaluate(() =>
    [...document.querySelectorAll("video")].map((v) => v.currentSrc || v.src),
  );
  if (story.some((s) => s.includes("/videos/story-"))) console.log("ok  overview film loaded on press");
  else { videoMissing++; console.log("MISSING overview film did not load"); }
}

const total = missing + mediaMissing + videoMissing;
console.log(`\n${total === 0 ? "MIGRATION COMPLETE" : `${total} item(s) need attention`}`);
await browser.close();
