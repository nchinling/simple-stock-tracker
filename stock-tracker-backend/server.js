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

app.get("/api/data", async (req, res) => {
  const symbol = req.query.symbol || "IBM";
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${APIKEY}`
    );

    const timeSeries = response.data["Time Series (Daily)"];
    const dates = Object.keys(timeSeries);
    const latestDate = dates[0];
    const latestClose = timeSeries[latestDate]["4. close"];

    res.json({
      symbol,
      date: latestDate,
      closing_price: latestClose,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch or process data" });
  }
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

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
