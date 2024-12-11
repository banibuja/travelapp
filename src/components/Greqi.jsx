import React from 'react';
import Footer from './Footer';

function Greqi() {
  return (
    <div>
      <div className="p-10">
        <div className="flex justify-center items-center space-x-4 mx-auto truncate whitespace-break-spaces text-navy text-xl font-bold tracking-tight lg:text-2xl">
          <span>Greqi Home | Paket Arazhman</span>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-8">
          <div className="card1 w-1/4 text-center relative">
            <img
              className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Acropolis_of_Athens_%28pixinn.net%29.jpg/1200px-Acropolis_of_Athens_%28pixinn.net%29.jpg"
              alt="Athens"
            />
            <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">Athens</p>
          </div>

          <div className="card1 w-1/4 text-center relative">
            <img
              className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Port_of_Piraeus.jpg/1200px-Port_of_Piraeus.jpg"
              alt="Piraeus"
            />
            <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">Piraeus</p>
          </div>

          <div className="card1 w-1/4 text-center relative">
            <img
              className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lamia_castle.JPG/1200px-Lamia_castle.JPG"
              alt="Lamia"
            />
            <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">Lamia</p>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-8">
          <div className="card1 w-1/4 text-center relative">
            <img
              className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Fira_Santorini.jpg/1200px-Fira_Santorini.jpg"
              alt="Fira"
            />
            <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">Fira</p>
          </div>

          <div className="card1 w-1/4 text-center relative">
            <img
              className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Santorini_island.jpg/1200px-Santorini_island.jpg"
              alt="Santorini"
            />
            <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">Santorini</p>
          </div>

          <div className="card1 w-1/4 text-center relative">
            <img
              className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Chania_venetian_port.jpg/1200px-Chania_venetian_port.jpg"
              alt="Chania"
            />
            <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">Chania</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Greqi;