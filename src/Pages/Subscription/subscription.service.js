// src/Services/subscription.service.js

export const completeGoCardlessFlow = async (flowId, enrollmentId) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/gc/complete-flow`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flowId, enrollmentId }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to complete bank setup.");
    }
    return data;
  } catch (err) {
    console.error("Complete flow error:", err);
    throw err;
  }
};

export const createSubscription = async (payload) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/gc/create-subscription`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to create subscription.");
    }
    return data;
  } catch (err) {
    console.error("Create subscription error:", err);
    throw err;
  }
};