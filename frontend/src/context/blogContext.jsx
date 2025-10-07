import { createContext, useContext, useState } from "react";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
  getBlogByFilter,
  getBlogLikes,
} from "../api/blogApi";

import {getCommentByBlog, addComment, deleteComment} from "../api/commentApi";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all blogs
  const fetchAllBlogs = async () => {
    setLoading(true);
    try {
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch all blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch a single blog by ID
  const fetchBlogById = async (id) => {
    setLoading(true);
    try {
      const blog = await getBlogById(id);
      return blog;
    } catch (err) {
      console.error("Failed to fetch blog:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create a new blog
  const addBlog = async (blogData) => {
    try {
      const newBlog = await createBlog(blogData);
      setBlogs((prev) => [newBlog, ...prev]);
      return newBlog;
    } catch (err) {
      console.error("Failed to create blog:", err);
      throw err;
    }
  };

  // ✅ Update blog
  const editBlog = async (id, blogData) => {
    try {
      const updatedBlog = await updateBlog(id, blogData);
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? updatedBlog : b))
      );
      return updatedBlog;
    } catch (err) {
      console.error("Failed to update blog:", err);
      throw err;
    }
  };

  // ✅ Delete blog
  const removeBlog = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Failed to delete blog:", err);
      throw err;
    }
  };

  // ✅ Like a blog
    const likeBlogPost = async (id) => {
    try {
      const likesCount = await likeBlog(id);
      setBlogs((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, totalLikes: likesCount } : b
        )
      );
      return likesCount;
    } catch (err) {
      console.error("Failed to like blog:", err);
      throw err;
    }
  };

  // ✅ Fetch blogs by filter
  const fetchBlogsByFilter = async (filterData) => {
    setLoading(true);
    try {
      const data = await getBlogByFilter(filterData);
      setBlogs(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch blogs by filter:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get likes of a blog
  const fetchBlogLikes = async (id) => {
    try {
      const likes = await getBlogLikes(id);
      return likes;
    } catch (err) {
      console.error("Failed to fetch blog likes:", err);
      throw err;
    }
  };

  // Fetch comments for a blog
  const fetchComments = async (blogId) => {
    try {
      const comments = await getCommentByBlog(blogId);
      setBlogs((prev) =>
        prev.map((b) => (b._id === blogId ? { ...b, comments } : b))
      );
      return comments;
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      throw err;
    }
  };

  // Add a comment
  const addBlogComment = async (blogId, commentData) => {
    try {
      const newComment = await addComment(blogId, commentData);
      setBlogs((prev) =>
        prev.map((b) =>
          b._id === blogId ? { ...b, comments: [newComment, ...(b.comments || [])] } : b
        )
      );
      return newComment;
    } catch (err) {
      console.error("Failed to add comment:", err);
      throw err;
    }
  };

  // Delete a comment
  const removeBlogComment = async (blogId, commentId) => {
    try {
      await deleteComment(blogId, commentId);
      setBlogs((prev) =>
        prev.map((b) =>
          b._id === blogId
            ? { ...b, comments: b.comments.filter((c) => c._id !== commentId) }
            : b
        )
      );
    } catch (err) {
      console.error("Failed to delete comment:", err);
      throw err;
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        fetchAllBlogs,
        fetchBlogById,
        addBlog,
        editBlog,
        removeBlog,
        likeBlogPost,
        fetchBlogsByFilter,
        fetchBlogLikes,
        setBlogs,
        fetchComments,
        addBlogComment,
        removeBlogComment
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogContext);
