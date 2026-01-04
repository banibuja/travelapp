import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5001/user', { method: 'GET', credentials: 'include' });
        const data = await response.json();
        if (response.ok && data.user) {
          setRole(data.user.role)
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, [navigate])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5001/logout', {}, { withCredentials: true });

      if (response.status === 200) {
        window.location.reload(); 
        navigate('/');
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  }

  return (
    <nav className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-1 overflow-x-auto scrollbar-hide">
            {[
              { href: "/turqi", label: "Turkey" },
              { href: "/bullgari", label: "Bulgaria" },
              { href: "/FestateFundVitit", label: "New Year Holidays" },
              { href: "/Maqedoni", label: "Macedonia" },
              { href: "/Greqi", label: "Greece" },
              { href: "/EuropeCityBreak", label: "Europe-City Break" },
              { href: "/Dubai", label: "Dubai" },
              { href: "/VisitKosova", label: "Visit Kosova" },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200 whitespace-nowrap relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Login
                  </Link>
                </>
              )}
              {(role === 'admin' || role === 'owner') && (
                <button
                  onClick={handleDashboard}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Dashboard
                </button>
              )}
              <Link
                to="/kontakt"
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-1">
              {[
                { href: "/turqi", label: "Turkey" },
                { href: "/bullgari", label: "Bulgaria" },
                { href: "/FestateFundVitit", label: "New Year Holidays" },
                { href: "/Maqedoni", label: "Macedonia" },
                { href: "/Greqi", label: "Greece" },
                { href: "/EuropeCityBreak", label: "Europe-City Break" },
                { href: "/Dubai", label: "Dubai" },
                { href: "/VisitKosova", label: "Visit Kosova" },
              ].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 my-2"></div>
              
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 font-medium"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 font-semibold text-center"
                  >
                    Login
                  </Link>
                </>
              )}
              {(role === "admin" || role === "owner") && (
                <button
                  onClick={() => {
                    handleDashboard();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 font-semibold"
                >
                  Dashboard
                </button>
              )}
              <Link
                to="/kontakt"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
