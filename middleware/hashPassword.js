const bcrypt = require("bcrypt");

const hashPassword = async (req, res, next) => {
  // Get the salt rounds
  const saltRounds = 10;

  // Hash the password
  const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

  // Replace the password with hashpassword
  req.body.password = hashPassword;

  // Go to the next middleware
  next();
};

module.exports = hashPassword;
