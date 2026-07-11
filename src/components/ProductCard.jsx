import { useCart } from "../context/cart-core";

export default function ProductCard({ product, onSelect }) {
  const { addItem } = useCart();

  const open = () => onSelect(product);
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <article
      className="product-card"
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={onKeyDown}
      aria-label={`View details for ${product.name}`}
    >
      <div className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.isNew && <span className="product-badge">New</span>}
        <span className="product-hint">View details</span>
      </div>
      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{product.price}</span>
          <button
            className="btn btn-small"
            onClick={(e) => {
              e.stopPropagation();
              addItem(product);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
