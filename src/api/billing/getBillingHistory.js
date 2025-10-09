// src/api/billing/getBillingHistory.js
const API_BASE = import.meta.env.VITE_API_BASE;
export async function getBillingHistory(userId) {
  try {
    const res = await fetch(`${API_BASE}/billing-history/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch billing history");
    const data = await res.json();
    return data.history;
  } catch (err) {
    console.error("❌ getBillingHistory error:", err);
    throw err;
  }
}
