const API_BASE = import.meta.env.VITE_API_BASE;

export async function addStaff(staffData) {
  try {
    const res = await fetch(`${API_BASE}/staff/add-staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(staffData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Failed to add staff:", data.message);
      throw new Error(data.message || "Failed to add staff");
    }

    return data.data;
  } catch (error) {
    console.error("❌ Error adding staff:", error.message);
    throw error;
  }
}
