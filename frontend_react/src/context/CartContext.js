import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CART_STORAGE_KEY = "retroMart.cart.v1";

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function clampQty(qty) {
  const n = Number(qty);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(99, Math.floor(n)));
}

const CartContext = createContext(null);

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  /** Provides cart state + cart actions to the app. */
  const [items, setItems] = useState(() => {
    const fromStorage = safeParse(window.localStorage.getItem(CART_STORAGE_KEY) || "null", null);
    return Array.isArray(fromStorage) ? fromStorage : [];
  });

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const api = useMemo(() => {
    const addItem = (product, qty = 1) => {
      const quantity = clampQty(qty);
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.productId === product.id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: clampQty(next[idx].quantity + quantity) };
          return next;
        }
        return [
          ...prev,
          {
            productId: product.id,
            quantity,
          },
        ];
      });
    };

    const removeItem = (productId) => {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    };

    const setQuantity = (productId, qty) => {
      const quantity = clampQty(qty);
      setItems((prev) =>
        prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
      );
    };

    const clearCart = () => setItems([]);

    const cartCount = items.reduce((sum, i) => sum + (i.quantity || 0), 0);

    return { items, addItem, removeItem, setQuantity, clearCart, cartCount };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

// PUBLIC_INTERFACE
export function useCart() {
  /** Hook to access cart state + actions. */
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
