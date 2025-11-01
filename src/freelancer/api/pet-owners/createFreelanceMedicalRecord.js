const API_BASE = import.meta.env.VITE_API_BASE;

export const createFreelanceMedicalRecord = async (
  petId,
  payload,
  files = []
) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([k, v]) => formData.append(k, v));
  files.forEach((f) => formData.append("files", f));

  const res = await fetch(
    `${API_BASE}/vet-freelance/pet-medical-records/add/${petId}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add record");
  return data;
};
