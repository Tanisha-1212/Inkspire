import DotsBackground from "../components/DotsBackground";
import { Link } from "react-router-dom";

export default function LandingPage() {
  // Featured Categories
  const categories = ["Technology", "Travel", "Lifestyle", "Food", "Education"];

  return (
    <div className="relative overflow-hidden z-10 bg-black text-white min-h-screen flex flex-col">
      <DotsBackground />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-screen px-6">
        <h1 className="text-5xl md:text-7xl font-bold relative z-10">
          Inspire. Create. <span className="text-green-400">Inkspire.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 relative z-10 max-w-2xl">
          A space for writers and readers to connect, share, and grow together.
        </p>
        <div className="mt-8 flex gap-4 relative z-10">
          <Link
            to="/signup"
            className="text-green-400 border border-green-400 px-6 py-3 rounded-md font-semibold transform transition duration-300 hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            to="/explore"
            className="border border-green-400 text-green-400 px-6 py-3 rounded-md font-semibold transform transition duration-300 hover:scale-105"
          >
            Explore Blogs
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Inkspire?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 border border-green-400 rounded-xl transform transition duration-300 hover:scale-105 shadow-lg shadow-green-400/40">
            <h3 className="text-xl font-semibold mb-4">✍️ Write Your Thoughts</h3>
            <p>Share your stories and ideas with a community of creators.</p>
          </div>
          <div className="p-6 border border-green-400 rounded-xl transform transition duration-300 hover:scale-105 shadow-lg shadow-green-400/40">
            <h3 className="text-xl font-semibold mb-4">📖 Discover Blogs</h3>
            <p>Explore diverse perspectives and learn from others.</p>
          </div>
          <div className="p-6 border border-green-400 rounded-xl transform transition duration-300 hover:scale-105 shadow-lg shadow-green-400/40">
            <h3 className="text-xl font-semibold mb-4">👩‍💻 Connect & Engage</h3>
            <p>Comment, discuss, and connect with like-minded people.</p>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-20 px-6 text-center relative z-10">
        <h2 className="text-3xl font-bold mb-10 text-green-400">Featured Categories</h2>
        <div className="flex justify-center gap-6 flex-wrap">
          {categories.map((cat, i) => (
            <Link
              key={category.name}
              to={`/category/${category.name}`}
              className="p-6 border border-green-400 rounded-xl cursor-pointer hover:scale-105 transition"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-6">
          Ready to <span className="text-green-400">Inkspire</span> the world?
        </h2>
        <Link
          to="/signup"
          className="bg-green-400 text-black px-8 py-4 rounded-md font-semibold hover:bg-green-500 transition"
        >
          Start Writing Today
        </Link>
      </section>
    </div>
  );
}
