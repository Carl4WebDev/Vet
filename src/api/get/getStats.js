const API_BASE = import.meta.env.VITE_API_BASE;

export const getStats = async (clinicId) => {
  try {
    const res = await fetch(`${API_BASE}/insights/stats/${clinicId}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const result = await res.json();
    return result.data; // { new_patients, transferees, week_visitors }
  } catch (err) {
    console.error("Error fetching stats:", err);
    return { new_patients: 0, transferees: 0, week_visitors: 0 };
  }
};
