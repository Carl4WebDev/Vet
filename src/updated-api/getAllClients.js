/**
 * 🧠 Fetch all clients (with main image)
 * Example response:
 * [
 *   {
 *     client_id: 27,
 *     client_name: "Angelica Carlty",
 *     phone: "09178880000",
 *     gender: "Female",
 *     image_url: "http://localhost:5000/uploads/clients/1760264936525-731694049.jpg"
 *   }
 * ]
 */

const API_BASE = import.meta.env.VITE_API_BASE;

export async function getAllClients() {
  try {
    const res = await fetch(`${API_BASE}/clients-updated/all`);
    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Failed to fetch clients:", data.message);
      return [];
    }

    return data.success ? data.data : [];
  } catch (error) {
    console.error("❌ Error fetching clients:", error.message);
    return [];
  }
}
