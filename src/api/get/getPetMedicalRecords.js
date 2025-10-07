// src/api/pets/getPetMedicalRecords.js
const API_BASE = import.meta.env.VITE_API_BASE;

export const getPetMedicalRecords = async (petId) => {
  try {
    const response = await fetch(`${API_BASE}/pets/get-pet-records/${petId}`);
    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || "Failed to fetch pet medical records");
    }

    return json.data;
  } catch (error) {
    console.error("Error fetching pet medical records:", error);
    throw error;
  }
};
