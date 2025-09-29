const API_BASE = import.meta.env.VITE_API_BASE;

export async function getPatientsClinic(clinicId) {
  try {
    const res = await fetch(`${API_BASE}/patients/patient-clinic/${clinicId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch patient records");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching clinic patients:", error);
    return [];
  }
}
