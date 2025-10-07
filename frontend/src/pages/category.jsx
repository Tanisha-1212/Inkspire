import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useBlogs } from "../context/blogContext";

export default function Category() {
  const { categoryName } = useParams();
  const { fetchAllBlogs } = useBlogs();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryBlogs = async () => {
      setLoading(true);
      try {
        const allBlogs = await fetchAllBlogs();
        const categoryBlogs = allBlogs.filter(
          (blog) => blog.category === categoryName
        );
        setBlogs(categoryBlogs);
      } catch (err) {
        console.error("Failed to load category blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryBlogs();
  }, [categoryName]);

  if (loading)
    return <div className="text-center text-green-400 mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-8">
        Category: {categoryName}
      </h1>

      {blogs.length === 0 ? (
        <p className="text-gray-400">No blogs found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog._id}`}
              className="bg-gray-900 border border-green-400 rounded-xl overflow-hidden hover:scale-105 transition-transform shadow-lg shadow-green-400/30"
            >
              {blog.pictures?.[0] && (
                <img
                  src={blog.pictures[0]}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-400">
                  {blog.title}
                </h3>
                <p className="text-gray-300 mt-2">
                  {blog.description.slice(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
