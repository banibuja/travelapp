import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function HomeTable() {
  const [selected, setSelected] = useState(0);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [nights, setNights] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [travelPlans, setTravelPlans] = useState([]);



  const fetchTravelPlans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/travel-plans");
      setTravelPlans(response.data);
    } catch (error) {
      console.error("Gabim gjatë marrjes së të dhënave:", error);
    }
  };

  useEffect(() => {
    fetchTravelPlans();
  }, []);

  // const airports = [
  //   "Pristina International Airport (PRN)",
  //   "Tirana International Airport (TIA)",
  //   "Skopje Alexander the Great Airport (SKP)"
  // ];

  // const hotels = ["Turkish", "Dubai", "Rughai"];

  // const nightsOptions = ["1 Night", "2 Nights", "3 Nights", "4 Nights", "5 Nights"];

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };
  useEffect(() => {
    const slider = document.getElementById("slider")
        slider.style.transform = `translateX(${selected * 7}rem)`;
  }, [selected])
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
                className={`flex items-center justify-center px-4 py-2 rounded-lg w-28  ${
                  selected === "Aranzhman" //? "bg-white text-[#142347] font-600" : "bg-transparent"
                }`}
                onClick={() => setSelected(0)}
              >
              <span className="z-10">Aranzhman</span>
                
              </button>

              {/* Butoni Hotel */}
              <button
                className={`flex items-center justify-center px-4 py-2 rounded-lg w-28 ${
                  selected === "Hotel" //? "bg-white text-[#142347] font-600" : "bg-transparent"
                }`}
                onClick={() => setSelected(1)}
              >
              <span className="z-10">Hotel</span>
              </button>

              {/* Butoni Fluturimi */}
              <button
                className={`flex items-center justify-center px-4 py-2 rounded-lg w-28  ${
                  selected === "Fluturimi" //? "bg-white font-600" : "bg-transparent"
                }`}
                onClick={() => setSelected(2)}
              >
                <span className="z-10">Fluturimi</span>
              </button>
            </div>
          </div>

          {/* Inputet dhe butoni */}
          <div className="flex bg-[#ffffff4c] shadow-lg rounded-lg overflow-hidden p-4 space-x-4 w-full max-w-5xl">
            {selected === 1 && (
              <>
                <select
                  className="border rounded-lg p-2 w-auto"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Destinimi ose Hoteli
                  </option>
                  {travelPlans.map((plan) => (
                    <option key={plan.id} value={plan.destinimi_hoteli}>
                      {plan.destinimi_hoteli}
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
                  {travelPlans.map((plan) => (
                    <option key={plan.id} value={plan.opsionet_neteve}>
                      {plan.opsionet_neteve}
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
            {selected === 2 && (
              <>
             <select
                  className="border rounded-lg p-2 w-[11.5rem]"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Nisja Nga
                  </option>
                  {travelPlans.map((plan) => (
                    <option key={plan.id} value={plan.nisja_nga}>
                      {plan.nisja_nga}
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
                  {travelPlans.map((plan) => (
                    <option key={plan.id} value={plan.destinimi_hoteli}>
                      {plan.destinimi_hoteli}
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
            {selected === 0 && (
              <>
               <select
                  className="border rounded-lg p-2 w-[11.5rem]"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Nisja Nga
                  </option>
                  {travelPlans.map((plan) => (
                    <option key={plan.id} value={plan.nisja_nga}>
                      {plan.nisja_nga}
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
                  {travelPlans.map((plan) => (
                    <option key={plan.id} value={plan.destinimi_hoteli}>
                      {plan.destinimi_hoteli}
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
                  {travelPlans.map((plan) => (
                    <option key={plan.id} value={plan.opsionet_neteve}>
                      {plan.opsionet_neteve}
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
