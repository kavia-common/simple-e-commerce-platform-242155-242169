import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { formatUSD } from "../utils/money";

function computeTotals(items, getById) {
  const lines = items
    .map((i) => {
      const p = getById(i.productId);
      if (!p) return null;
      return {
        ...i,
        product: p,
        lineTotal: p.price * (i.quantity || 0),
      };
    })
    .filter(Boolean);

  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const shipping = subtotal > 0 ? 5.0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return { lines, subtotal, shipping, tax, total };
}

// PUBLIC_INTERFACE
export function CartPage() {
  /** Shopping cart page with editable quantities and checkout link. */
  const nav = useNavigate();
  const { items, setQuantity, removeItem, clearCart } = useCart();
  const { getById } = useProducts();

  const totals = useMemo(() => computeTotals(items, getById), [items, getById]);

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="title">Cart</h1>
          <p className="subtitle">Adjust quantities, then checkout.</p>
        </div>

        <div className="actions">
          <button className="btn" onClick={() => nav(-1)}>
            Back
          </button>
          <button className="btn btnDanger" onClick={clearCart} disabled={items.length === 0}>
            Clear cart
          </button>
        </div>
      </div>

      {totals.lines.length === 0 ? (
        <div className="emptyState">
          <h2>Your cart is empty</h2>
          <p className="muted">Pick something delightfully retro.</p>
          <Link className="btn btnPrimary" to="/">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="cartLayout">
          <section className="card cartLines" aria-label="Cart items">
            {totals.lines.map((l) => (
              <div key={l.productId} className="cartLine">
                <div className="cartLineMain">
                  <div className="cartLineTitleRow">
                    <Link className="linkStrong" to={`/product/${l.product.id}`}>
                      {l.product.name}
                    </Link>
                    <span className="muted">{formatUSD(l.product.price)} each</span>
                  </div>
                  <div className="cartLineMeta">
                    <span className="badge soft">{l.product.category}</span>
                    <span className={l.product.inStock ? "badge ok" : "badge warn"}>
                      {l.product.inStock ? "In stock" : "Sold out"}
                    </span>
                  </div>
                </div>

                <div className="cartLineControls">
                  <label className="field compact">
                    <span className="fieldLabel">Qty</span>
                    <input
                      className="input"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={l.quantity}
                      onChange={(e) => setQuantity(l.productId, e.target.value)}
                      aria-label={`Quantity for ${l.product.name}`}
                    />
                  </label>
                  <div className="cartLineTotal">{formatUSD(l.lineTotal)}</div>
                  <button className="btn btnSmall btnGhost" onClick={() => removeItem(l.productId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>

          <aside className="card cartSummary" aria-label="Order summary">
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

            <Link className="btn btnPrimary btnBlock" to="/checkout">
              Checkout
            </Link>
            <Link className="btn btnBlock" to="/">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
