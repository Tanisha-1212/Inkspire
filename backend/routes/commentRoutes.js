const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middleware/authMiddleware");
const {
    addComment,
    deleteComment,
    getCommentByBlog,
    updateComment
} = require("../controller/commentController");

router.post("/:id", isLoggedIn, addComment);

router.delete("/:id", isLoggedIn, deleteComment);

router.get("/blog/:id", isLoggedIn, getCommentByBlog);

router.put("/:id", isLoggedIn, updateComment);

module.exports = router;