import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {site.name} — Handmade Crochet Art. All
          rights reserved.
        </p>
        <p className="footer-note">Made with 🧶 and lots of love.</p>
      </div>
    </footer>
  );
}
