import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  About,
  MemberPage,
  Home,
  SignUp,
  Login,
  NotFound,
  Resources,
  MedicalResources,
  FoodBanks,
  OvernightShelters,
  WeatherWarning,
  Profile,
  Settings,
  Preferences,
} from "./pages";

import Navbar from "./components/navbar";
import PageTransition from "./components/PageTransition";
import MapView from "./components/mapView";
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
          marginTop: "4rem", // navbar space
        }}
      />
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/:memberId" element={<MemberPage />} />
          <Route path="/Register" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Resources" element={<Resources />} />
          <Route path="/medicalResources" element={<MedicalResources />} />
          <Route path="/foodBanks" element={<FoodBanks />} />
          <Route path="/overnightShelters" element={<OvernightShelters />} />
          <Route path="/weatherWarnings" element={<WeatherWarning />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/app-preferences" element={<Preferences />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </Router>
  );
}

export default App;
