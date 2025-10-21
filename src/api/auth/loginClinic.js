const API_BASE = import.meta.env.VITE_API_BASE; // e.g. http://localhost:5000

export const loginClinic = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE}/clinic/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // ✅ Handle non-OK responses correctly
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Login failed");
    }

    // ✅ Parse and return valid JSON
    return await res.json();
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};
