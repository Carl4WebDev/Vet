const API_BASE = import.meta.env.VITE_API_BASE;

export async function cancelSubscription(subscriptionId, mode = "period_end") {
  try {
    const res = await fetch(
      `${API_BASE}/subscriptions/${subscriptionId}/cancel`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to cancel subscription");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ cancelSubscription error:", err);
    throw err;
  }
}
