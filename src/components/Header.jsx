import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Header() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

 // Function to get initials safely
const getInitials = (name) => {
  if (!name) return ""; // Return empty string if name is undefined
  const names = name?.split(" ").filter(n => n); // remove empty strings
  const initials = names.map(n => n[0]?.toUpperCase() || ""); // safe check for undefined
  return initials.slice(0, 2).join(""); // only first 2 letters
};


  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold">🛒 E-Commerce App</Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/products" className="hover:text-gray-300 transition">Products</Link>
          <Link to="/cart" className="hover:text-gray-300 transition">Cart</Link>

          {user ? (
            <div className="relative group">
              {/* Profile Button with initials */}
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-blue-600 font-bold hover:ring-2 hover:ring-white transition">
                {getInitials(user?.name)}
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-3 w-64 bg-white text-black rounded-lg shadow-lg py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {/* Optional arrow */}
                <div className="absolute top-[-6px] right-4 w-3 h-3 bg-white rotate-45 shadow-sm"></div>

                <div className="px-4 py-2 border-b">
                  <p className="font-bold text-sm">{user?.name?.split(" ")[0]}</p>
                  <p className="text-gray-600 text-xs truncate">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
