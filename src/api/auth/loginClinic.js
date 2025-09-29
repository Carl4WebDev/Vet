const API_BASE = import.meta.env.VITE_API_BASE; // e.g. http://localhost:5000

export const loginClinic = async (clinicName, password) => {
  try {
    const res = await fetch(`${API_BASE}/clinic/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: clinicName,
        password: password,
      }),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    return await res.json(); // returns { user_id, email, role, token, ... }
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};
