const API_BASE = import.meta.env.VITE_API_BASE;

export const getAttendanceStats = async (clinicId) => {
  const res = await fetch(`${API_BASE}/insights/attendance/${clinicId}`);
  const data = await res.json();
  return data.data || [];
};
