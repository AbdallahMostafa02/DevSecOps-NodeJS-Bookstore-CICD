const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Connect MongoDB
mongoose.connect("mongodb://mongo:27017/bookstore")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app; // for testing

// const express = require("express");
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/auth");
// const bookRoutes = require("./routes/books");

// const app = express();
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/books", bookRoutes);

// // Connect MongoDB
// mongoose.connect("mongodb://mongo:27017/bookstore")
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error(err));

// // فقط إذا الملف تم تشغيله مباشرة، شغّل السيرفر
// if (require.main === module) {
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// }

// module.exports = app; // for testing
