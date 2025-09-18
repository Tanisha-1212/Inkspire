const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middleware/authMiddleware");
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    likeBlog,
    getBlogByFilter,
    getBlogLikes
} = require("../controller/blogController");

router.post("/", isLoggedIn, createBlog);

router.get("/", getAllBlogs);

router.get("/:id", getBlogById);

router.put("/:id", isLoggedIn, updateBlog);

router.delete("/:id", isLoggedIn, deleteBlog);

router.post("/:id/like", isLoggedIn, likeBlog);

router.get("/filter", getBlogByFilter);

router.get("/:id", getBlogLikes);


module.exports = router;