// src/api/vet-freelancer/appointments.js
const API_BASE = import.meta.env.VITE_API_BASE;

export const getAppointmentsByVetFreelancer = async (vetId, query = "") => {
  try {
    const res = await fetch(
      `${API_BASE}/vet-freelance/appointments/freelancer/${vetId}?query=${query}`
    );
    return await res.json();
  } catch (err) {
    console.error("❌ Failed to fetch freelance appointments:", err);
    return [];
  }
};

export const scheduleAppointment = async (appointmentId) => {
  await fetch(
    `${API_BASE}/vet-freelance/appointments/${appointmentId}/schedule`,
    {
      method: "PUT",
    }
  );
};

export const rejectAppointment = async (appointmentId) => {
  await fetch(
    `${API_BASE}/vet-freelance/appointments/${appointmentId}/reject`,
    {
      method: "PUT",
    }
  );
};

export const completeAppointment = async (appointmentId) => {
  await fetch(
    `${API_BASE}/vet-freelance/appointments/${appointmentId}/complete`,
    {
      method: "PUT",
    }
  );
};
