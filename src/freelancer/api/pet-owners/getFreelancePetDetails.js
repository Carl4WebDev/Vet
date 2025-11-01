const API_BASE = import.meta.env.VITE_API_BASE;

export const getFreelancePetDetails = async (petId) => {
  try {
    const res = await fetch(`${API_BASE}/vet-freelance/pet-details/${petId}`);
    if (!res.ok) throw new Error("Failed to fetch pet details");
    return await res.json();
  } catch (err) {
    console.error("⚠️ getFreelancePetDetails failed:", err);
    return {};
  }
};
