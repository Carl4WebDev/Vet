const API_BASE = import.meta.env.VITE_API_BASE;

export async function getClientsByClinic(clinicId) {
  try {
    const res = await fetch(
      `${API_BASE}/clients/get-client-clinic/${clinicId}`
    );
    if (!res.ok) throw new Error("Failed to fetch clients");
    const data = await res.json();
    return data.data; // ✅ fixed — remove extra .data
  } catch (err) {
    console.error("Error fetching clients:", err);
    return [];
  }
}
