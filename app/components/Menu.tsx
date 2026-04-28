"use client";
import { useEffect, useState } from "react";
import { CATEGORIES, MENU } from "@/lib/menu";
import type { CartItem, Drink } from "@/lib/types";
import { DrinkCard } from "./DrinkCard";
import { DrinkModal } from "./DrinkModal";
import { CartDrawer } from "./CartDrawer";

export function Menu() {
  const [picked, setPicked] = useState<Drink | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handler = () => setItems([]);
    window.addEventListener("order-placed", handler);
    return () => window.removeEventListener("order-placed", handler);
  }, []);

  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, item]);
    setCartOpen(true);
  };

  const removeItem = (idx: number) =>
    setItems((prev) => prev.filter((_, i) => i !== idx));

  const updateQty = (idx: number, qty: number) =>
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, qty } : it)));

  const totalDrinks = items.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      {CATEGORIES.map((cat) => {
        const drinks = MENU.filter((d) => d.category === cat);
        return (
          <section key={cat} className="mb-12">
            <div className="mb-5 flex items-baseline gap-4">
              <h2 className="font-display text-3xl tracking-tight text-forestDark">
                {cat}
              </h2>
              <div className="h-px flex-1 bg-forest/20" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {drinks.map((drink) => (
                <DrinkCard
                  key={drink.id}
                  drink={drink}
                  onPick={() => setPicked(drink)}
                />
              ))}
            </div>
          </section>
        );
      })}

      {picked && (
        <DrinkModal
          drink={picked}
          onClose={() => setPicked(null)}
          onAdd={addItem}
        />
      )}

      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-forest px-5 py-3 font-display text-cream shadow-lg hover:bg-forestDark"
      >
        <span>Order ({totalDrinks})</span>
      </button>

      <CartDrawer
        open={cartOpen}
        items={items}
        onClose={() => setCartOpen(false)}
        onRemove={removeItem}
        onUpdateQty={updateQty}
      />
    </>
  );
}
