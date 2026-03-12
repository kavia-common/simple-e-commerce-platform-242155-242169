import React from "react";
import { Link } from "react-router-dom";
import { formatUSD } from "../utils/money";

// PUBLIC_INTERFACE
export function ProductCard({ product }) {
  /** Small product preview card used in product grids. */
  return (
    <article className="card productCard">
      <Link to={`/product/${product.id}`} className="productMedia" aria-label={`View ${product.name}`}>
        <ProductGlyph product={product} />
      </Link>

      <div className="cardBody">
        <div className="cardRow">
          <h3 className="cardTitle">{product.name}</h3>
          <span className={product.inStock ? "badge ok" : "badge warn"}>
            {product.inStock ? "In stock" : "Sold out"}
          </span>
        </div>

        <div className="cardRow cardRowBottom">
          <span className="price">{formatUSD(product.price)}</span>
          <span className="muted">★ {product.rating.toFixed(1)}</span>
        </div>

        <div className="tags">
          {product.tags.slice(0, 3).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <Link className="btn btnSmall" to={`/product/${product.id}`}>
          View
        </Link>
      </div>
    </article>
  );
}

function ProductGlyph({ product }) {
  const { svgBg, accent, label } = product.image || {};
  const bg = svgBg || "#111827";
  const ac = accent || "#3b82f6";
  const text = label || "RM";

  return (
    <svg className="productGlyph" viewBox="0 0 320 200" role="img" aria-label={`${product.name} preview`}>
      <rect x="0" y="0" width="320" height="200" rx="16" fill={bg} />
      <path
        d="M0 140 C 60 120, 100 180, 160 160 C 220 140, 260 180, 320 150 L 320 200 L 0 200 Z"
        fill={ac}
        opacity="0.35"
      />
      <path
        d="M0 90 C 70 60, 110 120, 170 100 C 230 80, 260 120, 320 95"
        stroke={ac}
        strokeWidth="4"
        fill="none"
        opacity="0.9"
      />
      <g>
        <rect x="22" y="22" width="64" height="30" rx="10" fill={ac} opacity="0.9" />
        <text x="54" y="44" textAnchor="middle" fontSize="14" fill="#0b1220" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">
          RETRO
        </text>
      </g>
      <text
        x="160"
        y="120"
        textAnchor="middle"
        fontSize="64"
        fill="#e5e7eb"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
        fontWeight="700"
      >
        {text}
      </text>
    </svg>
  );
}
