import React, {useEffect, useState} from 'react'
import axios from 'axios';
import SvgIcons from '../icons/svgs'
import SearchItem from './SearchItem'
import { useLocation } from 'react-router-dom';


const Search = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState("Price");
    const [aranzhmanet, setAranzhmanet] = useState([]);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const [displayedAranzhmanet, setDisplayedAranzhmanet] = useState([]);


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
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('s') || '';
    filterBySearch(searchTerm)


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

  const handleInput = (e) => {
    const value = e.target.value;
    filterBySearch(value);
  }

  const filterBySearch = (searchTerm) => {
    if (searchTerm.length < 1) {
        console.log(aranzhmanet);
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

  return (
    <div className="max-w-7xl m-auto ">
        <div className="w-full  flex flex-col items-center my-9">
            <h1 className="text-3xl py-5 font-mono">EUROPE CITY BREAK</h1>
        </div>
        <div className="flex gap-10">
            <div className="w-64 border border-black h-96">
                <input type="text" className='border border-2 border-black m-5' onInput={handleInput}/>
            </div>
            <div className="w-full border border border-black">
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
                            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
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
  )
}

export default Search
