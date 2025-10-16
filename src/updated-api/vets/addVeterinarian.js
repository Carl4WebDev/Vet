const API_BASE = import.meta.env.VITE_API_BASE;

export async function addVeterinarian(vetData) {
  try {
    const res = await fetch(`${API_BASE}/api/vets/add-veterinarian`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vetData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Failed to add veterinarian:", data.message);
      throw new Error(data.message || "Failed to add veterinarian");
    }

    return data;
  } catch (error) {
    console.error("❌ Error adding veterinarian:", error.message);
    throw error;
  }
}
