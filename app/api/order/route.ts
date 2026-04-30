import { NextResponse } from "next/server";
import { sendOrderDM } from "@/lib/discord";
import type { OrderPayload } from "@/lib/types";

export const runtime = "nodejs";

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function validate(body: unknown): { ok: true; data: OrderPayload } | { ok: false; reason: string } {
  if (!body || typeof body !== "object") return { ok: false, reason: "Invalid body" };
  const b = body as Record<string, unknown>;
  if (!isString(b.customerName) || !b.customerName.trim()) {
    return { ok: false, reason: "Name is required" };
  }
  if (!isString(b.pickupTime)) return { ok: false, reason: "Pickup time is required" };
  if (!Array.isArray(b.items) || b.items.length === 0) {
    return { ok: false, reason: "Cart is empty" };
  }
  if (b.items.length > 50) return { ok: false, reason: "Too many items" };
  for (const item of b.items) {
    if (!item || typeof item !== "object") return { ok: false, reason: "Bad item" };
    const it = item as Record<string, unknown>;
    if (!isString(it.drinkId) || !isString(it.name)) {
      return { ok: false, reason: "Bad item shape" };
    }
    if (typeof it.qty !== "number" || it.qty < 1 || it.qty > 20) {
      return { ok: false, reason: "Bad item qty" };
    }
  }
  return {
    ok: true,
    data: {
      customerName: b.customerName.trim().slice(0, 80),
      pickupTime: (b.pickupTime as string).slice(0, 40),
      notes: isString(b.notes) ? b.notes.slice(0, 500) : "",
      items: b.items as OrderPayload["items"],
      placedAt: isString(b.placedAt) ? b.placedAt : new Date().toISOString(),
    },
  };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.reason }, { status: 400 });
  }

  try {
    await sendOrderDM(result.data);
  } catch (e) {
    console.error("Discord send failed", e);
    const detail = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json(
      { error: `Could not deliver order — ${detail}` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
