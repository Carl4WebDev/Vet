const API_BASE = import.meta.env.VITE_API_BASE;

export async function updateVetInfo(vetId, data) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("specialization", data.specialization);
  formData.append("contact_number", data.contact_number);
  if (data.image) formData.append("image", data.image);

  const res = await fetch(`${API_BASE}/vets/settings/${vetId}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to update veterinarian info.");
  return await res.json();
}
