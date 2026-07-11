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
const ArtisanIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="30" height="30">
    <circle cx="12" cy="10" r="7" />
    <path d="M12 3v14M5 10h14M7 5l10 10M17 5 7 15" />
    <path d="M12 17v4M9 21h6" />
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
  { icon: <ArtisanIcon />, top: "Made by Skilled", bottom: "Artisans" },
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
