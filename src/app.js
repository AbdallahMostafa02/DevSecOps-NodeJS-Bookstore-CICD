const express = require("express");
const mongoose = require("mongoose");
const books = require("./routes/books");
const auth = require("./routes/auth");
const client = require("prom-client");  

const app = express();

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/books", books);
app.use("/api/auth", auth);

// Home route
app.get("/", (req, res) => {
  res.send("📚 NodeJS Bookstore API is running. Use /api/books or /api/auth");
});

// ---------------- Prometheus Metrics ----------------
const register = new client.Registry();

client.collectDefaultMetrics({ register });

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/bookstore")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

module.exports = app;




