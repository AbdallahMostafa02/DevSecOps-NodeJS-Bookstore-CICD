// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).send("Access Denied");

//   try {
//     const verified = jwt.verify(token, "secret123");
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).send("Invalid Token");
//   }
// };
// ...........................................
// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   if (!authHeader) return res.status(401).send("Access Denied");

//   // لو موجود "Bearer " في بداية الـ header، نشيله
//   const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

//   try {
//     const verified = jwt.verify(token, "secret123");
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).send("Invalid Token");
//   }
// };
// ..............................................

// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   if (!authHeader) return res.status(401).send("Access Denied");

//   // لو موجود "Bearer " في بداية الـ header، نشيله
//   const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET || "secret123");
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).send("Invalid Token");
//   }
// };

// ................................................................................................

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ error: "Access Denied" });

  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ error: "Invalid Token" });
  }
};


