const API_BASE = import.meta.env.VITE_API_BASE;

export async function createPaymentIntent(amount, userId, planId) {
  const response = await fetch(`${API_BASE}/paymongo/create-payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, userId, planId }),
  });

  if (!response.ok) {
    throw new Error("Failed to create PayMongo payment intent");
  }

  const data = await response.json();
  return data.checkoutUrl;
}
