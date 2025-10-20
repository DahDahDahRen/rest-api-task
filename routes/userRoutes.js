const express = require("express");
const router = express.Router();
const {
  registerUserController,
  userLoginController,
  getAllUser,
  deleteAllUser,
} = require("../controller/userController");
const hashPassword = require("../middleware/hashPassword");

router.get("/", getAllUser);

router.post("/register", hashPassword, registerUserController);

router.post("/login", userLoginController);

router.delete("/", deleteAllUser);

module.exports = router;
