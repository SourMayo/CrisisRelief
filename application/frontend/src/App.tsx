import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About, MemberPage, Home, SignUp, Login, NotFound, Resources } from "./pages";
import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        theme="colored"
        style={{
          zIndex: 2000,
          marginTop: "4rem", // Add space for navbar
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* About page that lists all members */}
        <Route path="/about" element={<About />} />
        {/* Nested route for member details under /about */}
        <Route path="/about/:memberId" element={<MemberPage />} />
        {/* Sign Up page */}
        <Route path="/Register" element={<SignUp />} />
        {/* Login page */}
        <Route path="/Login" element={<Login />} />

        {/* Home page */}
        <Route path="/Home" element={<Home />} />
        {/* Login page */}
        <Route path="/Resources" element={<Resources />} />
        

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
