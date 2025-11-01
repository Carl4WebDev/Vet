const API_BASE = import.meta.env.VITE_API_BASE;

export async function getFreelanceSchedule(vetId) {
  try {
    const res = await fetch(
      `${API_BASE}/vet-freelance/freelance-schedule/${vetId}`
    );
    if (!res.ok) throw new Error("Failed to fetch today's schedule");
    return await res.json();
  } catch (err) {
    console.warn("⚠️ getFreelanceSchedule failed:", err.message);
    return { schedule: [] };
  }
}
