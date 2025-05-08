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
  MiscSearch,
  ProfileSettings,
  PrivacyPolicy,
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
          marginTop: "4rem", // Add space for navbar
        }}
      />
      <Navbar />
      <PageTransition>
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
          {/* Medical Resources Page */}
          <Route path="/medicalResources" element={<MedicalResources />} />
          {/* Food Banks Page */}
          <Route path="/foodBanks" element={<FoodBanks />} />{" "}
          {/* Overnight Shelters Page */}
          <Route path="/overnightShelters" element={<OvernightShelters />} />
          {/* Weather Warning Page */}
          <Route path="/weatherWarnings" element={<WeatherWarning />} />
          {/* User Profile Page */}
          <Route path="/profile" element={<Profile />} />
          {/* Settings Page */}
          <Route path="/settings" element={<Settings />} />
          {/* Map View Page */}
          <Route path="/map" element={<MapView />} />
          {/* Preferences Page */}
          <Route path="/app-preferences" element={<Preferences />} />
          {/* General Search Page */}
          <Route path="/search" element={<MiscSearch />} />
          {/* General Search Page */}
          <Route path="/profile-settings" element={<ProfileSettings />} />
          {/* Privacy Policy Page */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </Router>
  );
}

export default App;
