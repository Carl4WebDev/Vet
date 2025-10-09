const API_BASE = import.meta.env.VITE_API_BASE;

// src/api/subscriptions/toggleAutoRenew.js
export async function toggleAutoRenew(subscriptionId, value) {
  try {
    const res = await fetch(
      `${API_BASE}/subscriptions/${subscriptionId}/auto-renew`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      }
    );
    if (!res.ok) throw new Error("Failed to update auto-renew");
    return await res.json();
  } catch (err) {
    console.error("❌ toggleAutoRenew error:", err);
    throw err;
  }
}
