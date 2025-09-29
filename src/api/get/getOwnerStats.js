const API_BASE = import.meta.env.VITE_API_BASE;

// src/api/get/getOwnerStats.js
export async function getOwnerStats(clientId) {
  try {
    const res = await fetch(
      `${API_BASE}/owner-insights/owner-stats/${clientId}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch owner stats: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data; // return only the useful payload
  } catch (error) {
    console.error("Error fetching owner stats:", error);
    return null; // return null so frontend can handle gracefully
  }
}
