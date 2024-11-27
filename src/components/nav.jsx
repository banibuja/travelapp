import React, { useState } from "react";

function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-center items-center py-2 border-b">
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-500">
            <span role="img" aria-label="heart">❤️</span> Të preferuarat
          </a>
          <input
            type="text"
            placeholder="Destinacioni"
            className="border rounded px-3 py-1 text-sm"
          />
          
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-blue-500 flex items-center space-x-2"
            >
              <span role="img" aria-label="globe">🌍</span>
              <span>SQ</span>
            </button>

            {/* Menuja e dropdown-it */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-32">
                <ul className="py-1 text-sm">
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
      <div className="container mx-auto flex justify-center items-center py-4">
        <div className="hidden md:flex space-x-6 truncate text-sm font-medium text-black transition-colors hover:text-primary">
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Visit Kosova
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Turqi
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Dimri
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Festat e fundvitit
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Maqedoni
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Greqi
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Europe-City Break
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Dubai
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Client Care
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            B2B Login
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Kontakti
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
