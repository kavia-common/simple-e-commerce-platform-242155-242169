import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { formatUSD } from "../utils/money";

// PUBLIC_INTERFACE
export function ProductDetailPage() {
  /** Product detail view with quantity selector and add-to-cart. */
  const { id } = useParams();
  const { getById } = useProducts();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const product = useMemo(() => getById(id), [getById, id]);

  if (!product) {
    return (
      <div className="page">
        <div className="emptyState">
          <h1>Product not found</h1>
          <p className="muted">That item doesn’t exist in our static catalog.</p>
          <Link className="btn" to="/">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const canAdd = product.inStock;

  return (
    <div className="page">
      <div className="breadcrumb">
        <Link to="/" className="link">Shop</Link>
        <span className="muted">/</span>
        <span>{product.name}</span>
      </div>

      <div className="detail">
        <div className="detailMedia card">
          <div className="detailMediaInner">
            <svg className="detailGlyph" viewBox="0 0 640 360" role="img" aria-label={`${product.name} hero`}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor={product.image?.accent || "#3b82f6"} stopOpacity="0.9" />
                  <stop offset="1" stopColor="#0b1220" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="640" height="360" rx="22" fill={product.image?.svgBg || "#111827"} />
              <rect x="22" y="22" width="596" height="316" rx="18" fill="url(#g)" opacity="0.25" />
              <path d="M0 260 C 160 210, 260 330, 420 280 C 540 240, 580 320, 640 290 L 640 360 L 0 360 Z" fill={product.image?.accent || "#3b82f6"} opacity="0.35" />
              <text x="320" y="210" textAnchor="middle" fontSize="120" fill="#e5e7eb"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
                fontWeight="800">
                {product.image?.label || "RM"}
              </text>
            </svg>
          </div>
        </div>

        <div className="detailInfo">
          <h1 className="title">{product.name}</h1>
          <p className="subtitle">{product.description}</p>

          <div className="detailMeta">
            <span className="badge soft">{product.category}</span>
            <span className="badge soft">★ {product.rating.toFixed(1)}</span>
            <span className={product.inStock ? "badge ok" : "badge warn"}>
              {product.inStock ? "In stock" : "Sold out"}
            </span>
          </div>

          <div className="priceRow">
            <span className="priceBig">{formatUSD(product.price)}</span>
            <span className="muted">Static demo pricing</span>
          </div>

          <div className="controls">
            <label className="field">
              <span className="fieldLabel">Quantity</span>
              <input
                className="input"
                inputMode="numeric"
                pattern="[0-9]*"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                aria-label="Quantity"
              />
            </label>

            <button
              className="btn btnPrimary"
              onClick={() => addItem(product, qty)}
              disabled={!canAdd}
            >
              Add to cart
            </button>

            <Link className="btn" to="/cart">
              Go to cart
            </Link>
          </div>

          <div className="card detailsCard">
            <h2 className="sectionTitle">Details</h2>
            <ul className="list">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
