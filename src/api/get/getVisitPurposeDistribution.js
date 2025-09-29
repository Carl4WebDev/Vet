const API_BASE = import.meta.env.VITE_API_BASE;

export const getVisitPurposeDistribution = async (clinicId) => {
  try {
    const res = await fetch(`${API_BASE}/insights/visit-purpose/${clinicId}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const result = await res.json();
    return result.data; // e.g. [{ purpose: "Check up", count: 10 }, ...]
  } catch (err) {
    console.error("Error fetching visit purpose distribution:", err);
    return [];
  }
};
