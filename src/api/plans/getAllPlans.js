// src/api/plans/getAllPlans.js

const API_BASE = import.meta.env.VITE_API_BASE;
export async function getAllPlans() {
  try {
    const res = await fetch(`${API_BASE}/plans`);
    if (!res.ok) throw new Error("Failed to fetch plans");
    const data = await res.json();
    return data.plans;
  } catch (err) {
    console.error("❌ getAllPlans error:", err);
    throw err;
  }
}
