import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { FaPhoneAlt, FaWhatsapp, FaViber, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import Footer from '../layout/Footer';
import Table from '../Table';
import axiosInstance from '../../axiosInstance';

function Turqi() {
  const [roomPrices, setRoomPrices] = useState([]);
  const [message, setMessage] = useState('');


  useEffect(() => {
    const fetchRoomPrices = async () => {
      try {
        const response = await axiosInstance.get('/room-price');
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

  <div className="flex justify-center items-center space-x-4 mt-8 flex-wrap">
    <div className="card1 w-full sm:w-1/2 lg:w-1/4 text-center relative mb-6">
      <img
        className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
        src="https://images.ctfassets.net/pzootm7d2s0g/1kARR2mbPE3LiFAeV2OYmi/266c1d6d9df5156aec01a75a10983be6/antlya_teaser.jpg"
        alt="City Break"
      />
      <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">Antalya</p>
    </div>

    <div className="card1 w-full sm:w-1/2 lg:w-1/4 text-center relative mb-6">
      <img
        className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
        src="https://images.ctfassets.net/pzootm7d2s0g/1IKyu5EnQgbdTTvJo7FEh0/0b2a5680302f64d3ce895807fb0ef9d8/bodrum_teasser.jpg"
        alt="Dubai"
      />
      <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">Bodrum</p>
    </div>

    <div className="card1 w-full sm:w-1/2 lg:w-1/4 text-center relative mb-6">
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
      <div className="table-container p-8 bg-gray-50 rounded-xl shadow-lg">
  <div className="flex justify-center items-center">
    <table className="table-auto w-[50rem] bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <tr>
          <th className="px-6 py-4 text-left text-lg font-semibold">Lloji i Dhomës</th>
          <th className="pr-10 text-lg font-semibold">Shërbimi</th>
          <th className="px-6 py-4 text-lg font-semibold text-center">Price 1</th>
          <th className="px-6 py-4 text-lg font-semibold text-center">Price 2</th>
        </tr>
      </thead>
      <tbody>
        {roomPrices.map((room, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
            } hover:bg-gray-200 transition duration-200 ease-in-out`}
          >
            <td className="px-6 py-4 text-gray-800 text-sm font-medium">{room.room_type}</td>
            <td className=" pl-4 text-gray-800 text-sm">{room.service}</td>
            <td className="px-6 py-4 text-center text-gray-800 text-sm font-medium">
              {room.price_1}
            </td>
            <td className="px-6 py-4 text-center text-gray-800 text-sm font-medium">
              {room.price_2}
            </td>
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
