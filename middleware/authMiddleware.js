const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  console.log(req.cookies);

  next();
};

module.exports = authMiddleware;
