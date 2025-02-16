import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About, MemberPage } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        {/* About page that lists all members */}
        <Route path="/about" element={<About />} />

        {/* Nested route for member details under /about */}
        <Route path="/about/:memberId" element={<MemberPage />} />
      </Routes>
    </Router>
  );
}

export default App;
