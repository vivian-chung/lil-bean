"use client";
import type { Drink } from "@/lib/types";
import { DrinkArt } from "./DrinkArt";

type Props = { drink: Drink; onPick: () => void };

export function DrinkCard({ drink, onPick }: Props) {
  return (
    <button
      onClick={onPick}
      className="group flex w-full flex-col items-start gap-3 rounded-2xl border border-forest/15 bg-creamSoft/60 p-5 text-left transition hover:bg-creamSoft hover:shadow-sm"
    >
      <div className="flex h-28 w-full items-center justify-center text-forest">
        <DrinkArt drinkId={drink.id} className="h-28 w-28 object-contain" />
      </div>
      <div>
        <h3 className="font-display text-lg font-medium leading-tight text-forestDark">
          {drink.name}
        </h3>
        {drink.blurb && (
          <p className="mt-1 text-sm italic text-forest/70">{drink.blurb}</p>
        )}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {drink.temperatures.map((t) => (
            <span
              key={t}
              className="rounded-full border border-forest/20 px-2 py-0.5 text-xs uppercase tracking-wide text-forest/70"
            >
              {t}
            </span>
          ))}
          {drink.hasMilk && (
            <span className="rounded-full border border-forest/20 px-2 py-0.5 text-xs uppercase tracking-wide text-forest/70">
              oat / cow
            </span>
          )}
        </div>
      </div>
      <span className="mt-1 text-xs uppercase tracking-[0.2em] text-forest/60 group-hover:text-forest">
        Order →
      </span>
    </button>
  );
}
