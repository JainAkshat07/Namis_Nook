import { useEffect } from "react";
import { site } from "../data/site";
import { useCart, priceToNumber } from "../context/cart-core";

export default function CartDrawer() {
  const { items, total, count, isOpen, closeCart, setQty, removeItem, clear } =
    useCart();

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const checkout = () => {
    if (items.length === 0) return;
    const lines = items.map(
      (i) =>
        `• ${i.name} × ${i.qty} — ${site.currency}${priceToNumber(i.price) * i.qty}`
    );
    const text =
      `Hi! I'd like to order:\n${lines.join("\n")}\n\n` +
      `Total: ${site.currency}${total}\n\n` +
      `Please note:\n` +
      `• Delivery charges will be added based on the delivery location.\n` +
      `• As each item is handmade, slight variations in appearance may occur. The final product may differ slightly from the photos.\n\n` +
      `My name is: ______`;

    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener"
    );
  };

  return (
    <div
      className={`cart-root${isOpen ? " is-open" : ""}`}
      aria-hidden={!isOpen}
    >
      <div className="cart-overlay" onClick={closeCart}></div>
      <aside
        className="cart-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <header className="cart-header">
          <h3>Your Cart {count > 0 && <span>({count})</span>}</h3>
          <button className="cart-close" aria-label="Close cart" onClick={closeCart}>
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <p className="cart-empty-sub">Add some handmade goodies to get started!</p>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((i) => (
                <li className="cart-item" key={i.id}>
                  <img src={i.image} alt={i.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{i.name}</p>
                    <p className="cart-item-price">{i.price}</p>
                    <div className="qty">
                      <button
                        aria-label={`Decrease quantity of ${i.name}`}
                        onClick={() => setQty(i.id, i.qty - 1)}
                      >
                        −
                      </button>
                      <span aria-live="polite">{i.qty}</span>
                      <button
                        aria-label={`Increase quantity of ${i.name}`}
                        onClick={() => setQty(i.id, i.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    aria-label={`Remove ${i.name}`}
                    onClick={() => removeItem(i.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <footer className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <strong>
                  {site.currency}
                  {total}
                </strong>
              </div>
              <button className="btn btn-primary cart-checkout" onClick={checkout}>
                Proceed to buy on WhatsApp
              </button>
              <button className="cart-clear" onClick={clear}>
                Clear cart
              </button>
              <p className="cart-note">
                Orders are confirmed over WhatsApp — you can adjust colours &
                sizes there before paying.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
