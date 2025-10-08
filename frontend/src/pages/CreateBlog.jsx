import React, { useState } from "react";
import { useBlogs } from "../context/blogContext";
import { useNavigate } from "react-router-dom";
import DotsBackground from "../components/DotsBackground";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const { addBlog, loading } = useBlogs();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !description) {
      alert("Please add an image and description!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await addBlog(formData);
      alert("Blog created successfully!");
      navigate("/blogs");
    } catch (err) {
      alert(err.message || "Failed to create blog");
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden bg-black z-10">
      <DotsBackground />

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row gap-6 p-4">
        {/* Left: Form */}
        <div className="flex-1 bg-white/10 backdrop-blur-md border border-green-400/30 shadow-lg rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-3xl font-bold mb-4 text-green-300">Create Blog</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border border-green-400/50 p-2 rounded-md text-white placeholder-green-200/70"
            />
            <textarea
              placeholder="Description"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-transparent border border-green-400/50 p-2 rounded-md text-white placeholder-green-200/70"
            ></textarea>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-transparent border border-green-400/50 p-2 rounded-md text-white placeholder-green-200/70"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent border border-green-400/50 p-2 rounded-md text-white placeholder-green-200/70"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="text-green-200"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500/80 hover:bg-green-500 text-black font-semibold py-2 rounded-md transition"
            >
              {loading ? "Creating..." : "Create Blog"}
            </button>
          </form>
        </div>

        {/* Right: Live Preview */}
        <div className="flex-1 bg-white/10 backdrop-blur-md border border-green-400/30 shadow-lg rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4 text-green-300">Live Preview</h2>
          <div className="border border-green-400/50 rounded-xl p-4 bg-black/30 flex flex-col gap-3">
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <h3 className="text-xl font-bold text-green-400">
              {title || "Your blog title"}
            </h3>
            <p className="text-gray-300">
              {description || "Your blog description will appear here..."}
            </p>
            {tags && (
              <div className="flex flex-wrap gap-2">
                {tags.split(",").map((tag, i) => (
                  <span
                    key={i}
                    className="bg-green-400/50 text-black px-2 py-1 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
            {category && (
              <span className="text-green-300 text-sm font-semibold">
                Category: {category}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
