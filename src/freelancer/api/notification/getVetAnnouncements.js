const API_BASE = import.meta.env.VITE_API_BASE2 || "http://localhost:5000";

/**
 * Fetch announcements for freelance veterinarians
 */
export const getVetAnnouncements = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/announcements/vets_announcements`);
    if (!res.ok) throw new Error("Failed to fetch vet announcements");
    return await res.json();
  } catch (err) {
    console.error("❌ getVetAnnouncements error:", err);
    return [];
  }
};
