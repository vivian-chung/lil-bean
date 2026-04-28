"use client";
import { useState } from "react";
import type { CartItem } from "@/lib/types";

type Props = {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemove: (idx: number) => void;
  onUpdateQty: (idx: number, qty: number) => void;
};

const TIME_SLOTS = (() => {
  const slots: string[] = ["Day-of / ASAP"];
  for (let h = 12; h < 16; h++) {
    for (const m of [0, 15, 30, 45]) {
      const hh = h > 12 ? h - 12 : h;
      const mm = m.toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      slots.push(`${hh}:${mm} ${ampm}`);
    }
  }
  return slots;
})();

export function CartDrawer({ open, items, onClose, onRemove, onUpdateQty }: Props) {
  const [name, setName] = useState("");
  const [pickup, setPickup] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const totalDrinks = items.reduce((s, i) => s + i.qty, 0);

  const submit = async () => {
    setSubmitting(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          pickupTime: pickup,
          notes,
          items,
          placedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server returned ${res.status}`);
      }
      setStatus("success");
      setName("");
      setNotes("");
      setPickup(TIME_SLOTS[0]);
      // Cart clearing happens in parent via the success effect.
      window.dispatchEvent(new Event("order-placed"));
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={
        "fixed inset-0 z-40 transition " +
        (open ? "pointer-events-auto" : "pointer-events-none")
      }
      aria-hidden={!open}
    >
      <div
        className={
          "absolute inset-0 bg-forestDark/40 transition-opacity " +
          (open ? "opacity-100" : "opacity-0")
        }
        onClick={onClose}
      />
      <aside
        className={
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-xl transition-transform " +
          (open ? "translate-x-0" : "translate-x-full")
        }
      >
        <header className="flex items-center justify-between border-b border-forest/15 px-6 py-5">
          <h2 className="font-display text-2xl text-forestDark">Your order</h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="text-forest/60 hover:text-forest"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="mt-12 text-center italic text-forest/60">
              No drinks yet — pick something from the menu.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((it, i) => (
                <li key={i} className="rounded-xl border border-forest/15 bg-creamSoft/50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg text-forestDark">{it.name}</p>
                      <p className="mt-0.5 text-sm italic text-forest/70">
                        {[it.temperature, it.milk, it.sweetness]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(i)}
                      className="text-xs uppercase tracking-wide text-forest/50 hover:text-forest"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQty(i, Math.max(1, it.qty - 1))}
                      className="h-7 w-7 rounded-full border border-forest/30 text-forest hover:bg-cream"
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{it.qty}</span>
                    <button
                      onClick={() => onUpdateQty(i, Math.min(20, it.qty + 1))}
                      className="h-7 w-7 rounded-full border border-forest/30 text-forest hover:bg-cream"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="border-t border-forest/15 bg-creamSoft/40 px-6 py-5"
        >
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-forest/60">
                Your name
              </span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-forest/25 bg-cream px-3 py-2 font-serif text-forestDark focus:border-forest focus:outline-none"
                placeholder="e.g. Vivian"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-forest/60">
                Pickup time
              </span>
              <select
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="mt-1 w-full rounded-lg border border-forest/25 bg-cream px-3 py-2 font-serif text-forestDark focus:border-forest focus:outline-none"
              >
                {TIME_SLOTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-forest/60">
                Notes (optional)
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-lg border border-forest/25 bg-cream px-3 py-2 font-serif text-forestDark focus:border-forest focus:outline-none"
                placeholder="Allergies, special requests…"
              />
            </label>
          </div>

          {status === "error" && (
            <p className="mt-3 text-sm text-red-700">{errorMsg}</p>
          )}
          {status === "success" && (
            <p className="mt-3 text-sm text-forest">
              Order sent! See you on May 3rd ✿
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || items.length === 0 || !name.trim()}
            className="mt-4 w-full rounded-full bg-forest py-3 font-display text-lg text-cream transition hover:bg-forestDark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Sending…"
              : `Place order${totalDrinks ? ` · ${totalDrinks} drink${totalDrinks > 1 ? "s" : ""}` : ""}`}
          </button>
        </form>
      </aside>
    </div>
  );
}
