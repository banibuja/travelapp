import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function HomeTable() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [nights, setNights] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [travelPlans, setTravelPlans] = useState([]);
  const [airports, setAirports] = useState([]);
  const [shtetet, setShtetet] = useState([]);
    const elementsRef = useRef([]); // Array to store refs
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDepartureDropdownOpen, setIsDepartureDropdownOpen] = useState(false);
  const [isNrNeteveDropdownOpen, setIsNrNeteveDropdownOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const [searchPrompts, setSearchPrompts] = useState({
    from: 
      {
        id: null,
        emri: ''
      }
    ,
    to: 
      {
        id: null,
        emri: '',
        qyteti: 
          {
            id: null,
            emri: ''
          }
        
      }
    ,
    DepartureDate: null,
    nrPersonave: null,
    nrNeteve:null
  });




  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!elementsRef.current.some((ref) => ref && ref.contains(event.target))) {
        setIsDepartureDropdownOpen(false); 
        setIsDropdownOpen(false); 
        setIsNrNeteveDropdownOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchTravelPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/travel-plans");
        setTravelPlans(response.data);
      } catch (error) {
        console.error("Gabim gjatë marrjes së të dhënave:", error);
      }
    };
    fetchTravelPlans();
    const fetchData = async () => {
      
      try {
        const getAirports = await fetch('http://localhost:5000/api/airports', { method: 'GET', credentials: 'include' });
        const airportsData = await getAirports.json();
        if (getAirports.ok) {
          
          setAirports(airportsData)
          
        } 
      } catch (error) {
        console.error('Error checking session:', error);
      }
      try {
        const getShtetet = await fetch('http://localhost:5000/api/shtetet', { method: 'GET', credentials: 'include' });
        const shtetetData = await getShtetet.json();
        if (getShtetet.ok) {
          const getQyetet = await fetch('http://localhost:5000/api/qytetet', { method: 'GET', credentials: 'include' });
          const qytetetData = await getQyetet.json();
          const mergedData = shtetetData.map((state) => {
            const cities = qytetetData
              .filter((city) => city.shtetiId === state.id)
              .map(({ id, emri }) => ({ id, emri })); 
            
            return {
              ...state,
              qytetet: cities,
            };
          });
          setShtetet(mergedData);
        } 
      } catch (error) {
        console.error('Error checking session:', error);
      }
    }
    fetchData();

  }, []);

  const handleCountryClick = (country) => {  
    if (!country) {
      setSearchPrompts({...searchPrompts, to: { id:null, emri: '', qyteti: {id:null, emri:''}}});
      
    }else{   
    setSearchPrompts({...searchPrompts, to: {...searchPrompts.to, id:country.id, emri: country.emri}});
  }
    setIsDropdownOpen(false);
  };
  const handleAirportClick = (airport) => {  
    if (!airport) {
      setSearchPrompts({...searchPrompts, from: { id:null, emri: ''}});
      
    }else{   
      setSearchPrompts({...searchPrompts, from: { id:airport.id, emri: airport.akronimi}});
  }
    setIsDepartureDropdownOpen(false);
  };

  const handleCityClick = (city) => {
    setSearchPrompts({...searchPrompts, to: {...searchPrompts.to, qyteti: {id:city.id, emri: city.emri}}});
    setIsDropdownOpen(false);
  };
 
  useEffect(() => {
    const slider = document.getElementById("slider")
        slider.style.transform = `translateX(${selected * 7}rem)`;
  }, [selected]);

 
  
  const DataENisjes = () => { 
    const handleDepartureDate = (e) => {
      
      setSearchPrompts({...searchPrompts, DepartureDate: e.toLocaleDateString('en-CA')});
    };
    return (
      <div>
        <DatePicker
          className="w-full border border-gray-300 rounded-md p-3 caret-transparent outline-none"
          onChange={handleDepartureDate}
          minDate={today}
          placeholderText="Data e Nisjes"
          selected={searchPrompts.DepartureDate}
          onKeyDown={(e) => e.preventDefault()}
        />
      </div>
    );
  };
  const handleUdhetaret = (e) => {    
    
    setSearchPrompts({...searchPrompts, nrPersonave: e.target.value});
  };
  const Udhetaret = () => { 
    
    return (
      <div>
        <input
          type="number"
          onChange={handleUdhetaret}
          value={searchPrompts.nrPersonave || ''}  
          className="border caret-transparent rounded-lg p-3 w-28 outline-none"
          onKeyDown={(e) => e.preventDefault()}
          placeholder="Udhëtarët"
          min={1}
        />
      </div>
    );
  };
  const handleNrNeteve = (input) => {
    setSearchPrompts((prevState) => ({
      ...prevState,
      nrNeteve: input,
    }));
    setIsNrNeteveDropdownOpen(false);
  };
  
  const NrNeteve = () => {
    // Ensure value is correctly formatted
 
  
    return (
      <div className="relative font-sans border-gray-300 rounded-lg w-40 shadow-md">
        <button type='button' onClick={() => {setIsDepartureDropdownOpen(false);setIsDropdownOpen(false);setIsNrNeteveDropdownOpen(!isNrNeteveDropdownOpen)}} className="outline-none flex items-center w-40 p-3 bg-gray-100 border rounded-md hover:bg-gray-200">
        {searchPrompts.nrNeteve ? `${searchPrompts.nrNeteve[0]}-${searchPrompts.nrNeteve[1]} Netë` : 'Numri i Neteve'}
        </button>

        {isNrNeteveDropdownOpen && (
          <div className="mt-2 border rounded-md shadow-lg absolute bg-white " ref={(el) => elementsRef.current.push(el)}>
            <ul className="max-h-60 overflow-y-auto">
                <li key="-1" className="p-2 text-sm text-[#374151] cursor-pointer transition-all  ">
                  <div
                    onClick={() => handleNrNeteve(null)}
                    className="font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded"
                  >
                    Te gjitha
                  </div>
                </li>
                <li key="0" className="p-2 text-sm text-[#374151] cursor-pointer transition-all  ">
                  <div
                    onClick={() => handleNrNeteve([0, 5])}
                    className="font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded"
                  >
                    1-5 Netë
                  </div>
                </li>
                <li key="1" className="p-2 text-sm text-[#374151] cursor-pointer transition-all  ">
                  <div
                    onClick={() => handleNrNeteve([6, 9])}
                    className="font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded"
                  >
                    6-9 Netë
                  </div>
                </li>
                <li key="2" className="p-2 text-sm text-[#374151] cursor-pointer transition-all  ">
                  <div
                    onClick={() => handleNrNeteve([10, 12])}
                    className="font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded"
                  >
                    10-12 Netë
                  </div>
                </li>
                <li key="3" className="p-2 text-sm text-[#374151] cursor-pointer transition-all  ">
                  <div
                    onClick={() => handleNrNeteve([13,99])}
                    className="font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded"
                  >
                    12+ Netë
                  </div>
                </li>
              </ul>
            </div>
        )}
      </div>

       
    );
  };
  

  const Destinimi = () => {
    return(
      
      <div className="relative">
      <button type='button' onClick={() => {setIsDropdownOpen(!isDropdownOpen);setIsDepartureDropdownOpen(false)}} className="flex outline-none items-center w-40 p-3 bg-gray-100 border rounded-md hover:bg-gray-200">
        <span className="mr-2 transform rotate-90">✈️</span>
        {searchPrompts.to.qyteti.emri|| searchPrompts.to.emri || 'Destinimi'}
      </button>

      {isDropdownOpen && (
        <div className="mt-2 border rounded-md shadow-lg absolute  bg-white" ref={(el) => elementsRef.current.push(el)}>

          <div className="p-2">
            <input
              type="text"
              placeholder="Kërko vend ose qytet"
              className="w-full p-2 border rounded-md focus:outline-none "
            />
          </div>

          <ul className="max-h-60 overflow-y-auto">
              <li key='-1' className="p-2 border-b">
                <div
                  onClick={() => handleCountryClick('')}
                  className="font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded"
                >
                  All Countries/Cities
                </div>
                </li>
            {shtetet.map((country) => (
              <li key={country.emri} className="p-2 border-b">
                <div
                  onClick={() => handleCountryClick(country)}
                  className="font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded"
                >
                  {country.emri}
                </div>

                <ul className="ml-4 mt-1">
                  {country.qytetet
                    .map((city) => (
                      <li
                        key={city.emri}
                        onClick={() => {handleCountryClick(country); handleCityClick(city)}}
                        className="p-1 text-gray-600 hover:bg-blue-100 cursor-pointer rounded"
                      >
                        {city.emri}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
            {shtetet.length === 0 && (
              <li className="p-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
    )
  }


  const NisjaNga = () => {
    return(
      <div className="relative font-sans border-gray-300 rounded-lg w-40 shadow-md">
        <button type='button' onClick={() => {setIsDepartureDropdownOpen(!isDepartureDropdownOpen);setIsDropdownOpen(false)}} className="outline-none flex items-center w-40 p-3 bg-gray-100 border rounded-md hover:bg-gray-200">
          <span className="mr-2">✈️</span>
          {searchPrompts.from.emri || 'Nisja Nga'}
        </button>

        {isDepartureDropdownOpen && (
          <div className="mt-2 border rounded-md shadow-lg absolute bg-white " ref={(el) => elementsRef.current.push(el)}>
            <ul className="max-h-60 overflow-y-auto">
                <li key='-1' className="p-2 border-b">
                  <div
                    onClick={() => handleAirportClick('')}
                    className="font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded"
                  >
                    All Airports
                  </div>
                </li>
                {airports.map((airport) => (
                <li key={airport.emri} className="p-2 text-sm text-[#374151] cursor-pointer transition-all  ">
                  <div
                    onClick={() => handleAirportClick(airport)}
                    className="font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded"
                  >
                    {airport.emri}  ({airport.akronimi})
                  </div>
                </li>
                ))}
              </ul>
            </div>
        )}
      </div>
    )
  } 
  const handleSearch = () => {
    const queryParams = Object.entries({
      fromId: searchPrompts.from?.id,
      fromEmri: searchPrompts.from?.emri,
      toId: searchPrompts.to?.id,
      toEmri: searchPrompts.to?.emri,
      toQytetiId: searchPrompts.to?.qyteti?.id,
      toQytetiEmri: searchPrompts.to?.qyteti?.emri,
      DepartureDate: searchPrompts.DepartureDate,
      nrPersonave: searchPrompts.nrPersonave,
      nrNeteve: searchPrompts.nrNeteve,
    }).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`/search?${queryString}`);
  };
  
  return (
    <div>
      <div className="relative w-full min-h-[20rem]">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.ctfassets.net/pzootm7d2s0g/1yMXBdbEwCAfuujxANPt4f/68edd67a4c458ca8339f7d8c29775d78/BANNER11.jpg"
          alt="Banner"
        />

        {/* Kutitë mbi foton */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-2 space-y-3 text-black font-medium">
          {/* Opsionet */}
          <div className="flex bg-[#ffffff4c] shadow-lg rounded-lg overflow-hidden text-[#142347] font-600">
            <div className="flex  relative">

              <div className="flex absolute top-0 left-0 items-center transition-all duration-200 md:w-28 w-28 h-full px-4 py-2 rounded-lg bg-white text-[#142347] font-600" id="slider"></div>

              {/* Butoni Aranzhman */}
              <button
                className={`flex items-center justify-center px-4 py-2 rounded-lg w-28 `}
                onClick={() => setSelected(0)}
              >
              <span className="z-10">Aranzhman</span>
                
              </button>

              {/* Butoni Hotel */}
              <button
                className={`flex items-center justify-center px-4 py-2 rounded-lg w-28 `}
                onClick={() => setSelected(1)}
              >
              <span className="z-10">Hotel</span>
              </button>

              {/* Butoni Fluturimi */}
              <button
                className={`flex items-center justify-center px-4 py-2 rounded-lg w-28 `}
                onClick={() => setSelected(2)}
              >
                <span className="z-10">Fluturimi</span>
              </button>
            </div>
          </div>

          {/* Inputet dhe butoni */}
          <div className="flex flex-wrap bg-[#ffffff4c] shadow-lg rounded-lg justify-around  p-4 space-x-4 w-full max-w-5xl">
          {selected === 0 && (
              <>

                <NisjaNga />

                <Destinimi />

                <NrNeteve />

                <DataENisjes />
               
                <Udhetaret />

              </>
            )}
            {selected === 1 && (
              <>
                <Destinimi />

                <NrNeteve />

                <DataENisjes />

                <Udhetaret />
              </>
            )}
            {selected === 2 && (
              <>
                <NisjaNga />

                <Destinimi />

                <DataENisjes />

                <Udhetaret />
              </>
            )}
            
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600" onClick={handleSearch}>
              KËRKO 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}



export default HomeTable;
