import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/user', { method: 'GET', credentials: 'include' });
        const data = await response.json();
        if (response.ok) {
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
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };



  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });

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
  const handleKeyInput = (key) => {
    let query = ''
    const value = key.target.value;
    if(value) query = `?s=${value}`
    if (key.keyCode === 13) {
      
    key.target.value = '';
      navigate(`/search${query}`) }
  }




  return (
    
   <nav className={"bg-blue-100 shadow-md"}>
  <div className="container mx-auto flex justify-center items-center py-2 border-b">
    <div className="flex items-center space-x-6">
      <a href="#" className="text-gray-700 hover:text-blue-500">
        <span role="img" aria-label="heart"> <a href="/">
          &#x2764;&#xFE0F;</a>
        </span>
        Të preferuarat
      </a>
          <input
            type="text"
            placeholder="Destinacioni"
            className="border rounded px-3 py-1 text-sm"
            onKeyDown={handleKeyInput}
          />
          
          <div className="relative">
          <button
            className="block lg:hidden text-gray-700 hover:text-blue-500"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? "\u2715" : "\u2630"} {/* Close and Hamburger Icons */}
          </button>

            {/* Menuja e dropdown-it */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-32 z-20 ">
                <ul className="py-1 text-sm ">
                  <li>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:text-blue-500">
                      SQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:text-blue-500">
                      EN
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigimi kryesor */}
      <div className="hidden lg:flex container mx-auto justify-center items-center py-4 ">
        <div className=" space-x-6 truncate text-sm font-medium text-black transition-colors hover:text-primary">
          <a href="/turqi" target="" className="text-gray-700 hover:text-blue-500">Turqi</a>
          <a href="/bullgari" target="" className="text-gray-700 hover:text-blue-500">Bullgari</a>
          <a href="/FestateFundVitit" className="text-gray-700 hover:text-blue-500">Festat e fundvitit</a>
          <a href="/Maqedoni" className="text-gray-700 hover:text-blue-500">Maqedoni</a>
          <a href="/Greqi" className="text-gray-700 hover:text-blue-500">Greqi</a>
          <a href="/EuropeCityBreak" className="text-gray-700 hover:text-blue-500">Europe-City Break</a>
          <a href="/Dubai" className="text-gray-700 hover:text-blue-500">Dubai</a>
          <a href="/VisitKosova" className="text-gray-700 hover:text-blue-500">Visit Kosova</a>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-gray-700 hover:text-blue-500">
              Logout
            </button>
            
          ) : (
            <>


              <a href="/register" className="text-gray-700 hover:text-blue-500">
                Register
              </a>
              <a href="/login" className="text-gray-700 hover:text-blue-500">
                Login
              </a>
            </>
          )}
          {(role === 'admin' || role === 'owner') ? (
            <button onClick={handleDashboard} className="text-gray-700 hover:text-blue-500">
              Dashboard
            </button>
          ): null}
          <a href="/kontakt" className="text-gray-700 hover:text-blue-500">Kontakti</a>
        </div>
      </div>


      {isMobileMenuOpen && (
        <div className="lg:hidden bg-blue-100 shadow-md">
          <ul className="py-2 text-sm">
            <li className="py-1">
              <a href="/turqi" className="block px-4 text-gray-700 hover:text-blue-500">
                Turqi
              </a>
            </li>
            <li className="py-1">
              <a href="/bullgari" className="block px-4 text-gray-700 hover:text-blue-500">
                Bullgari
              </a>
            </li>
            <li className="py-1">
              <a href="/FestateFundVitit" className="block px-4 text-gray-700 hover:text-blue-500">
                FestateFundvitit
              </a>
            </li>
            <li className="py-1">
              <a href="/Maqedoni" className="block px-4 text-gray-700 hover:text-blue-500">
                Maqedoni
              </a>
            </li>
            <li className="py-1">
              <a href="/Greqi" className="block px-4 text-gray-700 hover:text-blue-500">
                Greqi
              </a>
            </li>
            <li className="py-1">
              <a href="/EuropeCityBreak" className="block px-4 text-gray-700 hover:text-blue-500">
              EuropeCityBreak
              </a>
            </li>
            <li className="py-1">
              <a href="/Dubai" className="block px-4 text-gray-700 hover:text-blue-500">
                Dubai
              </a>
            </li>
            <li className="py-1">
              <a href="/Maqedoni" className="block px-4 text-gray-700 hover:text-blue-500">
                Maqedoni
              </a>
            </li>
            <li className="py-1">
              <a href="/VisitKosova" className="block px-4 text-gray-700 hover:text-blue-500">
              VisitKosova
              </a>
            </li>
            {/* Add other links here */}
            {isLoggedIn ? (
              <li className="py-1">
                <button onClick={handleLogout} className="block px-4 text-gray-700 hover:text-blue-500">
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="py-1">
                  <a href="/register" className="block px-4 text-gray-700 hover:text-blue-500">
                    Register
                  </a>
                </li>
                <li className="py-1">
                  <a href="/login" className="block px-4 text-gray-700 hover:text-blue-500">
                    Login
                  </a>
                </li>
              </>
            )}
            {(role === "admin" || role === "owner") && (
              <li className="py-1">
                <button
                  onClick={handleDashboard}
                  className="block px-4 text-gray-700 hover:text-blue-500"
                >
                  Dashboard
                </button>
              </li>
            )}
            <li className="py-1">
              <a href="#" className="block px-4 text-gray-700 hover:text-blue-500">
                Kontakti
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nav;
