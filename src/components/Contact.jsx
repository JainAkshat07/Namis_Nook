import { site } from "../data/site";

export default function Contact() {
  const cards = [
    {
      icon: "💬",
      label: "WhatsApp",
      value: site.whatsappDisplay,
      href: `https://wa.me/${site.whatsapp}`,
    },
    {
      icon: "📸",
      label: "Instagram",
      value: `@${site.instagram}`,
      href: `https://instagram.com/${site.instagram}`,
    },
    {
      icon: "✉️",
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head">
          <h2>Place an Order / Get in Touch</h2>
          <p>Reach out on any of these — we'd love to make something special for you.</p>
        </div>
        <div className="contact-grid">
          {cards.map((c) => (
            <a
              key={c.label}
              className="contact-card"
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon">{c.icon}</span>
              <span className="contact-label">{c.label}</span>
              <span className="contact-value">{c.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
