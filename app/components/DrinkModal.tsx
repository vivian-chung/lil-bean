"use client";
import { useEffect, useState } from "react";
import type { CartItem, Drink, Milk, Sweetness, Temperature } from "@/lib/types";

type Props = {
  drink: Drink;
  onClose: () => void;
  onAdd: (item: CartItem) => void;
};

export function DrinkModal({ drink, onClose, onAdd }: Props) {
  const [temperature, setTemperature] = useState<Temperature | undefined>(
    drink.temperatures[0]
  );
  const [milk, setMilk] = useState<Milk | undefined>(drink.hasMilk ? "oat" : undefined);
  const [sweetness, setSweetness] = useState<Sweetness | undefined>(
    drink.hasSweetness ? "unsweetened" : undefined
  );
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = () => {
    onAdd({
      drinkId: drink.id,
      name: drink.name,
      qty,
      temperature,
      milk,
      sweetness,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-forestDark/40 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-cream p-6 shadow-xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.2em] text-forest/60">
              {drink.category}
            </p>
            <h2 className="font-display text-2xl text-forestDark">{drink.name}</h2>
            {drink.blurb && (
              <p className="mt-1 text-sm italic text-forest/70">{drink.blurb}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-forest/60 hover:text-forest"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {drink.temperatures.length > 1 && (
            <Field label="Temperature">
              <ChoiceRow
                value={temperature}
                onChange={setTemperature}
                options={drink.temperatures.map((t) => ({ value: t, label: t }))}
              />
            </Field>
          )}

          {drink.hasMilk && (
            <Field label="Milk">
              <ChoiceRow
                value={milk}
                onChange={setMilk}
                options={[
                  { value: "oat", label: "Oat" },
                  { value: "dairy", label: "Dairy" },
                ]}
              />
            </Field>
          )}

          {drink.hasSweetness && (
            <Field label="Sweetness">
              <ChoiceRow
                value={sweetness}
                onChange={setSweetness}
                options={[
                  { value: "unsweetened", label: "Unsweetened" },
                  { value: "lightly sweetened", label: "Lightly sweetened" },
                ]}
              />
            </Field>
          )}

          <Field label="Quantity">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-9 w-9 rounded-full border border-forest/30 text-forest hover:bg-creamSoft"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center font-display text-lg">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                className="h-9 w-9 rounded-full border border-forest/30 text-forest hover:bg-creamSoft"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </Field>
        </div>

        <button
          onClick={submit}
          className="mt-7 w-full rounded-full bg-forest py-3 font-display text-lg text-cream transition hover:bg-forestDark"
        >
          Add to order
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-forest/60">{label}</p>
      {children}
    </div>
  );
}

function ChoiceRow<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T | undefined;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={
              "rounded-full border px-4 py-1.5 text-sm capitalize transition " +
              (active
                ? "border-forest bg-forest text-cream"
                : "border-forest/30 bg-transparent text-forest hover:bg-creamSoft")
            }
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
