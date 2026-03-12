import React, { useMemo, useState } from "react";
import { useProducts } from "../context/ProductsContext";
import { formatUSD } from "../utils/money";

// PUBLIC_INTERFACE
export function AdminPage() {
  /** Simple admin controls for product stock + price; persisted to localStorage for the demo. */
  const { products, toggleInStock, updateProduct, resetToSeed } = useProducts();
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [products, query]);

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="title">Admin</h1>
          <p className="subtitle">
            Basic local controls (no auth, no backend). Changes persist in your browser.
          </p>
        </div>

        <div className="actions">
          <button className="btn btnDanger" onClick={resetToSeed}>
            Reset catalog
          </button>
        </div>
      </div>

      <div className="card adminCard">
        <div className="adminToolbar">
          <label className="field">
            <span className="fieldLabel">Search</span>
            <input
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find products…"
            />
          </label>
          <div className="muted tiny">
            Tip: Toggle stock to simulate sold-out items.
          </div>
        </div>

        <div className="adminTable" role="table" aria-label="Admin products table">
          <div className="adminRow adminHeader" role="row">
            <div role="columnheader">Product</div>
            <div role="columnheader">Category</div>
            <div role="columnheader">Price</div>
            <div role="columnheader">Stock</div>
            <div role="columnheader">Actions</div>
          </div>

          {list.map((p) => (
            <div className="adminRow" role="row" key={p.id}>
              <div className="adminCell strong" role="cell">
                {p.name}
                <div className="muted tiny">{p.id}</div>
              </div>
              <div className="adminCell" role="cell">
                <span className="badge soft">{p.category}</span>
              </div>
              <div className="adminCell" role="cell">
                <label className="field compact">
                  <span className="fieldLabel">USD</span>
                  <input
                    className="input"
                    inputMode="decimal"
                    value={p.price}
                    onChange={(e) => updateProduct(p.id, { price: Number(e.target.value) })}
                    aria-label={`Price for ${p.name}`}
                  />
                </label>
                <div className="muted tiny">Now: {formatUSD(p.price)}</div>
              </div>
              <div className="adminCell" role="cell">
                <span className={p.inStock ? "badge ok" : "badge warn"}>
                  {p.inStock ? "In stock" : "Sold out"}
                </span>
              </div>
              <div className="adminCell" role="cell">
                <button className="btn btnSmall" onClick={() => toggleInStock(p.id)}>
                  Toggle stock
                </button>
              </div>
            </div>
          ))}

          {list.length === 0 ? (
            <div className="emptyInline">
              <span className="muted">No products match your search.</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
