export type Temperature = "hot" | "iced";
export type Milk = "oat" | "dairy";
export type Sweetness = "unsweetened" | "lightly sweetened";

export type Drink = {
  id: string;
  name: string;
  category: "Signature" | "Espresso" | "Matcha";
  blurb?: string;
  temperatures: Temperature[];
  hasMilk: boolean;
  hasSweetness: boolean;
};

export type CartItem = {
  drinkId: string;
  name: string;
  qty: number;
  temperature?: Temperature;
  milk?: Milk;
  sweetness?: Sweetness;
};

export type OrderPayload = {
  customerName: string;
  pickupTime: string;
  notes: string;
  items: CartItem[];
  placedAt: string;
};
