const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
// app.get("/", (req, res) => res.send("Hello, Express... cool!"));
// app.get("/api/communicate", (req, res) =>
//   res.send("Hello user! You have communicated with the server")
// );
// app.get("/form", (req, res) => res.send("Form is sent"));

// Modular routes
app.use("/api/stocks", require("./routes/stockRoutes"));
app.use("/api/user", require("./routes/authRoutes"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
