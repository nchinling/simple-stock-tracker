const API_BASE_URL = "http://localhost:5000";

const authenticateLogin = async (name, email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/login`, {
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
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
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

const addStockTransaction = async (email, symbol, quantity, purchasePrice) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stocks/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        symbol,
        quantity,
        purchasePrice,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add stock transaction");
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// const getStocksWithTransactions = async (userId) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/stocks/${userId}`);

//     if (!response.ok) {
//       throw new Error("Failed to fetch stock transactions.");
//     }

//     const data = await response.json();
//     return data.stocks; // Returns stock + transaction data
//   } catch (error) {
//     console.error("Error fetching stock transactions:", error);
//     throw error;
//   }
// };

const fetchUserStocks = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stocks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    return { success: false };
  }
};

// deleteStock api
const deleteStock = async (stockId) => {
  const response = await fetch(`${API_BASE_URL}/api/stocks/${stockId}`, {
    method: "DELETE",
  });

  const data = await response.json();
  return data;
};

export {
  authenticateLogin,
  registerUser,
  addStockTransaction,
  // getStocksWithTransactions,
  fetchUserStocks,
  deleteStock,
};
