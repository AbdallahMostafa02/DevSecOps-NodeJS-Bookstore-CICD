const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).send("Access Denied");

  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  try {
    const verified = jwt.verify(token, "secret123");
    req.user = verified;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(400).send("Invalid Token");
  }
};
