const API_BASE = import.meta.env.VITE_API_BASE;

export const createPetMedicalRecord = async (petId, payload) => {
  const response = await fetch(
    `${API_BASE}/medical-records/add-medical-record/${petId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create medical record");
  }

  return data;
};
