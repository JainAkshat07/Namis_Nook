# Nami's Nook — Crochet Art Website (React)

A responsive React website (built with Vite) for a handmade crochet business —
keychains, toys, and wool flower bouquets.

## Run it

```powershell
cd crochet-react
npm install      # first time only
npm run dev      # start the dev server
```

Then open the URL it prints (usually http://localhost:5173).

Other commands:
- `npm run build` — create an optimized production build in `dist/`
- `npm run preview` — preview the production build locally

## Project structure

```
src/
  main.jsx              App entry point
  App.jsx               Page layout (which sections show, in order)
  index.css            All styling (edit colours here at the top :root block)
  data/
    site.js            Business name + contact details  ← edit this
    products.js        The product list                  ← edit this
  components/
    Header.jsx  Hero.jsx  Products.jsx  ProductCard.jsx
    About.jsx   Contact.jsx  Footer.jsx
  assets/products/     Logo, illustrations, product placeholder images
```

## Add your mom's real products

You now have **two ways** to manage products:

### A. Admin dashboard (recommended — no code)

Products are stored in **Sanity** (a free content service) and edited from a
visual dashboard called the Studio (in the `studio/` folder).

**First-time setup:**

1. Create a free account + project at https://www.sanity.io (you already have
   Project ID `wymdx6sh`).
2. In the project root copy `.env.example` to `.env` (already done) — it holds
   `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET`.
3. Add the website's address as an allowed origin (CORS): go to
   https://www.sanity.io/manage → your project → **API → CORS origins → Add**,
   and add `http://localhost:5173` (and later your live site URL). Tick
   "Allow credentials" is not needed.
4. Seed your existing products into Sanity (one time):
   - Create a write token: **API → Tokens → Add token → Editor**, copy it.
   - Paste it into `.env` as `SANITY_WRITE_TOKEN=...`
   - Run: `node scripts/migrate.mjs`

**Everyday use — add/edit products:**

```powershell
cd studio
npm install   # first time only
npm run dev   # opens the admin dashboard at http://localhost:3333
```

In the dashboard: **Product → Create new**, upload a photo, type the name,
price (number only), pick a category, then **Publish**. Refresh the website and
it appears. To add a category: **Category → Create new**, set a title and click
Generate on the slug.

Deploy the dashboard online for free with `npm run deploy` inside `studio/`
(gives you a `https://<name>.sanity.studio` URL you can log into from anywhere).

### B. Edit the file directly (offline fallback)

If Sanity isn't set up (or is unreachable), the site automatically falls back to
the list in **`src/data/products.js`**:

1. Put photos into `src/assets/products/` (square photos look best).
2. Import each photo at the top, e.g. `import heart from "../assets/products/heart.jpg";`
3. Add/edit an entry in the `products` array:

```js
{
  id: 10,
  name: "Heart Keychain",
  category: "keychains",     // keychains | toys | bouquets
  price: "₹149",
  image: heart,              // the imported photo
  description: "A sweet little crochet heart.",
}
```

To add a new category, also add it to the `categories` array in the same file.

## Update contact details

Edit **`src/data/site.js`** — business name, WhatsApp number (full country code,
no `+` or spaces), Instagram handle, and email. These flow into the contact
section and the WhatsApp "Order" button on every product automatically.

## Change colours / business name

- Colours: edit the `:root` variables at the top of `src/index.css`.
- Business name: change `name` in `src/data/site.js` (also update the page
  `<title>` in `index.html` if you like).

## Deploy for free

Run `npm run build`, then upload the generated `dist/` folder to Netlify,
Vercel, or GitHub Pages.
