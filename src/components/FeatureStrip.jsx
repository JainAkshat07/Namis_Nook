const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="30" height="30">
    <path d="M11 20A7 7 0 0 1 4 13c0-6 8-9 16-9 0 8-3 16-9 16Z" />
    <path d="M4 20c3-6 7-9 12-11" />
  </svg>
);
const GiftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="30" height="30">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M5 12v9h14v-9" />
    <path d="M12 8v13" />
    <path d="M12 8S10.5 4 8 4a2 2 0 0 0 0 4Z" />
    <path d="M12 8s1.5-4 4-4a2 2 0 0 1 0 4Z" />
  </svg>
);

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="30"
    height="30"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="30" height="30">
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
);

const features = [
  { icon: <LeafIcon />, top: "Sustainable", bottom: "& Eco-friendly" },
  { icon: <GiftIcon />, top: "Perfect for", bottom: "Gifting" },
  { icon: <HeartIcon />, top: "Made with Love", bottom: "Ninu" },
  { icon: <TruckIcon />, top: "Safe & Fast", bottom: "Delivery" },
];

export default function FeatureStrip() {
  return (
    <div className="feature-strip-wrap">
      <div className="container">
        <ul className="feature-strip">
          {features.map((f) => (
            <li key={f.bottom} className="feature-item">
              <span className="feature-icon" aria-hidden="true">
                {f.icon}
              </span>
              <span className="feature-text">
                <strong>{f.top}</strong>
                {f.bottom}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
