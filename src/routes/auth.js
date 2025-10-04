// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const user = new User({ username, password: hash });
//   await user.save();
//   res.send("User registered");
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (!user) return res.status(400).send("User not found");

//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) return res.status(400).send("Invalid credentials");

//   const token = jwt.sign({ id: user._id }, "secret123");
//   res.json({ token });
// });

// module.exports = router;
// ...........................................................




// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     const user = new User({ username, password: hash });
//     await user.save();
//     res.send("User registered");
//   } catch (error) {
//     console.error(error);
//     res.status(400).send("Registration failed");
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).send("User not found");

//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) return res.status(400).send("Invalid credentials");

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret123");
//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Login failed");
//   }
// });

// module.exports = router;



// ....................................................................


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
      return res.status(400).json({ error: "Username and password required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ username, password: hash });
    await user.save();
    res.json({ message: "User registered" });
  } catch (error) {
    console.error("Registration failed:", error.message);
    res.status(400).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;

  
