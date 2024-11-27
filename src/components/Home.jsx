
import React, { useState } from "react";
import Nav from './nav';

function Home() {

  const [selected, setSelected] = useState("Aranzhman");

  return (
    <div>
      {/* Komponenti Nav */}
      <Nav />

      {/* Përmbajtja poshtë navigimit */}
      <div className="relative w-full min-h-[20rem]">
        {/* Fotoja si background plotësisht responsive */}
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.ctfassets.net/pzootm7d2s0g/1yMXBdbEwCAfuujxANPt4f/68edd67a4c458ca8339f7d8c29775d78/BANNER11.jpg"
          alt="Banner"
        />

        {/* Kutitë mbi foton */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-2 space-y-3">
          {/* Opsionet */}

          <div className="flex bg-[#ffffff4c] shadow-lg rounded-lg overflow-hidden">
            {/* Opsionet majtas */}
            <div className="flex space-x-5">
              {/* Butoni Aranzhman */}
              <button
                className={`flex items-center px-4 py-2 rounded-lg ${
                  selected === "Aranzhman" ? "bg-white text-blue-600" : "bg-transparent"
                }`}
                onClick={() => setSelected("Aranzhman")}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2v20"></path>
                </svg>
                <span className="text-black font-medium">Aranzhman</span>
              </button>

              {/* Butoni Hotel */}
              <button
                className={`flex items-center px-4 py-2 rounded-lg ${
                  selected === "Hotel" ? "bg-white text-blue-600" : "bg-transparent"
                }`}
                onClick={() => setSelected("Hotel")}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-8 0h8m-8 0v10m8-10v10m-8 0h8m-8 0H5a2 2 0 01-2-2V9a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2h-3"></path>
                </svg>
                <span className="text-black font-medium">Hotel</span>
              </button>

              {/* Butoni Fluturimi */}
              <button
                className={`flex items-center px-4 py-2 rounded-lg ${
                  selected === "Fluturimi" ? "bg-white text-blue-600" : "bg-transparent"
                }`}
                onClick={() => setSelected("Fluturimi")}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.5 6.5L3 21l1.5-7.5L21 3l-7.5 7.5L10.5 6.5z"></path>
                </svg>
                <span className="text-black font-medium">Fluturimi</span>
              </button>
            </div>
          </div>
         
          {/* Inputet dhe butoni */}
          <div className="flex bg-[#ffffff4c]  shadow-lg rounded-lg overflow-hidden p-4 space-x-4 w-full max-w-5xl">
            <input
              className=" border rounded-lg p-2 w-[10rem]"
              placeholder="Nisja Nga"
            />
            <input
              className=" border rounded-lg p-2 w-[10rem]"
              placeholder="Destinimi ose Hoteli"
            />
            <input
              className=" border rounded-lg p-2 w-[10rem]"
              placeholder="Opsionet e Netëve"
            />
            <input
              className=" border rounded-lg p-2 w-[10rem]"
              placeholder="Data"
            />
            <input
              className=" border rounded-lg p-2 w-[10rem]"
              placeholder="Udhëtarët"
            />
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
              KËRKO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
