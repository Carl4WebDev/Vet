const API_BASE = import.meta.env.VITE_API_BASE;

export const getPetTypeDistribution = async (clinicId) => {
  try {
    const res = await fetch(
      `${API_BASE}/insights/pet-distribution/${clinicId}`
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const result = await res.json();
    return result.data; // e.g. [{ type: "Dog", count: 20 }, { type: "Cat", count: 15 }]
  } catch (err) {
    console.error("Error fetching pet type distribution:", err);
    return [];
  }
};
