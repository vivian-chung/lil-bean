import type { OrderPayload } from "./types";

const API = "https://discord.com/api/v10";

function formatOrder(o: OrderPayload): string {
  const lines: string[] = [];
  lines.push("**🌱 New Lil' Bean order — Toreshan Baby Shower**");
  lines.push("");
  lines.push(`**From:** ${o.customerName}`);
  lines.push(`**Pickup:** ${o.pickupTime}`);
  if (o.notes.trim()) lines.push(`**Notes:** ${o.notes.trim()}`);
  lines.push("");
  lines.push("**Items:**");
  for (const item of o.items) {
    const opts = [
      item.temperature,
      item.caffeine === "decaf" ? "decaf" : null,
      item.milk,
      item.sweetness,
    ]
      .filter(Boolean)
      .join(", ");
    lines.push(`• ${item.qty}× ${item.name}${opts ? ` _(${opts})_` : ""}`);
  }
  lines.push("");
  lines.push(`_Placed ${new Date(o.placedAt).toLocaleString()}_`);
  return lines.join("\n");
}

export async function sendOrderDM(order: OrderPayload): Promise<void> {
  const token = process.env.DISCORD_BOT_TOKEN;
  const userId = process.env.DISCORD_USER_ID;
  if (!token || !userId) {
    throw new Error("DISCORD_BOT_TOKEN and DISCORD_USER_ID must be set");
  }

  const dmRes = await fetch(`${API}/users/@me/channels`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipient_id: userId }),
  });
  if (!dmRes.ok) {
    throw new Error(`Discord DM channel failed: ${dmRes.status} ${await dmRes.text()}`);
  }
  const { id: channelId } = (await dmRes.json()) as { id: string };

  const msgRes = await fetch(`${API}/channels/${channelId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: formatOrder(order) }),
  });
  if (!msgRes.ok) {
    throw new Error(`Discord send failed: ${msgRes.status} ${await msgRes.text()}`);
  }
}
