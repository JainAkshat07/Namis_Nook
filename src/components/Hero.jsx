import hero from "../assets/products/background.jpeg";

const HandIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 13c3 0 4 3 8 3 3 0 5-2 5-4s-2-2-4-1" />
    <path d="M12 12c1-2 3-4 5-4 1.5 0 2 1 1 2l-3 3" />
    <path d="M3 13v5h4l4 3" />
  </svg>
);
const YarnIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
    <path d="M6 8c4-3 8-3 12 0M5 12c5-4 9-4 14 0M6 16c4-3 8-3 12 0" />
  </svg>
);
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20s-7-4.5-9-9c-1.3-3 .5-6 3.5-6 2 0 3.5 1.5 5.5 3.5C15.5 6.5 17 5 19 5c3 0 4.8 3 3.5 6-2 4.5-10.5 9-10.5 9z" />
  </svg>
);

const badges = [
  { icon: <HandIcon />, top: "100%", bottom: "Handmade" },
  { icon: <YarnIcon />, top: "Premium", bottom: "Quality Wool" },
  { icon: <HeartIcon />, top: "Made with", bottom: "Love" },
];

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${hero})` }}
        aria-hidden="true"
      ></div>
      <div className="hero-overlay" aria-hidden="true"></div>

      <div className="container hero-inner">
        <div className="hero-panel">
          <p className="eyebrow">
            <span aria-hidden="true">💗</span> Handmade Crochet Art
          </p>
          <h1>
            Cozy Creations,
            <br />
            Made with <span className="accent">Love</span>
          </h1>
          <p className="lede">
            Thoughtfully handmade crochet keychains, toys and everlasting wool
            bouquets that bring warmth, comfort and joy to your everyday.
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn btn-primary btn-arrow">
              Shop now <span aria-hidden="true">→</span>
            </a>
          </div>
          <ul className="hero-badges">
            {badges.map(({ icon, top, bottom }) => (
              <li key={bottom}>
                <span className="hero-badge-icon" aria-hidden="true">
                  {icon}
                </span>
                <span className="hero-badge-text">
                  <strong>{top}</strong>
                  {bottom}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-tag" aria-hidden="true">
          Lovingly crocheted, <strong>just for you 💗</strong>
        </div>
      </div>

      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1200 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 90 V45 C 180 5 360 5 560 42 C 780 82 980 82 1200 40 V90 Z" />
        </svg>
      </div>
    </section>
  );
}
