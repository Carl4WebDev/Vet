const API_BASE = import.meta.env.VITE_API_BASE;

export async function getFreelanceDashboard(vetId) {
  try {
    const res = await fetch(`${API_BASE}/vet-freelance/insights/${vetId}`);
    if (!res.ok) throw new Error("Failed to fetch dashboard insights");
    return await res.json();
  } catch (err) {
    console.warn("⚠️ getFreelanceDashboard failed:", err.message);
    return {
      petTypes: [],
      contagiousDiseases: [],
      visitPurpose: [],
      summary: {},
    };
  }
}
