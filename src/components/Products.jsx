import { useEffect, useMemo, useState } from "react";
import {
  products as fallbackProducts,
  categories as fallbackCategories,
} from "../data/products";
import { fetchCatalogue } from "../data/catalogue";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export default function Products() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [products, setProducts] = useState(fallbackProducts);
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchCatalogue().then((data) => {
      if (!active) return;
      setProducts(data.products);
      setCategories(data.categories);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const visible = useMemo(() => {
    if (filter === "all") return products;
    if (filter === "new") return products.filter((p) => p.isNew);
    return products.filter((p) => p.category === filter);
  }, [filter, products]);

  return (
    <section id="products" className="section">
      <div className="container">
        <div className="section-head">
          <span className="explore-link">
            <span aria-hidden="true">♥</span> Explore our collection
          </span>
          <h2>Shop by Category</h2>
          <p>
            Every item is made to order. Tap “Order” to enquire about colours
            and customisation.
          </p>
        </div>

        <div className="filters" role="tablist" aria-label="Filter products">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`filter${filter === c.id ? " is-active" : ""}`}
              onClick={() => setFilter(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="products-status">Loading products…</p>
        ) : visible.length === 0 ? (
          <p className="products-status">No products in this category yet.</p>
        ) : (
          <div className="product-grid">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={setSelected} />
            ))}
          </div>
        )}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
