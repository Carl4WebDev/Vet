const API_BASE = import.meta.env.VITE_API_BASE;

export async function getFreelancePetOwners(vetId) {
  try {
    const res = await fetch(`${API_BASE}/vet-freelance/pet-owners/${vetId}`);
    if (!res.ok) throw new Error("Failed to fetch pet owners");
    return await res.json();
  } catch (err) {
    console.warn("⚠️ getFreelancePetOwners failed:", err.message);
    return [];
  }
}
