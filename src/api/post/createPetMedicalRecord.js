const API_BASE = import.meta.env.VITE_API_BASE;

export const createPetMedicalRecord = async (petId, payload, files = []) => {
  const formData = new FormData();

  // Append all form fields
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Append files
  files.forEach((file) => formData.append("files", file));

  const response = await fetch(
    `${API_BASE}/medical-records/add-medical-record/${petId}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create record");
  return data;
};
