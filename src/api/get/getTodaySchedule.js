// src/api/appointments/getTodaySchedule.js

const API_BASE = import.meta.env.VITE_API_BASE;

export const getTodaySchedule = async (clinicId) => {
  try {
    const response = await fetch(
      `${API_BASE}/appointments/schedule-today/${clinicId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch schedule: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching today's schedule:", error);
    throw error;
  }
};
