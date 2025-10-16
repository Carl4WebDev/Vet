const API_BASE = import.meta.env.VITE_API_BASE;

export async function deleteVeterinarian(vetId) {
  try {
    const res = await fetch(
      `${API_BASE}/api/vets/delete-veterinarian/${vetId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Failed to delete veterinarian:", data.message);
      throw new Error(data.message || "Failed to delete veterinarian");
    }

    return data;
  } catch (error) {
    console.error("❌ Error deleting veterinarian:", error.message);
    throw error;
  }
}
