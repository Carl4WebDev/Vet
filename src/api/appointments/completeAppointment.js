const API_BASE = import.meta.env.VITE_API_BASE;
export async function completeAppointment(appointmentId) {
  try {
    const res = await fetch(
      `${API_BASE}/appointments/${appointmentId}/complete`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) throw new Error("Failed to complete appointment");
    return await res.json();
  } catch (err) {
    console.error("❌ completeAppointment error:", err);
    throw err;
  }
}
