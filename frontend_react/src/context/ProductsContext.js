import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedProducts } from "../data/products";

const PRODUCTS_STORAGE_KEY = "retroMart.products.v1";

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

const ProductsContext = createContext(null);

// PUBLIC_INTERFACE
export function ProductsProvider({ children }) {
  /** Provides product catalog state + basic "admin" update actions (in-memory + localStorage). */
  const [products, setProducts] = useState(() => {
    const fromStorage = safeParse(
      window.localStorage.getItem(PRODUCTS_STORAGE_KEY) || "null",
      null
    );
    return Array.isArray(fromStorage) && fromStorage.length > 0 ? fromStorage : seedProducts;
  });

  useEffect(() => {
    window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const api = useMemo(() => {
    const getById = (id) => products.find((p) => p.id === id) || null;

    const updateProduct = (id, patch) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
      );
    };

    const toggleInStock = (id) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
      );
    };

    const resetToSeed = () => setProducts(seedProducts);

    return { products, getById, updateProduct, toggleInStock, resetToSeed };
  }, [products]);

  return <ProductsContext.Provider value={api}>{children}</ProductsContext.Provider>;
}

// PUBLIC_INTERFACE
export function useProducts() {
  /** Hook to access product catalog state + admin actions. */
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return ctx;
}
