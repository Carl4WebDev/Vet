const API_BASE = import.meta.env.VITE_API_BASE;

export async function getPatientsFreelanceVet(vetId) {
  try {
    const res = await fetch(
      `${API_BASE}/vet-freelance/patient/patient-records/${vetId}`
    );
    if (!res.ok) throw new Error("Failed to fetch patient records");
    return await res.json();
  } catch (error) {
    console.error("❌ getPatientsFreelanceVet error:", error);
    return [];
  }
}
