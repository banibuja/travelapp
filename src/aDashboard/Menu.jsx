import React, {useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Menu() {
  const navigate = useNavigate();
  const [isTablesOpen, setIsTablesOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isAirportsOpen, setIsAirportsOpen] = useState(false);
  const [isShtetetOpen, setIsShtetetOpen] = useState(false);
  const [isQytetetOpen, setIsQytetetOpen] = useState(false);
  const [isAranzhmanetOpen, setIsAranzhmanetOpen] = useState(false);
  const elementsRef = useRef([]); // Array to store refs




  useEffect(() => {
    // Function to check for outside clicks
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside of all elements in the refs array
      if (!elementsRef.current.some((ref) => ref && ref.contains(event.target))) {
        setIsTablesOpen(false); 
        setIsUsersOpen(false); 
        setIsAirportsOpen(false); 
        setIsShtetetOpen(false); 
        setIsQytetetOpen(false); 
        setIsAranzhmanetOpen(false); 
      }
    };

    // Add event listener for click events on the document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });

      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  return (
    <div className="w-64 bg-white shadow-lg p-4 h-screen flex flex-col">
  <h2 className="text-xl font-semibold text-gray-800 mb-6">Menu</h2>
  <div className="flex flex-col flex-grow">
    <div className="relative inline-block text-left pb-4">
      <button
        onClick={() => setIsTablesOpen(!isTablesOpen)}
        className="block text-blue-500 hover:text-blue-700 font-medium"
      >
        Tables
      </button>
      {isTablesOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10" ref={(el) => elementsRef.current.push(el)}>
          {/* <li>
            <Link
              to="/dashboard/managehometable"
              className="block px-4 py-2 text-blue-500 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Manage Home Table
            </Link>
          </li> */}
          <li>
            <Link
              to="/dashboard/turqitable"
              className="block px-4 py-2 text-blue-500 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Turqi Table
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/dubaitable"
              className="block px-4 py-2 text-blue-500 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Dubai Table
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/SliderManage"
              className="block px-4 py-2 text-blue-500 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              HomeSlider
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/GreqiSlider"
              className="block px-4 py-2 text-blue-500 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              GreqiSlider
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/ManageCardsStamboll"
              className="block px-4 py-2 text-blue-500 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              ManageCardsStamboll
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/HurghadaCards"
              className="block px-4 py-2 text-blue-500 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Manage Hurghada Cards
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/KapodakiaCards"
              className="block px-4 py-2 text-blue-500 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Manage Kapodakia Cards
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/SliderBullgari"
              className="block px-4 py-2 text-blue-500 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Manage Bullgari Slider
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/MaqedoniPricesTable"
              className="block px-4 py-2 text-blue-500 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Manage Maqedoni prices
            </Link>
          </li>
        </ul>
      )}
    </div>
    <div className="relative inline-block text-left pb-4"  ref={(el) => elementsRef.current.push(el)}>
      <button
        onClick={() => setIsUsersOpen(!isUsersOpen)}
        className="block text-blue-500 hover:text-blue-700 font-medium"
      >
        Users and Log
      </button>
      {isUsersOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
          <li>
            <Link
              to="/dashboard/AddUser"
              className="block px-4 py-2 text-blue-700 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Add User
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/ManageUser"
              className="block px-4 py-2 text-blue-700 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Manage User
            </Link>
          </li>
          <Link
              to="/dashboard/Logs"
              className="block px-4 py-2 text-blue-700 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Show Log
            </Link>
        </ul>
      )}
    </div>



   
    <div className="relative inline-block text-left  pb-4" >
      <button
        onClick={() => setIsAranzhmanetOpen(!isAranzhmanetOpen)}
        className="block text-blue-500 hover:text-blue-700 font-medium"
      >
        Aranzhmanet
      </button>
      {isAranzhmanetOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10" ref={(el) => elementsRef.current.push(el)}>
          <li>
            <Link
              to="/dashboard/AddAranzhmanet"
              className="block px-4 py-2 text-blue-700 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Add Aranzhmanet
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/ManageAranzhmanet"
              className="block px-4 py-2 text-blue-700 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Manage Aranzhmanet
            </Link>
          </li>
        </ul>
      )}
    </div>
    <div className="relative inline-block text-left  pb-4" >
      <button
        onClick={() => setIsAirportsOpen(!isAirportsOpen)}
        className="block text-blue-500 hover:text-blue-700 font-medium"
      >
        Airports
      </button>
      {isAirportsOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10" ref={(el) => elementsRef.current.push(el)}>
          <li>
            <Link
              to="/dashboard/AddAirport"
              className="block px-4 py-2 text-blue-700 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Add Airports
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/ManageAirports"
              className="block px-4 py-2 text-blue-700 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Manage Airports
            </Link>
          </li>
        </ul>
      )}
    </div>
    <div className="relative inline-block text-left  pb-4" >
      <button
        onClick={() => setIsShtetetOpen(!isShtetetOpen)}
        className="block text-blue-500 hover:text-blue-700 font-medium"
      >
        Shtetet
      </button>
      {isShtetetOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10" ref={(el) => elementsRef.current.push(el)}>
          <li>
            <Link
              to="/dashboard/AddShtetin"
              className="block px-4 py-2 text-blue-700 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Add Shtet
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/ManageShtetet"
              className="block px-4 py-2 text-blue-700 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Manage Shtetet
            </Link>
          </li>
        </ul>
      )}
    </div>
    <div className="relative inline-block text-left  pb-4" >
      <button
        onClick={() => setIsQytetetOpen(!isQytetetOpen)}
        className="block text-blue-500 hover:text-blue-700 font-medium"
      >
        Qytetet
      </button>
      {isQytetetOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10" ref={(el) => elementsRef.current.push(el)}>
          <li>
            <Link
              to="/dashboard/AddQytetet"
              className="block px-4 py-2 text-blue-700 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Add Qytetet
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/ManageQytetet"
              className="block px-4 py-2 text-blue-700 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Manage Qytetet
            </Link>
          </li>
        </ul>
      )}
    </div>
    <div className="mt-auto" id="bottom">
      <button
        onClick={handleLogout}
        className="block py-6 text-red-500 hover:text-red-700 font-medium w-full text-left"
      >
        Logout
      </button>
      <Link
        to="/"
        className="block text-blue-700 font-bold hover:text-blue-700 font-medium w-full text-left"
      >
        Go To Home
      </Link>
    </div>
  </div>
</div>

  );
}

export default Menu;
