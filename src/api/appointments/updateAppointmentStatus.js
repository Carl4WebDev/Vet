const API_BASE = import.meta.env.VITE_API_BASE;

export async function updateAppointmentStatus(appointmentId, status) {
  try {
    const res = await fetch(
      `${API_BASE}/appointments/${appointmentId}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );
    if (!res.ok) throw new Error("Failed to update appointment status");
    return await res.json();
  } catch (err) {
    console.error("❌ updateAppointmentStatus error:", err);
    throw err;
  }
}
