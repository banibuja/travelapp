import React, { useState, useEffect } from 'react';
import photobackground from './images/aaa.webp'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Header from './Header';



function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardData = [
    { id: 1, title: "Example Title 1", price: "180€ për person", duration: "3 Ditë / 2 Netë" },
    { id: 2, title: "Example Title 2", price: "180€ për person", duration: "3 Ditë / 2 Netë" },
    { id: 3, title: "Example Title 3", price: "180€ për person", duration: "3 Ditë / 2 Netë" },
    { id: 4, title: "Example Title 4", price: "180€ për person", duration: "3 Ditë / 2 Netë" },
    { id: 5, title: "Example Title 5", price: "180€ për person", duration: "3 Ditë / 2 Netë" },
    { id: 6, title: "Example Title 6", price: "180€ për person", duration: "3 Ditë / 2 Netë" },
    { id: 7, title: "Example Title 7", price: "180€ për person", duration: "3 Ditë / 2 Netë" },
    { id: 8, title: "Example Title 8", price: "180€ për person", duration: "3 Ditë / 2 Netë" },
    { id: 9, title: "Example Title 9", price: "180€ për person", duration: "3 Ditë / 2 Netë" },
    { id: 10, title: "Example Title 10", price: "180€ për person", duration: "3 Ditë / 2 Netë" },
  ];

  const totalCards = cardData.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      setUser(null);
      window.location.href = '/login'; // Use window.location.href for navigation after logout
    } catch (error) {
      console.error('Logout error:', error.response || error.message);
    }
  };
  


  return (
    
    
    <div className="bg-gradient-to-r from-red-500 to-indigo-600 h-screen text-white" style={{ backgroundImage: "url('/path/to/background-image.jpg')" }}>
    
      {/* Header */}
     <Header />

      {/* Search Form */}
      <div className="flex justify-center mt-10 ">
  <div className="bg-gradient-to-r from-red-500 to-indigo-600 border text-black rounded-lg shadow-lg p-10 w-11/12 md:w-3/5 transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center space-x-8 mb-6">
      <label className="flex items-center space-x-2 text-lg text-gray-800">
        <input type="radio" name="tripType" className="form-radio text-red-600 focus:ring-red-500" />
        <span>Nje drejtim</span>
      </label>
      <label className="flex items-center space-x-2 text-lg text-gray-800">
        <input type="radio" name="tripType" className="form-radio text-red-600 focus:ring-red-500" />
        <span>Vajtje-ardhje</span>
      </label>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="col-span-1">
        <label className="block text-gray-700 font-semibold mb-1">Nga</label>
        <input type="text" className="border border-gray-300 rounded p-3 w-full focus:ring focus:ring-red-200" placeholder="Qyteti i nisjes" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-semibold mb-1">Deri</label>
        <input type="text" className="border border-gray-300 rounded p-3 w-full focus:ring focus:ring-red-200" placeholder="Qyteti i mbërritjes" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-semibold mb-1">Data e nisjes</label>
        <input type="date" className="border border-gray-300 rounded p-3 w-full focus:ring focus:ring-red-200" />
      </div>
      <div className="col-span-1 flex items-end">
  <button className="btn-custom bg-gradient-to-r from-red-500 to-indigo-500 text-white font-bold py-3 px-4 rounded-lg w-full hover:from-yellow-500 hover:to-red-500 focus:outline-none focus:ring-4 focus:ring-red-300">
    Kërko
  </button>
</div>

    </div>
  </div>
</div>


<div className="hero mt-20 flex flex-col items-center">
      <div className="ofertat text-red-600 text-2xl mb-4 flex justify-center">
        Ofertat e fundit
      </div>
      <div className="text-white text-4xl mb-8 flex justify-center">
        Ofertat e fundit për pushime
      </div>
      <div className="flex justify-center w-full mb-5 space-x-4">
        <button
          onClick={prevSlide}
          className="bg-gradient-to-r from-red-500 to-indigo-500 text-white text-3xl rounded-full p-3 shadow-lg hover:scale-105 transition-transform duration-200 ease-out focus:outline-none"
        >
          &larr;
        </button>
        <button
          onClick={nextSlide}
          className="bg-gradient-to-r from-red-500 to-indigo-500 text-white text-3xl rounded-full p-3 shadow-lg hover:scale-105 transition-transform duration-200 ease-out focus:outline-none"
        >
          &rarr;
        </button>
      </div>

      <div className="relative w-full overflow-hidden bg-black py-5 rounded-[20px]">
        <div
          className="cards-travel flex  mx-auto gap-[5rem] transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 25.33}%)`, 
          }}
        >
          {cardData.map((card, index) => (
            <div
              key={card.id}
              className="card bg-black text-white p-4 rounded-lg shadow-lg w-[20rem] h-auto"
              style={{ minWidth: "25.33%" }}
            >
              <img
                src="https://www.shpejtimi.net/_next/image?url=%2Fimg%2Fpost%2Ffitst1.jpg&w=640&q=75"
                alt="Example Image"
                className="w-full h-auto rounded-t-lg"
              />
              <div className="text-2xl mt-2">{card.title}</div>
              <div className="text-lg">{card.price}</div>
              <div className="text-lg">{card.duration}</div>
            </div>
          ))}
        </div>

      <div className="card2 mt-[2rem]">

      <div className="flex flex-wrap justify-center space-x-4">
  <div className="card2 bg-black p-6 rounded-lg shadow-lg flex items-center w-80 mb-8">
    <img
      src="https://www.shpejtimi.net/img/home1.jpg"
      alt="World Destinations"
      className="w-[6rem] h-24 rounded-full mr-4"
    />
    <div>
      <h2 className="text-xl font-bold text-white">Të gjitha destinacionet botërore</h2>
      <p className="mt-2 text-gray-600">Ne do t'ju ndihmojmë të bëni udhëtim sa më të sigurtë dhe rehatshëm.</p>
    </div>
  </div>

  <div className="card2 bg-black p-6 rounded-lg shadow-lg flex items-center w-80 mb-8">
    <img
      src="https://www.shpejtimi.net/img/home2.jpg"
      alt="Unforgettable Vacations"
      className="w-24 h-24 rounded-full mr-4"
    />
    <div>
      <h2 className="text-xl font-bold text-white">Pushime të paharrueshme</h2>
      <p className="mt-2 text-gray-600">Realizoni ëndrrat tuaja, për një udhëtim të paharrueshëm me ne.</p>
    </div>
  </div>

  <div className="card2 bg-black p-6 rounded-lg shadow-lg flex items-center w-80 mb-8">
    <img
      src="https://www.shpejtimi.net/img/home3.jpg"
      alt="Health Insurance"
      className="w-24 h-25 rounded-full mr-4"
    />
    <div>
      <h2 className="text-xl font-bold text-white">Sigurime shëndetësore</h2>
      <p className="mt-2 text-gray-600">Për një jetë sa më të sigurtë edhe gjatë udhëtimit.</p>
    </div>
  </div>
