import type { Drink } from "./types";

export const MENU: Drink[] = [
  {
    id: "matcha-cloud-jasmine",
    name: "Matcha Cloud Jasmine Tea",
    category: "Signature",
    blurb: "Jasmine tea under a cloud of matcha cold foam.",
    temperatures: ["iced"],
    hasMilk: false,
    hasSweetness: true,
  },
  {
    id: "cold-foam-iced-coffee",
    name: "Cold Foam Iced Coffee",
    category: "Signature",
    blurb: "Iced coffee crowned with silky cold foam.",
    temperatures: ["iced"],
    hasMilk: false,
    hasSweetness: true,
  },
  {
    id: "flat-white",
    name: "Flat White",
    category: "Espresso",
    blurb: "Double espresso with velvety steamed milk.",
    temperatures: ["hot"],
    hasMilk: true,
    hasSweetness: true,
  },
  {
    id: "latte",
    name: "Latte",
    category: "Espresso",
    blurb: "Espresso with steamed milk — comforting classic.",
    temperatures: ["hot", "iced"],
    hasMilk: true,
    hasSweetness: true,
  },
  {
    id: "americano",
    name: "Americano",
    category: "Espresso",
    blurb: "Espresso lengthened with water.",
    temperatures: ["hot", "iced"],
    hasMilk: false,
    hasSweetness: false,
  },
  {
    id: "iced-matcha-latte",
    name: "Iced Matcha Latte",
    category: "Matcha",
    blurb: "Stone-ground matcha shaken with cold milk.",
    temperatures: ["iced"],
    hasMilk: true,
    hasSweetness: true,
  },
  {
    id: "hot-matcha-latte",
    name: "Hot Matcha Latte",
    category: "Matcha",
    blurb: "Stone-ground matcha whisked into steamed milk.",
    temperatures: ["hot"],
    hasMilk: true,
    hasSweetness: true,
  },
  {
    id: "usucha",
    name: "Usucha",
    category: "Matcha",
    blurb: "Whisked thin matcha — traditional, no milk.",
    temperatures: ["hot", "iced"],
    hasMilk: false,
    hasSweetness: true,
  },
];

export const CATEGORIES: Drink["category"][] = ["Signature", "Espresso", "Matcha"];

export function getDrink(id: string): Drink | undefined {
  return MENU.find((d) => d.id === id);
}
