const express = require("express");
const router = express.Router();
const {login, register, logout, getCurrentUser} = require("../controller/authController");
const {isLoggedIn, verifyToken} = require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", isLoggedIn, logout);

router.get("/me",isLoggedIn, verifyToken, getCurrentUser);

module.exports = router;