</div>
</div>



      </div>
    </div>




    <div className="top-destinacionet mt-[2rem] p-6 bg-white text-black rounded-lg shadow-xl mb-10">
  <h2 className="text-3xl font-bold mb-3 text-center text-red-600">Top Destinacionet</h2>
  <h2 className="text-[50px] font-bold mb-6 text-center text-[#3e4559]">Kompania Turistike - banozi</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div className="bg-white p-4 rounded-lg shadow-lg text-center text-black">
      <img src="https://cdn.britannica.com/35/195935-050-456D7CBC/Skanderbeg-Square-Tirana-Albania.jpg" alt="Shqipni" className="w-full h-40 rounded-t-lg object-cover mb-4"/>
      <h3 className="text-xl font-semibold">Shqipni</h3>
      <p className="mt-2">Detaje për Shqipni</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-lg text-center text-black">
      <img src="https://himatravel.com/wp-content/uploads/2020/11/Pushime-ne-Greqi.jpg" alt="Greqi" className="w-full h-40 rounded-t-lg object-cover mb-4"/>
      <h3 className="text-xl font-semibold">Greqi</h3>
      <p className="mt-2">Detaje për Greqi</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-lg text-center text-black">
      <img src="https://himatravel.com/wp-content/uploads/2021/02/Mardin-turqi-768x951.jpg" alt="Turqi" className="w-full h-40 rounded-t-lg object-cover mb-4"/>
      <h3 className="text-xl font-semibold">Turqi</h3>
      <p className="mt-2">Detaje për Turqi</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-lg text-center text-black">
      <img src="https://www.shutterstock.com/image-photo/aerial-view-dubrovnik-city-southern-600nw-2499811955.jpg" alt="Domenika" className="w-full h-40 rounded-t-lg object-cover mb-4"/>
      <h3 className="text-xl font-semibold">Dubrovnik</h3>
      <p className="mt-2">Detaje për Dubrovnik</p>
    </div>
  </div>
</div>






    </div>
  );
}

export default Home;
