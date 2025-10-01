import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogs } from "../context/BlogContext";
import { useAuth } from "../context/AuthContext";
import { Heart } from "lucide-react";

export default function SingleBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchBlogById, likeBlogPost, addBlogComment, fetchComments } = useBlogs();
  const { user, isAuthenticated } = useAuth();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      setLoading(true);
      try {
        const fetchedBlog = await fetchBlogById(id);
        setBlog(fetchedBlog);

        const blogComments = await fetchComments(id);
        setComments(blogComments || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!blog) return;
    const updatedLikes = await likeBlogPost(blog._id);
    setBlog({ ...blog, totalLikes: updatedLikes.length });
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const comment = await addBlogComment(blog._id, { text: newComment, user: user._id });
    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleCommentFocus = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  };

  if (loading) return <div className="text-center text-green-400 mt-20">Loading blog...</div>;
  if (!blog) return <div className="text-center text-red-500 mt-20">Blog not found.</div>;

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-10">
      {/* Blog Header */}
      <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">{blog.title}</h1>
      <p className="text-gray-300 mb-2">By {blog.creator?.name || "Unknown"}</p>
      <p className="text-sm text-gray-400 mb-6">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      {/* Blog Image */}
      {blog.pictures && blog.pictures[0] && (
        <img
          src={blog.pictures[0]}
          alt={blog.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
        />
      )}

      {/* Blog Content */}
      <p className="text-gray-300 text-lg mb-6">{blog.description}</p>

      {/* Likes */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-green-400 hover:text-green-500 transition"
        >
          <Heart className="w-5 h-5" />
          <span>{blog.totalLikes || 0}</span>
        </button>
      </div>

      {/* Comments */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-green-400">Comments</h2>

        {/* Add Comment */}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={handleCommentFocus}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-2 rounded-md bg-black text-white focus:outline-none w-72"
          />
          <button
            onClick={handleAddComment}
            className="bg-green-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-green-500 transition"
          >
            Post
          </button>
        </div>

        {/* Comment List */}
        {comments.length === 0 ? (
          <p className="text-gray-400">No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="border-b border-gray-700 py-2">
              <p className="text-gray-300">
                <span className="text-green-400 font-semibold">{c.user?.name || "User"}:</span> {c.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

