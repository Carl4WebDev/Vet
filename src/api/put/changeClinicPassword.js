const API_BASE = import.meta.env.VITE_API_BASE;

export const changeClinicPassword = async (clinicId, payload) => {
  const response = await fetch(
    `${API_BASE}/clinic/change-password/${clinicId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to change password");
  }

  return data;
};
