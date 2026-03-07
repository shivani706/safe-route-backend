// ===== Navbar Component =====
// Responsive navigation bar with logo, links, and hamburger menu.
// Highlights the active page and collapses on mobile.

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { MdShield } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { NAV_LINKS } from "../utils/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Get navigation links based on user role
  const links = user?.role === "authority" ? NAV_LINKS.authority : NAV_LINKS.tourist;

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <MdShield className="text-3xl text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
              SafeTourist
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {isLoggedIn &&
              links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (slides down) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 border-t border-slate-100" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 space-y-1 bg-white">
          {isLoggedIn &&
            links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {link.name}
              </Link>
            ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium text-center hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
