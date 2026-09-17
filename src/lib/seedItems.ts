import { Item } from "./types";

// Starting catalogue. Real photos aren't bundled with the demo, so seed
// items use an emoji "stall card" instead of an <img>. Anything the admin
// adds through the Admin page gets a real uploaded photo.
export const seedItems: Item[] = [
  {
    id: "seed-1",
    name: "Vine Tomatoes",
    unit: "500 g",
    price: 45,
    discount: 10,
    emoji: "🍅",
    swatch: "#F4D9CE",
  },
  {
    id: "seed-2",
    name: "Broccoli",
    unit: "1 head",
    price: 60,
    discount: 0,
    emoji: "🥦",
    swatch: "#DCEAD6",
  },
  {
    id: "seed-3",
    name: "Carrots",
    unit: "1 kg",
    price: 35,
    discount: 0,
    emoji: "🥕",
    swatch: "#F6E2C6",
  },
  {
    id: "seed-4",
    name: "Red Onions",
    unit: "1 kg",
    price: 30,
    discount: 15,
    emoji: "🧅",
    swatch: "#EBD9E8",
  },
  {
    id: "seed-5",
    name: "Potatoes",
    unit: "1 kg",
    price: 25,
    discount: 0,
    emoji: "🥔",
    swatch: "#EAE0CB",
  },
  {
    id: "seed-6",
    name: "Baby Spinach",
    unit: "250 g",
    price: 28,
    discount: 0,
    emoji: "🥬",
    swatch: "#DCEAD6",
  },
  {
    id: "seed-7",
    name: "Capsicum",
    unit: "500 g",
    price: 50,
    discount: 5,
    emoji: "🫑",
    swatch: "#D9E8D3",
  },
  {
    id: "seed-8",
    name: "Cucumber",
    unit: "1 kg",
    price: 32,
    discount: 0,
    emoji: "🥒",
    swatch: "#DCEAD6",
  },
];
