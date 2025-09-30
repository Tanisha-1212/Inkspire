import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"


// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

// Hooks
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={<Login />} />
            {/* 404 Page */}
            <Route path="/notFound" element={<NotFound />} />
          </Routes>
        </main>

        <Footer/>
      </div>
    </Router>
  );
}
