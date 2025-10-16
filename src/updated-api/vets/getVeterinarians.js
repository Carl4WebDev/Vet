const API_BASE = import.meta.env.VITE_API_BASE;

export async function getVeterinarians(clinicId) {
  try {
    const res = await fetch(
      `${API_BASE}/api/vets/get-veterinarians/${clinicId}`
    );
    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Failed to fetch veterinarians:", data.message);
      return [];
    }

    return data.success ? data : { success: false, data: [] };
  } catch (error) {
    console.error("❌ Error fetching veterinarians:", error.message);
    return { success: false, data: [] };
  }
}
