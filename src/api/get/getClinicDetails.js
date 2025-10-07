const API_BASE = import.meta.env.VITE_API_BASE;
export const getClinicDetails = async (clinicId) => {
  try {
    const res = await fetch(`${API_BASE}/clinic/details/${clinicId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch clinic details");
    }
    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching clinic details:", err);
    throw err;
  }
};
