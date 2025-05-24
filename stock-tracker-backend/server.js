import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import stockRoutes from "./routes/stockRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 5000;

app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse incoming form payloads
app.use(cors());

// Routes for testing
app.get("/", (req, res) => {
  res.send("Hello, Express... cool!");
});

app.get("/api/communicate", async (req, res) => {
  res.send("Hello user! You have communicated with the server");
});

// Modular routes
app.use("/api/stocks", stockRoutes);
app.use("/api/user", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
