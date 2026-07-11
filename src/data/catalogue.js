import { sanityClient, sanityConfigured, urlForImage } from "../lib/sanityClient";
import { site } from "../data/site";
import {
  products as fallbackProducts,
  categories as fallbackCategories,
} from "../data/products";

const PRODUCTS_QUERY = `*[_type == "product"] | order(coalesce(order, 9999) asc, _createdAt desc){
  _id, name, price, description, size, materials, colours, care, madeToOrder, isNew,
  image, "categorySlug": category->slug.current
}`;

const CATEGORIES_QUERY = `*[_type == "category"] | order(coalesce(order, 9999) asc, title asc){
  "id": slug.current, "label": title
}`;

// Convert a Sanity product document into the shape the UI components expect.
function toProduct(doc) {
  return {
    id: doc._id,
    name: doc.name,
    category: doc.categorySlug || "",
    price: `${site.currency}${Number(doc.price || 0).toLocaleString("en-IN")}`,
    image: urlForImage(doc.image),
    description: doc.description || "",
    size: doc.size || "",
    materials: doc.materials || "",
    colours: doc.colours || "",
    care: doc.care || "",
    madeToOrder: doc.madeToOrder || "",
    isNew: Boolean(doc.isNew),
  };
}

// Fetch products + categories from Sanity. Falls back to the bundled data
// if Sanity isn't configured, is unreachable, or returns nothing.
export async function fetchCatalogue() {
  if (!sanityConfigured || !sanityClient) {
    return { products: fallbackProducts, categories: fallbackCategories };
  }
  try {
    const [docs, cats] = await Promise.all([
      sanityClient.fetch(PRODUCTS_QUERY),
      sanityClient.fetch(CATEGORIES_QUERY),
    ]);

    if (!docs || docs.length === 0) {
      return { products: fallbackProducts, categories: fallbackCategories };
    }

    const products = docs.map(toProduct);
    const categories =
      cats && cats.length
        ? [
            { id: "all", label: "All" },
            { id: "new", label: "New Arrivals" },
            ...cats,
          ]
        : fallbackCategories;

    return { products, categories };
  } catch (err) {
    console.warn("Falling back to local products:", err);
    return { products: fallbackProducts, categories: fallbackCategories };
  }
}
