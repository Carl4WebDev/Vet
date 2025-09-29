const API_BASE = import.meta.env.VITE_API_BASE;

// src/api/get/getClinicOwners.js
export async function getClinicPetOwners(clinicId) {
  try {
    const res = await fetch(`${API_BASE}/clinic-client/pet-owners/${clinicId}`);
    if (!res.ok) throw new Error("Failed to fetch owners");
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Error fetching owners:", err);
    return [];
  }
}
