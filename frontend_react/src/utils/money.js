/**
 * Money helpers.
 */

// PUBLIC_INTERFACE
export function formatUSD(value) {
  /** Format a number as USD currency. */
  const num = typeof value === "number" ? value : Number(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(num) ? num : 0);
}
