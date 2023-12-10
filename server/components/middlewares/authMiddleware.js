// authMiddleware.js
const jwt = require("jsonwebtoken");

const userAuthenToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.userId = data._id;
    next();
  });
};

module.exports = { userAuthenToken };
