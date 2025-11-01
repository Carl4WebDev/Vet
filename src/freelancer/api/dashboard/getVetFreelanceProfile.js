const API_BASE = import.meta.env.VITE_API_BASE;

export async function getFreelanceVetProfile(userId) {
  try {
    const res = await fetch(`${API_BASE}/vet-freelance/vet/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch veterinarian profile");
    return await res.json();
  } catch (err) {
    console.warn("⚠️ getFreelanceVetProfile failed:", err.message);
    return {};
  }
}
