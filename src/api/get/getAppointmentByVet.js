const API_BASE = import.meta.env.VITE_API_BASE;

export async function getAppointmentsByVet(vetId, date) {
  try {
    const url = `${API_BASE}/appointments/vet-appointments/${vetId}?date=${date}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch appointments");

    const data = await res.json();
    return data.data; // based on your provided response structure
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}
