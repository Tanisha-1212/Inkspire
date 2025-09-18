const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middleware/authMiddleware");
const {
    createNotifications,
    getNotifications,
    markAsRead
} = require("../controller/notificationController");

router.post("/", isLoggedIn, createNotifications);

router.get("/", isLoggedIn, getNotifications);

router.patch("/:id/read", isLoggedIn, markAsRead);

module.exports = router;