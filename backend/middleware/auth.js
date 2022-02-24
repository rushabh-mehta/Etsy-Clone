const jwt = require("jsonwebtoken");
const config = require("config");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['authorization'].split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;