import { useEffect } from "react";
import { Link } from "react-router-dom"; 
import { useBlogs } from "../context/blogContext";

export default function ExplorePage() {
  const { blogs, loading, fetchAllBlogs } = useBlogs();

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden pb-5">
      <h1 className="text-4xl md:text-5xl font-bold text-green-400 text-center py-12">
        Explore Blogs
      </h1>

      {loading ? (
        <div className="text-center text-green-400 text-xl py-10">
          Loading blogs...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">
              No blogs available.
            </p>
          ) : (
            blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog._id}`}
                className="group"
              >
                <div className="bg-gray-900 border border-green-400 rounded-xl overflow-hidden shadow-lg shadow-green-400/30 transform transition duration-300 hover:scale-105">
                  {blog.pictures && blog.pictures[0] && (
                    <img
                      src={blog.pictures[0]}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:opacity-90 transition"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-green-400 mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-300 mb-2">
                      {blog.description.length > 120
                        ? blog.description.slice(0, 120) + "..."
                        : blog.description}
                    </p>
                    <p className="text-sm text-gray-400">
                      By {blog.creator?.name || "Unknown"}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
