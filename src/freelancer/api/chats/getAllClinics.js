const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * 🐾 Fetch all clients (for veterinarian freelancer chat)
 * Same endpoint used by clinic to get full list of clients
 */
export const getAllClients = async () => {
  try {
    const res = await fetch(`${API_BASE}/clients-updated/all`);
    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Failed to fetch clients:", data.message);
      return [];
    }

    // For consistency with your existing backend response
    return data.success ? data.data : [];
  } catch (error) {
    console.error("❌ Error fetching clients:", error.message);
    return [];
  }
};
