const API_BASE_URL = "http://localhost:5000";

const authenticateLogin = async (name, email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      throw new Error("Error communicating with the server");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login request failed:", error);
    throw error;
  }
};

const registerUser = async (name, email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      throw new Error("Error registering user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export { authenticateLogin, registerUser };
