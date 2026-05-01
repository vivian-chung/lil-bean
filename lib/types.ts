export type Temperature = "hot" | "iced";
export type Milk = "oat" | "dairy";
export type Sweetness = "unsweetened" | "lightly sweetened";
export type Caffeine = "regular" | "decaf";

export type Drink = {
  id: string;
  name: string;
  category: "Signature" | "Espresso" | "Matcha";
  blurb?: string;
  temperatures: Temperature[];
  hasMilk: boolean;
  hasSweetness: boolean;
  hasCaffeineChoice?: boolean;
};

export type CartItem = {
  drinkId: string;
  name: string;
  qty: number;
  temperature?: Temperature;
  milk?: Milk;
  sweetness?: Sweetness;
  caffeine?: Caffeine;
};

export type OrderPayload = {
  customerName: string;
  pickupTime: string;
  notes: string;
  items: CartItem[];
  placedAt: string;
};
