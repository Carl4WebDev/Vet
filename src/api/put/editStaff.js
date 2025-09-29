const API_BASE = import.meta.env.VITE_API_BASE;

export async function editStaff(staffId, updatedData) {
  const res = await fetch(`${API_BASE}/staff/edit-staff/${staffId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) throw new Error("Failed to edit staff");
  return res.json();
}
