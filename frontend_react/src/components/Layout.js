import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

// PUBLIC_INTERFACE
export function Layout({ children }) {
  /** App shell with header/nav/footer. */
  const { cartCount } = useCart();

  return (
    <div className="appShell">
      <header className="topBar">
        <div className="container topBarInner">
          <Link to="/" className="brand" aria-label="RetroMart home">
            <span className="brandMark" aria-hidden="true">
              ▣
            </span>
            <span className="brandText">
              Retro<span className="brandTextAccent">Mart</span>
            </span>
          </Link>

          <nav className="navLinks" aria-label="Primary navigation">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
              Shop
            </NavLink>
            <NavLink to="/admin" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
              Admin
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
              Cart <span className="pill" aria-label={`${cartCount} items in cart`}>{cartCount}</span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container mainContent">{children}</main>

      <footer className="footer">
        <div className="container footerInner">
          <span className="muted">Static demo store • No real payments</span>
          <a className="footerLink" href="https://reactjs.org" target="_blank" rel="noreferrer">
            Built with React
          </a>
        </div>
      </footer>
    </div>
  );
}
