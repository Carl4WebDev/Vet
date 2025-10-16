const API_BASE = import.meta.env.VITE_API_BASE;

export async function editVeterinarian(vetId, updatedData) {
  try {
    const res = await fetch(`${API_BASE}/api/vets/edit-veterinarian/${vetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Failed to update veterinarian:", data.message);
      throw new Error(data.message || "Failed to update veterinarian");
    }

    return data;
  } catch (error) {
    console.error("❌ Error updating veterinarian:", error.message);
    throw error;
  }
}
