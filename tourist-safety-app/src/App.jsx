// ===== App.jsx — Main Application Router =====
// Defines all routes and wraps the app with Navbar.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TouristDashboard from "./pages/TouristDashboard";
import SafetyMap from "./pages/SafetyMap";
import Alerts from "./pages/Alerts";
import Profile from "./pages/Profile";
import SOS from "./pages/SOS";
import AuthorityDashboard from "./pages/AuthorityDashboard";

function App() {
  return (
    <Router>
      {/* Navbar shows on all pages */}
      <Navbar />

      {/* Page content */}
      <main className="min-h-screen">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Tourist routes */}
          <Route path="/dashboard" element={<TouristDashboard />} />
          <Route path="/map" element={<SafetyMap />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sos" element={<SOS />} />

          {/* Authority routes */}
          <Route path="/authority" element={<AuthorityDashboard />} />

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
                <div>
                  <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
                  <p className="text-xl text-slate-500 mb-6">Page not found</p>
                  <a href="/" className="text-blue-600 font-medium hover:underline">
                    ← Go back home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
