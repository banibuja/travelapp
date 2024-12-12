import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { FaPhoneAlt, FaWhatsapp, FaViber, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import Footer from '../layout/Footer';
import Table from '../Table';

function Turqi() {
  const [roomPrices, setRoomPrices] = useState([]);
  const [message, setMessage] = useState('');


  useEffect(() => {
    const fetchRoomPrices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/room-price', {
          withCredentials: true,
        });
        setRoomPrices(response.data);
      } catch (error) {
        console.error('Error fetching room prices:', error);
        setMessage('There was an error fetching room prices.');
      }
    };

    fetchRoomPrices();
  }, []);

  return (
    <>
      <div>
        <div className="relative w-full min-h-[20rem]">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.ctfassets.net/pzootm7d2s0g/6r3BuT5jsh89EFRo3cJynZ/640af9075c991e2959a70d0290aba7ef/turqi.jpg"
            alt="Banner"
          />
        </div>

        <div className="p-10">
          <div className="flex justify-center items-center space-x-4 mx-auto truncate whitespace-break-spaces text-navy text-xl font-bold tracking-tight lg:text-2xl">
            <span>Turqi Home | Paket Arazhman</span>
          </div>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <div className="card1 w-1/4 text-center relative">
              <img
                className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
                src="https://images.ctfassets.net/pzootm7d2s0g/1kARR2mbPE3LiFAeV2OYmi/266c1d6d9df5156aec01a75a10983be6/antlya_teaser.jpg"
                alt="City Break"
              />
              <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">Antalya</p>
            </div>

            <div className="card1 w-1/4 text-center relative">
              <img
                className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
                src="https://images.ctfassets.net/pzootm7d2s0g/1IKyu5EnQgbdTTvJo7FEh0/0b2a5680302f64d3ce895807fb0ef9d8/bodrum_teasser.jpg"
                alt="Dubai"
              />
              <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">Bodrum</p>
            </div>

            <div className="card1 w-1/4 text-center relative">
              <img
                className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
                src="https://images.ctfassets.net/pzootm7d2s0g/11X8bWs3Zrnwq7EqOLhhHU/242d74a5f3d5485f8bbb6ff7f701c34d/IST_TEA.jpg"
                alt="Stamboll"
              />
              <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">Stamboll</p>
            </div>
          </div>
        </div>
      </div>

      {/* Room Price Table */}
      <div className="p-10 flex justify-center">
        <div className="flex justify-center items-center space-x-8 p-10">
          <table className="table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Lloji i Dhomës</th>
                <th className="border border-gray-300 px-4 py-2">Shërbimi</th>
                <th className="border border-gray-300 px-4 py-2">01.10-24.12.2024</th>
                <th className="border border-gray-300 px-4 py-2">25.12-02.01.2025</th>
              </tr>
            </thead>
            <tbody>
              {roomPrices.map((room, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{room.room_type}</td>
                  <td className="border border-gray-300 px-4 py-2">{room.service}</td>
                  <td className="border border-gray-300 px-4 py-2">{room.price_1}</td>
                  <td className="border border-gray-300 px-4 py-2">{room.price_2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Table  
        perfshihet={['Akomodin',"Mëngjesi", "Spa center", "Pishina", "Aqua Park", "Parking", "WI-FI"]} 
        nukPerfshihet={["Transferi", "Shërbimet shtesë"]}
      />

      <Footer/>
    </>
  );
}

export default Turqi;
