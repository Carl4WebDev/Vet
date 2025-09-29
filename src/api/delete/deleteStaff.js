const API_BASE = import.meta.env.VITE_API_BASE;

export async function deleteStaff(staffId) {
  const res = await fetch(`${API_BASE}/staff/delete-staff/${staffId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete staff");
  return res.json();
}
