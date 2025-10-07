const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Username and password required");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ username, password: hash });
    await user.save();
    res.send("User registered");
  } catch (error) {
    console.error("Registration failed:", error.message);
    res.status(400).send("Registration failed");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Username and password required");
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, "secret123");
    res.json({ token });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).send("Login failed");
  }
});

module.exports = router;


