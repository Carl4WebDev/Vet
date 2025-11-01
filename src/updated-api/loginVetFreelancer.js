const API_BASE = import.meta.env.VITE_API_BASE; // Example: https://vet-backend-m96d.onrender.com

/**
 * Logs in a freelance veterinarian
 * @param {string} email - Veterinarian's email
 * @param {string} password - Veterinarian's password
 * @returns {Promise<object>} - Auth response { token, user }
 */
export async function loginVetFreelancer(email, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/vet-freelancer/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Check if response failed
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Invalid email or password");
    }

    // Parse success response
    const data = await res.json();

    // Optionally store token / session data
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.user?.user_id);
      localStorage.setItem("role", data.user?.role);
    }

    return data;
  } catch (err) {
    console.error("❌ Vet Freelancer Login Error:", err);
    throw err;
  }
}
