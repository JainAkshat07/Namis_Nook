// One-time migration: pushes the current categories + products into Sanity.
// Run once after setting SANITY_WRITE_TOKEN in .env:
//   node scripts/migrate.mjs
//
// It is safe to re-run: it uses fixed document ids and createOrReplace,
// so it updates the same documents instead of creating duplicates.

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env (simple parser, no extra dependency).
const env = {};
try {
  for (const line of readFileSync(join(__dirname, "..", ".env"), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  // ignore, fall back to process.env
}

const projectId = env.VITE_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
const dataset = env.VITE_SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production";
const token = env.SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "\n✗ Missing SANITY_WRITE_TOKEN.\n" +
      "  1. Go to https://www.sanity.io/manage -> your project -> API -> Tokens\n" +
      "  2. Add a token with 'Editor' permission, copy it\n" +
      "  3. Paste it into .env as SANITY_WRITE_TOKEN=... then run again.\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const assetsDir = join(__dirname, "..", "src", "assets", "products");

const categories = [
  { slug: "toys", title: "Toys", order: 1 },
  { slug: "keychains", title: "Keychains", order: 2 },
  { slug: "flowers", title: "Bouquets & Flowers", order: 3 },
  { slug: "hairbands", title: "Hairbands", order: 4 },
  { slug: "gift-baskets", title: "Gift Baskets", order: 5 },
  { slug: "home-decor", title: "Home Decor", order: 6 },
  { slug: "clothes", title: "Clothes", order: 7 },
];

// Placeholder image per category (real photos are uploaded later via the Studio).
const imageForCategory = {
  keychains: "placeholder-keychain.svg",
  toys: "placeholder-toy.svg",
  flowers: "placeholder-bouquet.svg",
  hairbands: "placeholder-hairband.svg",
  "gift-baskets": "placeholder-giftbasket.svg",
  "home-decor": "placeholder-homedecor.svg",
  clothes: "placeholder-clothes.svg",
};

const products = [
  { name: "Heart Keychain", category: "keychains", price: 149, description: "A sweet little crochet heart to brighten up your keys or bag.", size: "6 cm × 6 cm", materials: "Soft acrylic wool, metal key ring", colours: "Red, pink, or any colour on request", care: "Spot clean gently; do not machine wash.", madeToOrder: "3–4 days" },
  { name: "Flower Keychain", category: "keychains", price: 169, description: "A cheerful wool flower charm, available in any colour you like.", size: "7 cm across", materials: "Soft acrylic wool, metal key ring", colours: "Choose any petal + centre colour", care: "Spot clean gently; do not machine wash.", madeToOrder: "3–4 days" },
  { name: "Bee Keychain", category: "keychains", price: 179, description: "An adorable buzzy bee — a tiny handmade companion.", size: "6 cm × 5 cm", materials: "Soft acrylic wool, metal key ring, safety eyes", colours: "Classic yellow & black", care: "Spot clean gently; do not machine wash.", madeToOrder: "3–4 days" },
  { name: "Cuddly Bunny", category: "toys", price: 649, description: "A soft, huggable crochet bunny, perfect for little hands.", size: "22 cm tall", materials: "Soft acrylic wool, hypoallergenic filling, safety eyes", colours: "Cream, grey, or pastel on request", care: "Surface wash only; air dry.", madeToOrder: "5–7 days" },
  { name: "Sleepy Bear", category: "toys", price: 699, description: "A gentle bear ready for cuddles and bedtime stories.", size: "24 cm tall", materials: "Soft acrylic wool, hypoallergenic filling, safety eyes", colours: "Brown, honey, or pastel on request", care: "Surface wash only; air dry.", madeToOrder: "5–7 days" },
  { name: "Baby Elephant", category: "toys", price: 749, description: "A charming little elephant with floppy ears and a big heart.", size: "20 cm tall", materials: "Soft acrylic wool, hypoallergenic filling, safety eyes", colours: "Grey, blue, or pink on request", care: "Surface wash only; air dry.", madeToOrder: "5–7 days" },
  { name: "Tulip Bouquet", category: "flowers", price: 899, description: "A bunch of everlasting wool tulips that never wilt.", size: "Approx. 30 cm tall, 6 stems", materials: "Acrylic wool, floral wire stems", colours: "Mixed pastels, or choose your palette", care: "Dust lightly; keep away from moisture.", madeToOrder: "7–10 days" },
  { name: "Rose Bouquet", category: "flowers", price: 1099, description: "Timeless crochet roses — a gift that lasts forever.", size: "Approx. 32 cm tall, 6 stems", materials: "Acrylic wool, floral wire stems, wrap", colours: "Red, pink, white, or mixed", care: "Dust lightly; keep away from moisture.", madeToOrder: "7–10 days" },
  { name: "Single Sunflower Stem", category: "flowers", price: 249, description: "A single bright wool sunflower — lovely on its own or in a set.", size: "Approx. 30 cm tall, 1 stem", materials: "Acrylic wool, floral wire stem", colours: "Yellow & brown (classic)", care: "Dust lightly; keep away from moisture.", madeToOrder: "3–5 days" },
  { name: "Floral Hairband", category: "hairbands", price: 299, description: "A soft crochet hairband with a delicate wool flower accent.", size: "One size, stretchy fit", materials: "Soft acrylic wool, elastic core", colours: "Choose band + flower colour", care: "Hand wash cold; reshape and air dry.", madeToOrder: "3–4 days" },
  { name: "Bow Hairband", category: "hairbands", price: 279, description: "A cute crochet bow hairband for a playful everyday look.", size: "One size, stretchy fit", materials: "Soft acrylic wool, elastic core", colours: "Any single or two-tone combo", care: "Hand wash cold; reshape and air dry.", madeToOrder: "3–4 days", isNew: true },
  { name: "Little Joy Gift Basket", category: "gift-baskets", price: 1499, description: "A curated crochet gift basket with a keychain, flower and a small toy.", size: "Basket approx. 20 cm wide", materials: "Assorted crochet items in a woven basket", colours: "Themed palettes on request", care: "Follow care notes for each item.", madeToOrder: "7–10 days", isNew: true },
  { name: "New Baby Gift Basket", category: "gift-baskets", price: 1999, description: "A sweet welcome set with a cuddly toy, booties and a soft rattle.", size: "Basket approx. 24 cm wide", materials: "Soft baby-safe acrylic wool, woven basket", colours: "Pastel neutrals or themed", care: "Surface wash items; air dry.", madeToOrder: "10–14 days" },
  { name: "Round Table Doily", category: "home-decor", price: 399, description: "A delicate crochet doily to dress up any table or shelf.", size: "Approx. 28 cm diameter", materials: "Cotton-blend crochet thread", colours: "White, cream, or pastel", care: "Hand wash cold; press flat to dry.", madeToOrder: "5–7 days" },
  { name: "Hanging Wall Mandala", category: "home-decor", price: 799, description: "A colourful crochet mandala wall hanging to brighten any room.", size: "Approx. 30 cm diameter", materials: "Acrylic wool, wooden ring", colours: "Custom colour palette", care: "Dust gently; keep away from moisture.", madeToOrder: "7–10 days", isNew: true },
  { name: "Baby Booties", category: "clothes", price: 349, description: "Soft, warm crochet booties to keep tiny toes cosy.", size: "0–6 months (other sizes on request)", materials: "Soft baby-safe acrylic wool", colours: "Any colour on request", care: "Hand wash cold; reshape and air dry.", madeToOrder: "4–6 days" },
  { name: "Baby Beanie", category: "clothes", price: 399, description: "An adorable crochet beanie with a cosy snug fit.", size: "0–12 months (other sizes on request)", materials: "Soft baby-safe acrylic wool", colours: "Any colour on request", care: "Hand wash cold; reshape and air dry.", madeToOrder: "4–6 days", isNew: true },
];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function run() {
  console.log(`Migrating to project ${projectId} / ${dataset} ...\n`);

  // 1. Categories
  for (const c of categories) {
    await client.createOrReplace({
      _id: `category-${c.slug}`,
      _type: "category",
      title: c.title,
      slug: { _type: "slug", current: c.slug },
      order: c.order,
    });
    console.log(`  ✓ category: ${c.title}`);
  }

  // 2. Upload placeholder images once per category (reused across products).
  const assetByCategory = {};
  for (const [cat, file] of Object.entries(imageForCategory)) {
    const buffer = readFileSync(join(assetsDir, file));
    const asset = await client.assets.upload("image", buffer, { filename: file });
    assetByCategory[cat] = asset._id;
    console.log(`  ✓ image uploaded: ${file}`);
  }

  // 3. Products
  let order = 1;
  for (const p of products) {
    await client.createOrReplace({
      _id: `product-${slugify(p.name)}`,
      _type: "product",
      name: p.name,
      price: p.price,
      description: p.description,
      size: p.size,
      materials: p.materials,
      colours: p.colours,
      care: p.care,
      madeToOrder: p.madeToOrder,
      isNew: Boolean(p.isNew),
      order: order++,
      category: { _type: "reference", _ref: `category-${p.category}` },
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: assetByCategory[p.category] },
      },
    });
    console.log(`  ✓ product: ${p.name}`);
  }

  console.log(`\n✓ Done. ${categories.length} categories, ${products.length} products.`);
}

run().catch((err) => {
  console.error("\n✗ Migration failed:", err.message);
  process.exit(1);
});
