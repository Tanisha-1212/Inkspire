import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Explore from "./pages/Explore"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import SingleBlog from "./pages/SingleBlog"
import Category from "./pages/category"
import CreateBlog from "./pages/CreateBlog"


// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

// Hooks
import { useAuth } from "./context/authContext";

export default function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="app-container flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={<Login />} />

            <Route path="/explore" element={<Explore />} />

            <Route path="/blog/:id" element={<SingleBlog />} />

            <Route path="/profile/:userId?" element={<Profile />} />

            <Route path="/category/:categoryName" element={<Category />} />

            <Route path="create-blog" element={<CreateBlog/>}/>

            {/* 404 Page */}
            <Route path="/notFound" element={<NotFound />} />
          </Routes>
        </main>

        <Footer/>
      </div>
    </Router>
  );
}
