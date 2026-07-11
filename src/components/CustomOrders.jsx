import { site } from "../data/site";

const steps = [
  { n: "1", title: "Share your idea", text: "Tell us what you'd love — a character, colour theme, size or a photo for inspiration." },
  { n: "2", title: "We plan it together", text: "We'll confirm the design, wool colours, timeline and price over WhatsApp." },
  { n: "3", title: "Handmade just for you", text: "Your one-of-a-kind piece is crocheted with care and sent your way." },
];

export default function CustomOrders() {
  const text = encodeURIComponent(
    "Hi! I'd like to request a custom crochet order. Here's my idea: "
  );
  const waUrl = `https://wa.me/${site.whatsapp}?text=${text}`;

  return (
    <section id="custom-orders" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <p className="section-eyebrow">Made to your imagination</p>
          <h2>Custom Orders</h2>
          <p>
            Want something truly unique? We happily take custom requests —
            personalised toys, colours, sizes, bouquets and gift sets for any
            occasion.
          </p>
        </div>

        <ol className="steps">
          {steps.map((s) => (
            <li className="step" key={s.n}>
              <span className="step-num">{s.n}</span>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-text">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="custom-cta">
          <a
            className="btn btn-primary btn-arrow"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Request a custom order <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
