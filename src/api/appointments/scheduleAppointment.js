const API_BASE = import.meta.env.VITE_API_BASE;

export async function scheduleAppointment(appointmentId) {
  try {
    const res = await fetch(
      `${API_BASE}/appointments/${appointmentId}/schedule`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) throw new Error("Failed to schedule appointment");
    return await res.json();
  } catch (err) {
    console.error("❌ scheduleAppointment error:", err);
    throw err;
  }
}
