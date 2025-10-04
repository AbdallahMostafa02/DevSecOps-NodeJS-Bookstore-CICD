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

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// module.exports = app; // for testing
// ...........................................................................................
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
// ظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظ
// const express = require("express");
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/auth");
// const bookRoutes = require("./routes/books");

// const app = express();
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/books", bookRoutes);

// const mongoURI = process.env.MONGO_URL || "mongodb://localhost:27017/bookstore";
// mongoose.connect(mongoURI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error(err));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));

// module.exports = app;
// ...........................................................................................

// const express = require("express");
// const mongoose = require("mongoose");
// const books = require("./routes/books");
// const auth = require("./routes/auth");

// const app = express();
// app.use(express.json());
// app.use("/api/books", books);
// app.use("/api/auth", auth);

// mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/bookstore")
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error(err));

// module.exports = app;
// ....................................................................


// const express = require("express");
// const mongoose = require("mongoose");
// const books = require("./routes/books");
// const auth = require("./routes/auth");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.static("public"));

// // Routes
// app.use("/api/books", books);
// app.use("/api/auth", auth);

// // ✅ Route افتراضي للـ Home
// app.get("/", (req, res) => {
//   res.send("📚 NodeJS Bookstore API is running. Use /api/books or /api/auth");
// });

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/bookstore")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.error("❌ MongoDB connection error:", err));

// module.exports = app;

// ..................................................................................


const express = require("express");
const mongoose = require("mongoose");
const books = require("./routes/books");
const auth = require("./routes/auth");

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

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/bookstore")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

module.exports = app;

