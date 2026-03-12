import React, { useMemo, useState } from "react";
import { useProducts } from "../context/ProductsContext";
import { ProductCard } from "../components/ProductCard";

// PUBLIC_INTERFACE
export function ShopPage() {
  /** Product listing grid with simple search and sort. */
  const { products } = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = [...products];

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured: keep seed order
        break;
    }
    return list;
  }, [products, query, category, sort]);

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="title">Shop</h1>
          <p className="subtitle">
            Retro-themed goods, static data, real vibes.
          </p>
        </div>

        <div className="filters" role="region" aria-label="Product filters">
          <label className="field">
            <span className="fieldLabel">Search</span>
            <input
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: neon, mug, pixel…"
            />
          </label>

          <label className="field">
            <span className="fieldLabel">Category</span>
            <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="fieldLabel">Sort</span>
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="rating">Top rated</option>
              <option value="name">Name</option>
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="emptyState">
          <h2>No matches</h2>
          <p className="muted">Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
