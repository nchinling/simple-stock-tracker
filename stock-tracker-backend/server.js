// import express framework
const express = require("express");

// create express instance
const app = express();

// json parsing and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import the database connection
const dbconn = require("./config/db");

const axios = require("axios");
const cors = require("cors");
app.use(cors());
const PORT = 5000;
const APIKEY = process.env.APIKEY;

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, Express... cool!");
});

app.get("/api/communicate", async (req, res) => {
  res.send("Hello user! You have communicated with the server");
});

// How app.get() Works
// - app.get(path, callback)

// arrow function to traditional function
// function requestHandler(req, res) {
//   res.send("Hello, Express... cool!");
// }

// Example of using the database connection in a route
app.get("/users", (req, res) => {
  dbconn.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    res.json(results);
  });
});

app.get("/form", (req, res) => {
  res.send("Form is sent");
});

// login
app.post("/api/login", (req, res) => {
  const { name, email } = req.body;

  dbconn.query(
    "SELECT * FROM users WHERE name = ? AND email = ?",
    [name, email],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Database error" });
      }

      if (results.length > 0) {
        console.log("user validated");
        res.json({ success: true, user: results[0] });
      } else {
        console.log("user validation failed");
        res.json({ success: false, message: "Invalid credentials" });
      }
    }
  );
});

//create new user
app.post("/api/register", (req, res) => {
  const { name, email } = req.body;

  dbconn.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(409)
            .json({ success: false, message: "Email already exists." });
        }
        return res
          .status(500)
          .json({ success: false, message: "Database error." });
      }

      res.json({ success: true, message: "User registered successfully!" });
    }
  );
});

app.post("/api/data", (req, res) => {
  const { email, symbol, quantity, purchasePrice } = req.body;

  dbconn.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err || results.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const user_id = results[0].id;

      // Insert into stocks
      dbconn.query(
        "INSERT INTO stocks (user_id, symbol) VALUES (?, ?)",
        [user_id, symbol],
        (err, stockResult) => {
          if (err) {
            return res
              .status(500)
              .json({ success: false, message: "Error inserting stock" });
          }

          const stockId = stockResult.insertId;

          // Insert into transactions
          dbconn.query(
            "INSERT INTO transactions (stock_id, quantity, purchase_price) VALUES (?, ?, ?)",
            [stockId, quantity, purchasePrice],
            (err, transactionResult) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  message: "Error inserting transaction",
                });
              }

              // Retrieve all stocks for user
              dbconn.query(
                `SELECT s.symbol, t.quantity, t.purchase_price AS purchasePrice
                 FROM stocks s
                 JOIN transactions t ON s.id = t.stock_id
                 WHERE s.user_id = ?`,
                [user_id],
                (err, stockRows) => {
                  if (err) {
                    return res.status(500).json({
                      success: false,
                      message: "Error fetching stocks",
                    });
                  }

                  // You can later calculate currentPrice & profit/loss in frontend or here
                  res.json({
                    success: true,
                    stocks: stockRows,
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});

app.post("/api/stocks", (req, res) => {
  const { email } = req.body;

  dbconn.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err || results.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const user_id = results[0].id;

      const query = `
      SELECT s.id AS stockId, s.symbol, t.quantity, t.purchase_price AS purchasePrice
      FROM stocks s
      JOIN transactions t ON s.id = t.stock_id
      WHERE s.user_id = ?
    `;
      dbconn.query(query, [user_id], (err, stocks) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Failed to fetch stocks" });
        }

        res.json({ success: true, stocks });
      });
    }
  );
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
