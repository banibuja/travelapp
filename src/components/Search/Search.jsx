import React, {useEffect, useState, useRef } from 'react'
import axios from 'axios';
import SvgIcons from '../icons/svgs'
import SearchItem from './SearchItem'
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';


const Search = () => {
    const location = useLocation();
    
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState("Price");
    const [aranzhmanet, setAranzhmanet] = useState([]);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const [displayedAranzhmanet, setDisplayedAranzhmanet] = useState([]);
    const ref = useRef(null);
    const [isAirportDropdownOpen, setIsAirportDropdownOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [shtetet, setShtetet] = useState([]);
    const [airports, setAirports] = useState([]);
    const today = new Date().toISOString().split('T')[0];

    const formRef = useRef(null);
    const queryParams = new URLSearchParams(location.search);
    const fromId = queryParams.get('fromId');
    const fromEmri = queryParams.get('fromEmri');
    const toId = queryParams.get('toId');
    const toEmri = queryParams.get('toEmri');
    const toQytetiId = queryParams.get('toQytetiId');
    const toQytetiEmri = queryParams.get('toQytetiEmri');
    const DepartureDate = queryParams.get('DepartureDate');
    const nrPersonave = queryParams.get('nrPersonave');
    const nrNeteve = queryParams.get('nrNeteve');
    const nrNeteveArray = nrNeteve ? nrNeteve.split(',') : [];
      
  const [searchPrompts, setSearchPrompts] = useState({
      from: 
        {
          id: fromId,
          emri: fromEmri
        }
      ,
      to: 
        {
          id: toId,
          emri: toEmri,
          qyteti: 
            {
              id: toQytetiId,
              emri: toQytetiEmri
            }
          
        }
      ,
      DepartureDate:DepartureDate,
      nrPersonave: nrPersonave,
      nrNeteve: nrNeteveArray
    })
    useEffect( () => {
      
      const checkSession = async () => {
      
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
            // Filter and map to extract only id and emri
            const cities = qytetetData
              .filter((city) => city.shtetiId === state.id)
              .map(({ id, emri }) => ({ id, emri })); // Extract id and emri only
            
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
    checkSession();

      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false); 
        }
      };
  
      // Add event listener for click events on the document
      document.addEventListener('mousedown', handleClickOutside);
  
      // Cleanup the event listener on component unmount
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    useEffect(() => {
      handleSearch()
    }, [aranzhmanet])
  
    
  const handleSearch = () => {
    
    var filteredAranzhmanet = aranzhmanet;


    if(searchPrompts.from.id) {filteredAranzhmanet = filteredAranzhmanet.filter( (aranzhmani) => {
      return (
        aranzhmani.airportId == searchPrompts.from.id
      )
    })}


    if(searchPrompts.to.id) {filteredAranzhmanet = filteredAranzhmanet.filter( (aranzhmani) => {
      return (
        aranzhmani.shtetiId == searchPrompts.to.id
      )
    })}
    


    if(searchPrompts.DepartureDate) {filteredAranzhmanet = filteredAranzhmanet.filter( (aranzhmani) => {
      return (
        aranzhmani.dataNisjes == searchPrompts.DepartureDate 
      )
    })}

    
    if(searchPrompts.nrNeteve.length > 0) {
      filteredAranzhmanet = filteredAranzhmanet.filter( (aranzhmani) => {
        const dataKthimit = new Date(aranzhmani.dataKthimit).getTime();
        const dataNisjes = new Date(aranzhmani.dataNisjes).getTime();
        const startDate = dataNisjes + searchPrompts.nrNeteve[0] * 24 * 60 * 60 * 1000; // Convert days to milliseconds
        const endDate = dataNisjes + searchPrompts.nrNeteve[1] * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    
        return (
          dataKthimit >= startDate && 
          dataKthimit <= endDate)
    })
    
  }
  

    setDisplayedAranzhmanet(filteredAranzhmanet)
  }


    const filteredCountries = shtetet.filter((country) => {
      const matchesCountry = country.emri.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = country.qytetet.some((city) =>
        city.emri.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesCountry || matchesCity;
    });
  

  
    const handleAirportClick = (airport) => {      
      if (!airport) {
        setSearchPrompts({...searchPrompts, from: {id:null, emri: ''}});
        
      }else{

        setSearchPrompts({...searchPrompts, from: {id:airport.id, emri: airport.emri}});
      }
      setIsAirportDropdownOpen(false);
    };
  
    const handleCountryClick = (country) => {  
      if (!country) {
        setSearchPrompts({...searchPrompts, to: { id:null, emri: '', qyteti: {id:null, emri:''}}});
        
      }else{   
      setSearchPrompts({...searchPrompts, to: {...searchPrompts.to, id:country.id, emri: country.emri, qyteti: {id:null, emri:''}}});
    }
      setSearchTerm('');
      setIsDropdownOpen(false);
    };
  
    const handleCityClick = (city) => {
      setSearchPrompts({...searchPrompts, to: {...searchPrompts.to, qyteti: {id:city.id, emri: city.emri}}});
      setSearchTerm('');
      setIsDropdownOpen(false);
    };
    const handleDepartureDate = (e) => {
      setSearchPrompts({...searchPrompts, DepartureDate: e.target.value});
    };
    const handleNrNeteve = (e) => {
      const selectedValue = e.target.value;
      const parsedValue = JSON.parse(selectedValue);
      setSearchPrompts({...searchPrompts, nrNeteve: [parsedValue.start, parsedValue.end]});
      
    };
    
    const selectOrder = (order) => {
        switch (order) {
            case 'Price':
                sortByPrice(true)
                break;
            case 'Date':
                sortByDate(true)
                break;
            case 'Name':
                sortByName(true)
                break;
            default:
                break;
        }
      setSelectedOrder(order);
      setIsOpen(false);
    };
    
  useEffect(() => {
      

    // Fetch room prices from the server
    axios.get('http://localhost:5000/api/aranzhmanet')
      .then(response => {
        setAranzhmanet(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the room prices:", error);
      });
  }, []);


    useEffect(() => {
      // const queryParams = new URLSearchParams(location.search);
      // const searchTerm = queryParams.get('s') || '';
      // filterBySearch(searchTerm)


  }, [aranzhmanet]);


  const sortByPrice = (ascending = true) => {
    const sortedAranzhmanet = [...displayedAranzhmanet].sort((a, b) => {
      return ascending ? a.cmimi - b.cmimi : b.cmimi - a.cmimi;
    });
    setDisplayedAranzhmanet(sortedAranzhmanet);
  };

  const sortByDate = (ascending = true) => {
    const sortedAranzhmanet = [...displayedAranzhmanet].sort((a, b) => {
      const dateA = new Date(a.dataNisjes);
      const dateB = new Date(b.dataNisjes);
  
      return ascending ? dateA - dateB : dateB - dateA;
    });
    setDisplayedAranzhmanet(sortedAranzhmanet);
  };

  const sortByName = (ascending = true) => {
    const sortedAranzhmanet = [...displayedAranzhmanet].sort((a, b) => {
      return ascending
        ? a.titulli.localeCompare(b.titulli)
        : b.titulli.localeCompare(a.titulli);
    });
    setDisplayedAranzhmanet(sortedAranzhmanet);
  };


  const filterBySearch = (searchTerm) => {
    if (searchTerm.length < 1) {
        setDisplayedAranzhmanet(aranzhmanet);
    } else{
        
    // Convert search term to lowercase for case-insensitive comparison
    const lowercasedTerm = searchTerm.toLowerCase();
  
    const filteredAranzhmanet = aranzhmanet.filter((aranzhmani) => {
      return (
        aranzhmani.titulli.toLowerCase().includes(lowercasedTerm) || 
        aranzhmani.shteti.toLowerCase().includes(lowercasedTerm) || 
        aranzhmani.airport.toLowerCase().includes(lowercasedTerm)
      );
    });
  
    // Set the filtered results to the state
    setDisplayedAranzhmanet(filteredAranzhmanet);
}
  };
  const handleClearFilters = (e) => {
    setSearchPrompts({
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
      DepartureDate:new Date().toLocaleDateString('en-CA'),
      nrPersonave: 2,
      nrNeteve: [0,5]
    });
    setDisplayedAranzhmanet(aranzhmanet)
  }
  return (
    <div className="max-w-[85rem] m-auto ">
      <div className="w-full  flex flex-col items-center my-9">
          <h1 className="text-3xl py-5 font-mono">Find Your Flight</h1>
      </div>

      <div className="flex gap-10">
        <div className="bg-white shadow-md rounded-lg p-6 w-4xl mx-auto">

          <h2 className="text-xl font-semibold text-gray-800 mb-4">Find Your Flight</h2>

          <form className="gap-y-4 flex flex-col" ref={formRef}>
            <div className="py-4">
              <div className="relative">
              <button
              type='button'
                onClick={() => setIsAirportDropdownOpen(!isAirportDropdownOpen)}
                className="flex items-center w-full p-3 bg-gray-100 border rounded-md hover:bg-gray-200"
              >
                <span className="mr-2">✈️</span>
                {searchPrompts.from.emri || 'Nga'}
              </button>

              {isAirportDropdownOpen && (
                <div className=" border rounded-md shadow-lg bg-white absolute z-10">
                  <ul className="max-h-60 overflow-y-auto">
                      <li key='' className="p-2 border-b">
                        <div
                          onClick={() => handleAirportClick('')}
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded"
                        >
                          All Airports
                        </div>

                      </li>
                    {airports.map((airport) => (
                      <li key={airport.emri} className="p-2 border-b">
                        <div
                          onClick={() => handleAirportClick(airport)}
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded"
                        >
                          {airport.emri}
                        </div>

                      </li>
                    ))}
                  </ul>
                </div>
              )}
                
              </div>
              <div className="relative">
                <button
                type='button'
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center w-full p-3 bg-gray-100 border rounded-md hover:bg-gray-200"
                >
                  <span className="mr-2">✈️</span>
                  {searchPrompts.to.qyteti.emri|| searchPrompts.to.emri || 'Destinimi'}
                </button>

              {isDropdownOpen && (
                <div className="mt-2 border rounded-md shadow-lg bg-white">

                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Kërko vend ose qytet"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <ul className="max-h-60 overflow-y-auto">
                      <li key='' className="p-2 border-b">
                        <div
                          onClick={() => handleCountryClick('')}
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded"
                        >
                          All Countries/Cities
                        </div>
                        </li>
                    {filteredCountries.map((country) => (
                      <li key={country.emri} className="p-2 border-b">
                        <div
                          onClick={() => handleCountryClick(country)}
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded"
                        >
                          {country.emri}
                        </div>

                        <ul className="ml-4 mt-1">
                          {country.qytetet
                            .filter((city) =>
                              city.emri.toLowerCase().includes(searchTerm.toLowerCase())
                            )
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
                    {filteredCountries.length === 0 && (
                      <li className="p-2 text-gray-500">No results found</li>
                    )}
                  </ul>
                </div>
              )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
              
              <input
                type="date"
                min={today} 
                onChange={handleDepartureDate}
                defaultValue={searchPrompts.DepartureDate || today}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numri i Neteve</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={handleNrNeteve}
              >
              <option value='{"start": 0, "end": 5}'>1-5 Netë</option>
              <option value='{"start": 6, "end": 9}'>6-9 Netë</option>
              <option value='{"start": 10, "end": 12}'>10-12 Netë</option>
              <option value='{"start": 12, "end": 99}'>12+ Netë</option>
              </select>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
              <button
                type="button"
                onClick={handleSearch}
                className="bg-blue-500 text-white font-semibold rounded-md py-2 px-4 hover:bg-blue-600 transition"
              >
                Search Flights
              </button>
              <button
                type="button"
                onClick={handleClearFilters}
                className="bg-red-500 text-white font-semibold rounded-md py-2 my-3 px-4 hover:bg-red-600 transition"
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>

            <div className="w-full border border-black">
                <div className="p-3 flex">
                    <div>
                        {displayedAranzhmanet.length} te kerkuara
                    </div>
                    <div className="relative inline-block text-left ml-auto">
                        <button onClick={toggleDropdown} className="flex items-center gap-2 border-2 border-black  text-black px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none">
                            {
                                {
                                    'Price': <SvgIcons.OrderByPriceSvg />,
                                    'Name': <SvgIcons.OrderByDateSvg />,
                                    'Date': <SvgIcons.OrderByNameSvg />
                                }[selectedOrder]
                            }
                            <span>{selectedOrder}</span>
                            <span className="ml-auto text-sm">▼</span>
                        </button>
                        {isOpen && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"  ref={ref} >
                            <li
                                onClick={() => selectOrder("Price")}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                            <SvgIcons.OrderByPriceSvg />
                            Price
                            </li>
                            <li
                                onClick={() => selectOrder("Date")}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                            <SvgIcons.OrderByDateSvg />
                                Date
                            </li>
                            <li
                                onClick={() => selectOrder("Name")}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                            <SvgIcons.OrderByNameSvg />
                                Name
                            </li>
                            </ul>
                        )}
                    </div>
                </div>
                <div className="">
                  
                <div className="flex gap-5 flex-wrap  justify-center">
                 {displayedAranzhmanet && (
                    displayedAranzhmanet.map((aranzhmani, index) => {
                        return <SearchItem key={index} data={aranzhmani}/>

                    })
                 )}   
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search
