const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcrypt");
const { createCustomError } = require("../utils/createError");
const generateToken = require("../utils/generateToken");
const User = require("../model/User");
require("dotenv").config();

// POST: Register new user controller
// Desc: Register new user
// Desc: Generate new toekn
// Desc: Create cookie and send it to user
const registerUserController = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // Check user if already exist in db
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(createCustomError("The email already exist!", 404, false));
  }

  // Create new user
  const user = await User.create(req.body);

  // Check user if something wrong happen
  if (!user) {
    return next(createCustomError("Failed to register the user!", 404, false));
  }

  // generate jwt token
  const token = generateToken(user);

  // set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    statusCode: 200,
    ok: true,
    message: "Successfully created your account!, check cookie",
  });
});

// POST: Login user controller
// Desc: Login current user
const userLoginController = asyncHandler(async (req, res, next) => {
  // Get user email and password
  const { email, password } = req.body;

  // Check if email exist in db
  const user = await User.findOne({ email });

  if (!user) {
    return next(
      createCustomError("Email or password does not exist!", 404, false)
    );
  }

  // Check if password matched with user password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(
      createCustomError("Email or password does not exist", 404, false)
    );
  }

  const token = generateToken(user);

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    statusCode: 200,
    ok: true,
    message: "You successfully login!",
  });
});

// GET: Get all user
// Desc: prod controller for reading docs
const getAllUser = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    statusCode: 200,
    ok: true,
    results: users,
  });
});

// DELETE: Delete all user
// Desc: prod controller for deleting docs
const deleteAllUser = asyncHandler(async (req, res, next) => {
  const users = await User.deleteMany({});

  console.log(users);

  res.status(200).json({
    statusCode: 200,
    ok: true,
    message: "Successfully deleted all documents!",
  });
});

module.exports = {
  registerUserController,
  getAllUser,
  deleteAllUser,
  userLoginController,
};
