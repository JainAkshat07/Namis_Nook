import about from "../assets/products/about.svg";

export default function About() {
  return (
    <section id="about" className="section section-alt">
      <div className="container about-inner">
        <div className="about-art" aria-hidden="true">
          <img src={about} alt="" />
        </div>
        <div className="about-text">
          <h2>Meet the maker</h2>
          <p>
            Nami's Nook began at a cosy kitchen table, with a basket of
            colourful wool and a love for making things by hand. Every keychain,
            toy and bouquet is crocheted with patience, care and a lot of heart.
          </p>
          <p>
            Because each piece is made just for you, colours and sizes can be
            customised — simply mention what you'd like when you place your
            order.
          </p>
          <ul className="about-points">
            <li>100% handmade, no two exactly alike</li>
            <li>Custom colours &amp; sizes on request</li>
            <li>Perfect for gifts &amp; keepsakes</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
