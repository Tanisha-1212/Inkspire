const express = require("express");
const router = express.Router();
const {login, register, logout} = require("../controller/authController");
const {isLoggedIn} = require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", isLoggedIn, logout);

module.exports = router;