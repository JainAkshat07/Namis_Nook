import { createContext, useContext } from "react";

export const CartContext = createContext(null);

// Turn a price string like "₹1,099" into the number 1099.
export function priceToNumber(price) {
  const n = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
