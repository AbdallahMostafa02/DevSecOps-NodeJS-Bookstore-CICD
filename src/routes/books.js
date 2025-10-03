const express = require("express");
const Book = require("../models/Book");
const auth = require("../middleware/auth");

const router = express.Router();

// Add Book
router.post("/", auth, async (req, res) => {
  const { title, author, year } = req.body;
  const book = new Book({ title, author, year });
  await book.save();
  res.json(book);
});

// Get All Books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

module.exports = router;

