import React from 'react';

function Nav() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-[10rem]">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="path-to-your-logo.png"
            alt="Logo"
            className="h-8 mr-3"
          />
       
        </div>

        {/* Navigation Links */}
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
