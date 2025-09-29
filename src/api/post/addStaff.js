const API_BASE = import.meta.env.VITE_API_BASE;
export async function addStaff(staffData) {
  try {
    const response = await fetch(`${API_BASE}/staff/add-staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(staffData),
    });

    if (!response.ok) {
      throw new Error("Failed to add staff");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error adding staff:", error);
    throw error;
  }
}
