import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Menu({ isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  const menuItems = [
    {
      id: 'tables',
      label: 'Tables',
      icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      items: [
        { to: '/dashboard/turqitable', label: 'Turqi Table' },
        { to: '/dashboard/dubaitable', label: 'Dubai Table' },
        { to: '/dashboard/SliderManage', label: 'Home Slider' },
        { to: '/dashboard/GreqiSlider', label: 'Greqi Slider' },
        { to: '/dashboard/ManageCardsStamboll', label: 'Stamboll Cards' },
        { to: '/dashboard/HurghadaCards', label: 'Hurghada Cards' },
        { to: '/dashboard/KapodakiaCards', label: 'Kapodakia Cards' },
        { to: '/dashboard/SliderBullgari', label: 'Bullgari Slider' },
        { to: '/dashboard/MaqedoniPricesTable', label: 'Maqedoni Prices' },
      ]
    },
    {
      id: 'users',
      label: 'Users & Logs',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
      items: [
        { to: '/dashboard/AddUser', label: 'Add User' },
        { to: '/dashboard/ManageUser', label: 'Manage Users' },
        { to: '/dashboard/Logs', label: 'View Logs' },
      ]
    },
    {
      id: 'aranzhmanet',
      label: 'Packages',
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      items: [
        { to: '/dashboard/AddAranzhmanet', label: 'Add Package' },
        { to: '/dashboard/ManageAranzhmanet', label: 'Manage Packages' },
      ]
    },
    {
      id: 'airports',
      label: 'Airports',
      icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
      items: [
        { to: '/dashboard/AddAirport', label: 'Add Airport' },
        { to: '/dashboard/ManageAirports', label: 'Manage Airports' },
      ]
    },
    {
      id: 'shtetet',
      label: 'Countries',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      items: [
        { to: '/dashboard/AddShtetin', label: 'Add Country' },
        { to: '/dashboard/ManageShtetet', label: 'Manage Countries' },
      ]
    },
    {
      id: 'qytetet',
      label: 'Cities',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      items: [
        { to: '/dashboard/AddQytetet', label: 'Add City' },
        { to: '/dashboard/ManageQytetet', label: 'Manage Cities' },
      ]
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5001/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      ref={menuRef}
      className={`${isCollapsed ? 'w-20' : 'w-72'} transition-all duration-300 h-screen flex flex-col fixed left-0 top-0 z-50`}
      style={{ background: 'linear-gradient(180deg, #1e3a5f 0%, #2d5a87 100%)' }}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                <span className="text-white text-xl">✈️</span>
              </div>
              <span className="text-white font-bold text-xl">TravelApp</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {menuItems.map((menu) => (
          <div key={menu.id} className="mb-2">
            <button
              onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200`}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menu.icon} />
                </svg>
                {!isCollapsed && <span className="font-medium">{menu.label}</span>}
              </div>
              {!isCollapsed && (
                <svg className={`w-4 h-4 transition-transform duration-200 ${openMenu === menu.id ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {openMenu === menu.id && !isCollapsed && (
              <div className="mt-1 ml-4 pl-4 border-l-2 border-cyan-400/30">
                {menu.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block py-2.5 px-4 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          to="/"
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {!isCollapsed && <span className="font-medium">Go to Website</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl transition-all`}
          style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && <span className="font-medium text-white">Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Menu;
