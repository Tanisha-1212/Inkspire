const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middleware/authMiddleware");
const {
    getUserProfile,
    updateProfile,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    getBlogByUser
} = require("../controller/userController");

router.get("/:id", isLoggedIn, getUserProfile);

router.put("/update", isLoggedIn, updateProfile);

router.post("/:id/follow", isLoggedIn, followUser);

router.post("/:id/unfollow", isLoggedIn, unfollowUser);

router.get("/:id/followers", isLoggedIn, getFollowers);

router.get("/:id/following", isLoggedIn, getFollowing);

router.get("/:id/blogs", isLoggedIn, getBlogByUser);

module.exports = router;