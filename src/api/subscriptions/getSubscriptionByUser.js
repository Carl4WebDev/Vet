const API_BASE = import.meta.env.VITE_API_BASE;

// src/api/subscriptions/getSubscriptionByUser.js
export async function getSubscriptionByUser(userId) {
  try {
    const res = await fetch(`${API_BASE}/subscriptions/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch subscription");
    const data = await res.json();
    return data.subscription;
  } catch (err) {
    console.error("❌ getSubscriptionByUser error:", err);
    throw err;
  }
}
