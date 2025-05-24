// const express = require("express");
import express from "express";
// const cors = require("cors");
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import stockRoutes from "./routes/stockRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
