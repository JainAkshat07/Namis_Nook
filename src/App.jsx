import Header from "./components/Header";
import Hero from "./components/Hero";
import FeatureStrip from "./components/FeatureStrip";
import Products from "./components/Products";
import CustomOrders from "./components/CustomOrders";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./context/CartProvider";

export default function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <FeatureStrip />
        <Products />
        <CustomOrders />
        <About />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
