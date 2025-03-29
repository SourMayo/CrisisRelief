import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About, MemberPage, Home, SignUp, Login, NotFound } from "./pages";
import Navbar from "./components/navbar";
import RankedResources from "./pages/RankedResources";

function App() {
  return (
    <Router>
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

        <Route path="/ranked-resources" element={<RankedResources />} />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
