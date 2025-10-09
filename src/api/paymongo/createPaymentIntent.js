const API_BASE = import.meta.env.VITE_API_BASE;

// src/api/paymongo/createPaymentIntent.js
export async function createPaymentIntent(amount, userId, planId) {
  try {
    const res = await fetch(`${API_BASE}/paymongo/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, userId, planId }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error("PayMongo intent failed: " + errText);
    }

    const data = await res.json();
    return data.checkoutUrl; // ✅ returns the redirect URL
  } catch (err) {
    console.error("❌ createPaymentIntent error:", err);
    throw err;
  }
}
