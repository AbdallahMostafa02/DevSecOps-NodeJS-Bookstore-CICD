// const express = require("express");
// const Book = require("../models/Book");
// const auth = require("../middleware/auth");

// const router = express.Router();

// // Add Book
// router.post("/", auth, async (req, res) => {
//   const { title, author, year } = req.body;
//   const book = new Book({ title, author, year });
//   await book.save();
//   res.json(book);
// });

// // Get All Books
// router.get("/", async (req, res) => {
//   const books = await Book.find();
//   res.json(books);
// });

// module.exports = router;

// ..............................................

const express = require("express");
const Book = require("../models/Book");
const auth = require("../middleware/auth");

const router = express.Router();

// Add Book
router.post("/", auth, async (req, res) => {
  try {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
      return res.status(400).json({ error: "Title, author and year are required" });
    }

    const book = new Book({ title, author, year });
    await book.save();
    res.json(book);
  } catch (err) {
    console.error("Error adding book:", err.message);
    res.status(500).json({ error: "Failed to add book" });
  }
});

// Get All Books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

module.exports = router;
