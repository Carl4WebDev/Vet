const API_BASE = import.meta.env.VITE_API_BASE;

export async function rejectAppointment(appointmentId) {
  try {
    const res = await fetch(
      `${API_BASE}/appointments/${appointmentId}/reject`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) throw new Error("Failed to reject appointment");
    return await res.json();
  } catch (err) {
    console.error("❌ rejectAppointment error:", err);
    throw err;
  }
}
