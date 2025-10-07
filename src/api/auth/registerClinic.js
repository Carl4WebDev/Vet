const API_BASE = import.meta.env.VITE_API_BASE; // e.g. http://localhost:5000

export const registerClinic = async (clinicData) => {
  try {
    const response = await fetch(`${API_BASE}/clinic/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clinicData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register clinic");
    }
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error("Error registering clinic:", error);
    throw error;
  }
};
