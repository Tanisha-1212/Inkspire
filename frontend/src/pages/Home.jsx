import DotsBackground from "../components/DotsBackground";
import {Link} from "react-router-dom";
export default function LandingPage() {

  return (
    <div className="relative overflow-hidden z-10 bg-black text-white min-h-screen flex flex-col">
      
      <DotsBackground/>

      {/* Hero Section */}
      <section className=" flex flex-col items-center justify-center text-center min-h-screen px-6">
        
        <h1 className="text-5xl md:text-7xl font-bold relative z-10">
          Inspire. Create. <span className="text-green-400">Inkspire.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 relative z-10 max-w-2xl">
          A space for writers and readers to connect, share, and grow together.
        </p>
        <div className="mt-8 flex gap-4 relative z-10">
          <button className=" text-green-400 border border-green-400 px-6 py-3 rounded-md font-semibold  transform transition duration-300 hover:scale-105">
            Get Started
          </button>
          <Link to="/explore" className="border border-green-400 text-green-400 px-6 py-3 rounded-md font-semibold transform transition duration-300 hover:scale-105">
            Explore Blogs
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6  text-center">
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

      {/* Community Section */}
      <section className="py-20 px-6  text-center">
        <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">
          “Thousands of creators are already sharing their voices on Inkspire.”
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          {["A", "B", "C", "D", "E"].map((user, i) => (
            <div
              key={i}
              className="w-12 h-12 flex items-center justify-center bg-green-400 text-black rounded-full font-bold"
            >
              {user}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20  text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to <span className="text-green-400">Inkspire</span> the world?
        </h2>
        <button className="bg-green-400 text-black px-8 py-4 rounded-md font-semibold hover:bg-green-500 transition">
          Start Writing Today
        </button>
      </section>
      
    </div>
  );
}



