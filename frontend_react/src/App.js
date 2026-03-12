import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { Layout } from "./components/Layout";
import { ShopPage } from "./pages/ShopPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { AdminPage } from "./pages/AdminPage";

// PUBLIC_INTERFACE
function App() {
  /** RetroMart single-page e-commerce demo with routing, cart, checkout, and basic admin controls. */
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const routerBase = useMemo(() => {
    // Keep it simple for CRA deployments; can be configured later if needed.
    return "/";
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename={routerBase}>
        <ProductsProvider>
          <CartProvider>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title="Toggle theme"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>

            <Layout>
              <Routes>
                <Route path="/" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </CartProvider>
        </ProductsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
