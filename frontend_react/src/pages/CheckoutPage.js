import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { formatUSD } from "../utils/money";

function computeTotal(items, getById) {
  const subtotal = items.reduce((s, i) => {
    const p = getById(i.productId);
    return s + (p ? p.price * (i.quantity || 0) : 0);
  }, 0);
  const shipping = subtotal > 0 ? 5.0 : 0;
  const tax = subtotal * 0.08;
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
}

function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = "Name is required.";
  if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Valid email is required.";
  if (!form.address.trim()) errors.address = "Address is required.";
  if (!form.city.trim()) errors.city = "City is required.";
  if (!form.postal.trim()) errors.postal = "Postal code is required.";
  return errors;
}

// PUBLIC_INTERFACE
export function CheckoutPage() {
  /** Checkout form (fake), with client-side validation and a success screen. */
  const nav = useNavigate();
  const { items, clearCart } = useCart();
  const { getById } = useProducts();
  const totals = useMemo(() => computeTotal(items, getById), [items, getById]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postal: "",
    notes: "",
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validate(form), [form]);
  const canSubmit = items.length > 0 && Object.keys(errors).length === 0;

  const setField = (name, value) => setForm((p) => ({ ...p, [name]: value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      address: true,
      city: true,
      postal: true,
      notes: true,
    });

    const errs = validate(form);
    if (Object.keys(errs).length > 0) return;

    // Demo behavior: "place order" then clear cart.
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page">
        <div className="emptyState">
          <h1>Order placed</h1>
          <p className="muted">
            Thanks, {form.fullName.split(" ")[0] || "friend"}! This is a demo—no payment was processed.
          </p>
          <div className="actions">
            <Link className="btn btnPrimary" to="/">
              Back to shop
            </Link>
            <button className="btn" onClick={() => nav("/admin")}>
              Visit admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="emptyState">
          <h1>Checkout</h1>
          <p className="muted">Your cart is empty.</p>
          <Link className="btn btnPrimary" to="/">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  const showError = (name) => touched[name] && errors[name];

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="title">Checkout</h1>
          <p className="subtitle">No real payments—just a simple form.</p>
        </div>
        <div className="actions">
          <Link className="btn" to="/cart">
            Back to cart
          </Link>
        </div>
      </div>

      <div className="checkoutLayout">
        <form className="card formCard" onSubmit={onSubmit} noValidate>
          <h2 className="sectionTitle">Shipping</h2>

          <div className="formGrid">
            <label className="field">
              <span className="fieldLabel">Full name</span>
              <input
                className={showError("fullName") ? "input invalid" : "input"}
                value={form.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                placeholder="Alex Retro"
                autoComplete="name"
              />
              {showError("fullName") ? <span className="fieldError">{errors.fullName}</span> : null}
            </label>

            <label className="field">
              <span className="fieldLabel">Email</span>
              <input
                className={showError("email") ? "input invalid" : "input"}
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                placeholder="alex@example.com"
                autoComplete="email"
              />
              {showError("email") ? <span className="fieldError">{errors.email}</span> : null}
            </label>

            <label className="field span2">
              <span className="fieldLabel">Address</span>
              <input
                className={showError("address") ? "input invalid" : "input"}
                value={form.address}
                onChange={(e) => setField("address", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, address: true }))}
                placeholder="123 Neon Street"
                autoComplete="street-address"
              />
              {showError("address") ? <span className="fieldError">{errors.address}</span> : null}
            </label>

            <label className="field">
              <span className="fieldLabel">City</span>
              <input
                className={showError("city") ? "input invalid" : "input"}
                value={form.city}
                onChange={(e) => setField("city", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, city: true }))}
                placeholder="Synth City"
                autoComplete="address-level2"
              />
              {showError("city") ? <span className="fieldError">{errors.city}</span> : null}
            </label>

            <label className="field">
              <span className="fieldLabel">Postal code</span>
              <input
                className={showError("postal") ? "input invalid" : "input"}
                value={form.postal}
                onChange={(e) => setField("postal", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, postal: true }))}
                placeholder="12345"
                autoComplete="postal-code"
              />
              {showError("postal") ? <span className="fieldError">{errors.postal}</span> : null}
            </label>

            <label className="field span2">
              <span className="fieldLabel">Order notes (optional)</span>
              <textarea
                className="textarea"
                value={form.notes}
                onChange={(e) => setField("notes", e.target.value)}
                placeholder="Leave at the door, ring bell twice, etc."
                rows={4}
              />
            </label>
          </div>

          <button className="btn btnPrimary btnBlock" type="submit" disabled={!canSubmit}>
            Place order ({formatUSD(totals.total)})
          </button>

          <p className="muted tiny">
            By placing this order you agree to absolutely nothing (because this is a demo).
          </p>
        </form>

        <aside className="card cartSummary" aria-label="Checkout summary">
          <h2 className="sectionTitle">Summary</h2>
          <div className="summaryRow">
            <span className="muted">Subtotal</span>
            <span>{formatUSD(totals.subtotal)}</span>
          </div>
          <div className="summaryRow">
            <span className="muted">Shipping</span>
            <span>{formatUSD(totals.shipping)}</span>
          </div>
          <div className="summaryRow">
            <span className="muted">Tax (est.)</span>
            <span>{formatUSD(totals.tax)}</span>
          </div>
          <div className="summaryRow total">
            <span>Total</span>
            <span>{formatUSD(totals.total)}</span>
          </div>

          <div className="divider" />

          <p className="muted tiny">
            Payment is not collected. This is a static front-end demo using seed JSON.
          </p>
        </aside>
      </div>
    </div>
  );
}
