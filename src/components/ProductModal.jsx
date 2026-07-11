import { useEffect } from "react";
import { site } from "../data/site";
import { useCart } from "../context/cart-core";

export default function ProductModal({ product, onClose }) {
  const { addItem } = useCart();
  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!product) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const message = encodeURIComponent(
    `Hi! I'd love to order the "${product.name}" (${product.price}). Is it available?`
  );
  const orderUrl = `https://wa.me/${site.whatsapp}?text=${message}`;

  const details = [
    { label: "Size", value: product.size },
    { label: "Materials", value: product.materials },
    { label: "Colours", value: product.colours },
    { label: "Care", value: product.care },
    { label: "Made to order", value: product.madeToOrder },
  ].filter((d) => d.value);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        <div className="modal-media">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="modal-body">
          <h3 className="modal-title">{product.name}</h3>
          <p className="modal-price">{product.price}</p>
          <p className="modal-desc">{product.description}</p>

          {details.length > 0 && (
            <dl className="modal-details">
              {details.map((d) => (
                <div className="modal-detail" key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="modal-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                addItem(product);
                onClose();
              }}
            >
              Add to cart
            </button>
            <a
              className="btn btn-ghost"
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
