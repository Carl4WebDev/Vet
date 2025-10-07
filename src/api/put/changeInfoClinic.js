const API_BASE = import.meta.env.VITE_API_BASE;

export const changeInfoClinic = async (clinicId, formDataObj) => {
  try {
    const formData = new FormData();

    // Append text fields if they exist
    if (formDataObj.clinicName) formData.append("name", formDataObj.clinicName);
    if (formDataObj.phone) formData.append("phone_number", formDataObj.phone);
    if (formDataObj.address) formData.append("address", formDataObj.address);

    // Append image file if uploaded
    if (formDataObj.image) {
      formData.append("image", formDataObj.image);
    }

    const res = await fetch(`${API_BASE}/clinic/change-info/${clinicId}`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to update clinic info");
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Error updating clinic info:", error);
    throw error;
  }
};
