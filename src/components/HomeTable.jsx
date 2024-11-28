import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function HomeTable() {
  const [selected, setSelected] = useState("Aranzhman");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [nights, setNights] = useState("");
  const [startDate, setStartDate] = useState(null);

  const airports = [
    "Pristina International Airport (PRN)",
    "Tirana International Airport (TIA)",
    "Skopje Alexander the Great Airport (SKP)"
  ];

  const hotels = ["Turkish", "Dubai", "Rughai"];

  const nightsOptions = ["1 Night", "2 Nights", "3 Nights", "4 Nights", "5 Nights"];

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
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
            <div className="flex space-x-5">
              {/* Butoni Aranzhman */}
              <button
                className={`flex items-center px-4 py-2 rounded-lg  ${
                  selected === "Aranzhman" ? "bg-white text-[#142347] font-600" : "bg-transparent"
                }`}
                onClick={() => setSelected("Aranzhman")}
              >
                Aranzhman
              </button>

              {/* Butoni Hotel */}
              <button
                className={`flex items-center px-4 py-2 rounded-lg  ${
                  selected === "Hotel" ? "bg-white text-[#142347] font-medium" : "bg-transparent"
                }`}
                onClick={() => setSelected("Hotel")}
              >
                Hotel
              </button>

              {/* Butoni Fluturimi */}
              <button
                className={`flex items-center px-4 py-2 rounded-lg text-[#142347] font-600 ${
                  selected === "Fluturimi" ? "bg-white text-blue-600" : "bg-transparent"
                }`}
                onClick={() => setSelected("Fluturimi")}
              >
                Fluturimi
              </button>
            </div>
          </div>

          {/* Inputet dhe butoni */}
          <div className="flex bg-[#ffffff4c] shadow-lg rounded-lg overflow-hidden p-4 space-x-4 w-full max-w-5xl">
            {selected === "Hotel" && (
              <>
                <select
                  className="border rounded-lg p-2 w-auto"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Destinimi ose Hoteli
                  </option>
                  {hotels.map((hotel) => (
                    <option key={hotel} value={hotel}>
                      {hotel}
                    </option>
                  ))}
                </select>
                <select
                  className="border rounded-lg p-2 w-auto"
                  value={nights}
                  onChange={(e) => setNights(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Opsionet e Netëve
                  </option>
                  {nightsOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <DatePicker
                  className="border rounded-lg p-2 w-auto"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  filterDate={isFutureDate}
                  placeholderText="Data"
                />
                <input
                  className="border rounded-lg p-2 w-auto"
                  placeholder="Udhëtarët"
                />
              </>
            )}
            {selected === "Fluturimi" && (
              <>
                <select
                  className="border rounded-lg p-2 w-[12rem]"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Nisja Nga
                  </option>
                  {airports.map((airport) => (
                    <option key={airport} value={airport}>
                      {airport}
                    </option>
                  ))}
                </select>
                <select
                  className="border rounded-lg p-2 w-auto"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Destinimi ose Hoteli
                  </option>
                  {hotels.map((hotel) => (
                    <option key={hotel} value={hotel}>
                      {hotel}
                    </option>
                  ))}
                </select>
                <DatePicker
                  className="border rounded-lg p-2 w-auto"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  filterDate={isFutureDate}
                  placeholderText="Data"
                />
                <input
                  className="border rounded-lg p-2 w-auto"
                  placeholder="Udhëtarët"
                />
              </>
            )}
            {selected === "Aranzhman" && (
              <>
                <select
                  className="border rounded-lg p-2 w-[11.5rem]"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Nisja Nga
                  </option>
                  {airports.map((airport) => (
                    <option key={airport} value={airport}>
                      {airport}
                    </option>
                  ))}
                </select>
                <select
                  className="border rounded-lg p-2 w-auto"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Destinimi ose Hoteli
                  </option>
                  {hotels.map((hotel) => (
                    <option key={hotel} value={hotel}>
                      {hotel}
                    </option>
                  ))}
                </select>
                <select
                  className="border rounded-lg p-2 w-[11rem]"
                  value={nights}
                  onChange={(e) => setNights(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Opsionet e Netëve
                  </option>
                  {nightsOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <DatePicker
                  className="border rounded-lg p-2 w-[7rem]"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  filterDate={isFutureDate}
                  placeholderText="Data"
                />
                <input
                  className="border rounded-lg p-2 w-[9rem]"
                  placeholder="Udhëtarët"
                />
              </>
            )}
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
              KËRKO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTable;
