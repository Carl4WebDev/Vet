const API_BASE = import.meta.env.VITE_API_BASE;

export async function changeVetPassword(vetId, data) {
  const res = await fetch(
    `${API_BASE}/vets/settings/change-password/${vetId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Failed to change password");
  return await res.json();
}
