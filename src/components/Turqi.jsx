import React from 'react'
import { FaPhoneAlt, FaWhatsapp, FaViber, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import Footer from './Footer';
import Nav from './nav'

function Turqi() {
  return (
    <><div>
      <Nav />

      <div className="relative w-full min-h-[20rem]">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.ctfassets.net/pzootm7d2s0g/6r3BuT5jsh89EFRo3cJynZ/640af9075c991e2959a70d0290aba7ef/turqi.jpg"
          alt="Banner" />

      </div>


      <div className="p-10">
        <div className="flex justify-center items-center space-x-4 mx-auto truncate whitespace-break-spaces text-navy text-xl font-bold tracking-tight lg:text-2xl">
          <span>Turqi Home | Paket Arazhman
          </span>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-8">
          <div className="card1 w-1/4 text-center relative">
            <img className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="https://images.ctfassets.net/pzootm7d2s0g/1kARR2mbPE3LiFAeV2OYmi/266c1d6d9df5156aec01a75a10983be6/antlya_teaser.jpg" alt="City Break" />
            <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
              Antalya </p> </div>

          {/* Dubai */}
          <div className="card1 w-1/4 text-center relative">
            <img
              className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="https://images.ctfassets.net/pzootm7d2s0g/1IKyu5EnQgbdTTvJo7FEh0/0b2a5680302f64d3ce895807fb0ef9d8/bodrum_teasser.jpg"
              alt="Dubai" />
            <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
              Bodrum
            </p>
          </div>
          {/* Stamboll */}
          <div className="card1 w-1/4 text-center relative">
            <img
              className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="https://images.ctfassets.net/pzootm7d2s0g/11X8bWs3Zrnwq7EqOLhhHU/242d74a5f3d5485f8bbb6ff7f701c34d/IST_TEA.jpg"
              alt="Stamboll" />
            <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
              Stamboll
            </p>
          </div>
        </div>

      </div>
    </div>
    <div className=" p-10 flex justify-center">
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
              <tr>
                <td className="border border-gray-300 px-4 py-2">Standard Room (L/V | FRNCH)</td>
                <td className="border border-gray-300 px-4 py-2">Bed & Breakfast</td>
                <td className="border border-gray-300 px-4 py-2">€ 82</td>
                <td className="border border-gray-300 px-4 py-2">€ 92</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Single Room</td>
                <td className="border border-gray-300 px-4 py-2">Bed & Breakfast</td>
                <td className="border border-gray-300 px-4 py-2">€ 82</td>
                <td className="border border-gray-300 px-4 py-2">€ 92</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Standard Room (L/V | TWN)</td>
                <td className="border border-gray-300 px-4 py-2">Bed & Breakfast</td>
                <td className="border border-gray-300 px-4 py-2">€ 82</td>
                <td className="border border-gray-300 px-4 py-2">€ 92</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Single Room</td>
                <td className="border border-gray-300 px-4 py-2">Bed & Breakfast</td>
                <td className="border border-gray-300 px-4 py-2">€ 82</td>
                <td className="border border-gray-300 px-4 py-2">€ 92</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Superior Room (M/V)</td>
                <td className="border border-gray-300 px-4 py-2">Bed & Breakfast</td>
                <td className="border border-gray-300 px-4 py-2">€ 103</td>
                <td className="border border-gray-300 px-4 py-2">€ 116</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Double+Ext Bed</td>
                <td className="border border-gray-300 px-4 py-2">Bed & Breakfast</td>
                <td className="border border-gray-300 px-4 py-2">€ 103</td>
                <td className="border border-gray-300 px-4 py-2">€ 116</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Double Room+1 Chd</td>
                <td className="border border-gray-300 px-4 py-2">Bed & Breakfast</td>
                <td className="border border-gray-300 px-4 py-2">€ 103</td>
                <td className="border border-gray-300 px-4 py-2">€ 116</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Superior Room (L/V)</td>
                <td className="border border-gray-300 px-4 py-2">Bed & Breakfast</td>
                <td className="border border-gray-300 px-4 py-2">€ 111</td>
                <td className="border border-gray-300 px-4 py-2">€ 124</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Double+Ext Bed</td>
                <td className="border border-gray-300 px-4 py-2">Bed & Breakfast</td>
                <td className="border border-gray-300 px-4 py-2">€ 111</td>
                <td className="border border-gray-300 px-4 py-2">€ 124</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Double Room+1 Chd</td>
                <td className="border border-gray-300 px-4 py-2">Bed & Breakfast</td>
                <td className="border border-gray-300 px-4 py-2">€ 111</td>
                <td className="border border-gray-300 px-4 py-2">€ 124</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="tick bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8 rounded-xl shadow-lg mt-8">
  <div className="flex justify-center items-start space-x-16 md:space-x-12 lg:space-x-20 p-8">
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      <h2 className="font-bold text-2xl text-blue-600 mb-6 text-center">Në çmim përfshihet</h2>
      <ul className="list-none space-y-4">
        <li className="flex items-center text-lg">
          <span className="text-green-500 text-xl mr-3">✔️</span>
          Akomodimi
        </li>
        <li className="flex items-center text-lg">
          <span className="text-green-500 text-xl mr-3">✔️</span>
          Mëngjesi
        </li>
        <li className="flex items-center text-lg">
          <span className="text-green-500 text-xl mr-3">✔️</span>
          Spa center
        </li>
        <li className="flex items-center text-lg">
          <span className="text-green-500 text-xl mr-3">✔️</span>
          Pishina
        </li>
        <li className="flex items-center text-lg">
          <span className="text-green-500 text-xl mr-3">✔️</span>
          Aqua Park
        </li>
        <li className="flex items-center text-lg">
          <span className="text-green-500 text-xl mr-3">✔️</span>
          Parking
        </li>
        <li className="flex items-center text-lg">
          <span className="text-green-500 text-xl mr-3">✔️</span>
          WI-FI
        </li>
      </ul>
    </div>

    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      <h2 className="font-bold text-2xl text-red-600 mb-6 text-center">Në çmim nuk përfshihet</h2>
      <ul className="list-none space-y-4">
        <li className="flex items-center text-lg">
          <span className="text-red-500 text-xl mr-3">✘</span>
          Transferi
        </li>
        <li className="flex items-center text-lg">
          <span className="text-red-500 text-xl mr-3">✘</span>
          Shërbimet shtesë
        </li>
      </ul>
    </div>
  </div>



</div>

<Footer />

      
      </>

   
      
  )
}

export default Turqi
