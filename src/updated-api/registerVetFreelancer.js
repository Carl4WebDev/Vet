const API_BASE = import.meta.env.VITE_API_BASE;

export async function registerVetFreelancer(data) {
  const res = await fetch(`${API_BASE}/auth/vet-freelancer/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to register freelance veterinarian");
  return await res.json();
}
