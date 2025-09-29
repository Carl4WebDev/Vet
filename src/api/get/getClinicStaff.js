// src/api/get/getClinicStaff.js

const API_BASE = import.meta.env.VITE_API_BASE;

export async function getClinicStaff(clinicId) {
  try {
    const res = await fetch(`${API_BASE}/staff/get-staff/${clinicId}`);
    if (!res.ok) throw new Error("Failed to fetch staff");
    const data = await res.json();
    return data.data; // contains { list: [...], counts: {...} }
  } catch (error) {
    console.error("Error fetching clinic staff:", error);
    return { list: [], counts: {} };
  }
}
