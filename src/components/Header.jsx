import { useState } from "react";
import logo from "../assets/products/nami_logo.jpg";
import { site } from "../data/site";
import { useCart } from "../context/cart-core";

const links = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Shop" },
  { href: "#custom-orders", label: "Custom Orders" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <img src={logo} alt={`${site.name} logo`} className="brand-logo" />
          <span className="brand-name">{site.name}</span>
        </a>
        <nav className="nav" aria-label="Main navigation">
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
          <ul className={`nav-list${open ? " is-open" : ""}`}>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="cart-button"
          aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
          onClick={openCart}
        >
          <span className="cart-icon" aria-hidden="true">🛒</span>
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}
