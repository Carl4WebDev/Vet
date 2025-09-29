const API_BASE = import.meta.env.VITE_API_BASE;

export async function getVetByClinic(clinicId) {
  try {
    const res = await fetch(`${API_BASE}/clinic/all-vet/${clinicId}`);
    if (!res.ok) throw new Error("Failed to fetch veterinarians");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching veterinarians:", error);
    return [];
  }
}
