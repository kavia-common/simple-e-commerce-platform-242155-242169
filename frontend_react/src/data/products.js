/**
 * Static seed data for the store.
 * Note: This is intentionally local/in-memory for this simple demo app.
 */

export const seedProducts = [
  {
    id: "retro-1",
    name: "Pixel Pop Sneakers",
    price: 59.99,
    category: "Shoes",
    rating: 4.6,
    inStock: true,
    description:
      "Chunky retro runners with pixel-perfect vibes. Lightweight, comfy, and loud in the best way.",
    details: [
      "Breathable mesh upper",
      "Cushioned sole for all-day wear",
      "Classic 90s silhouette",
    ],
    image: {
      svgBg: "#111827",
      accent: "#3b82f6",
      label: "PP",
    },
    tags: ["retro", "sneakers", "pixel"],
  },
  {
    id: "retro-2",
    name: "Cassette Coffee Mug",
    price: 14.5,
    category: "Home",
    rating: 4.3,
    inStock: true,
    description:
      "A mug shaped like a mixtape. Hydrate with nostalgia and sip like it's 1994.",
    details: ["Dishwasher safe", "12oz capacity", "Glossy finish"],
    image: {
      svgBg: "#0b1220",
      accent: "#06b6d4",
      label: "MX",
    },
    tags: ["kitchen", "retro", "gift"],
  },
  {
    id: "retro-3",
    name: "Neon Grid Desk Mat",
    price: 24.0,
    category: "Office",
    rating: 4.8,
    inStock: true,
    description:
      "Smooth desk mat with neon grid lines. Perfect for keyboards, mice, and late-night synthwave sessions.",
    details: ["Water resistant", "31\" x 12\"", "Anti-slip base"],
    image: {
      svgBg: "#081018",
      accent: "#a855f7",
      label: "NG",
    },
    tags: ["desk", "mat", "neon"],
  },
  {
    id: "retro-4",
    name: "Arcade Button Keychain",
    price: 9.99,
    category: "Accessories",
    rating: 4.1,
    inStock: true,
    description:
      "Clicky arcade button keychain. Because every day deserves a satisfying 'press start'.",
    details: ["Metal ring", "Tactile click", "Pocket-sized"],
    image: {
      svgBg: "#0f172a",
      accent: "#f97316",
      label: "A1",
    },
    tags: ["keychain", "arcade", "retro"],
  },
  {
    id: "retro-5",
    name: "VHS Bento Box",
    price: 18.75,
    category: "Home",
    rating: 4.4,
    inStock: false,
    description:
      "Pack lunch in a tiny VHS. Out of stock because it keeps getting rewound.",
    details: ["Leak resistant", "Divider included", "Microwave safe (lid off)"],
    image: {
      svgBg: "#0b1220",
      accent: "#22c55e",
      label: "VHS",
    },
    tags: ["bento", "vhs", "lunch"],
  },
];
