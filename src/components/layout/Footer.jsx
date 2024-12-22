import React, { useState } from 'react';
import {FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';


function Footer() {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/abonohu',
        { email }, 
        { withCredentials: true } 
      );
  
      setMessage('Jeni abonuar me sukses! Në email do të njoftoheni për ofertat më të mira.');
    } catch (error) {
      console.error('Gabim:', error);
      setMessage('Ndodhi një gabim. Ju lutem provoni përsëri.');
    }
  };
  
  return (
    <div>
    <div className="f p-[7rem]">
      <div className="flex flex-wrap justify-center gap-[5rem] mb-6">
        <div className="text-center w-full sm:w-auto">
          <FaCheckCircle className="text-green-500 w-8 h-8 mx-auto mb-2" />
          <p className="text-lg sm:text-xl font-semibold">Call Center</p>
        </div>
        <div className="text-center w-full sm:w-auto">
          <FaCheckCircle className="text-green-500 w-8 h-8 mx-auto mb-2" />
          <p className="text-lg sm:text-xl font-semibold">+5.000 konsulant</p>
        </div>
        <div className="text-center w-full sm:w-auto">
          <FaCheckCircle className="text-green-500 w-8 h-8 mx-auto mb-2" />
          <p className="text-lg sm:text-xl font-semibold">+200.000 turistë vjetorë</p>
        </div>
        <div className="text-center w-full sm:w-auto">
          <FaCheckCircle className="text-green-500 w-8 h-8 mx-auto mb-2" />
          <p className="text-lg sm:text-xl font-semibold">+25 vite eksperiencë</p>
        </div>
      </div>
      <div className="subscription p-6 sm:p-[3rem] rounded-lg text-center">
        <p className="mb-4 text-base sm:text-lg">
          Regjistrohu tani! Ne do të dërgojmë ofertat më të mira çdo javë.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-[16rem] p-2 border border-gray-300 rounded-[10px]"
          />
          <button
            onClick={handleSubscribe}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Abonohu
          </button>
        </div>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </div>
  
    <footer className="bg-blue-100 text-black p-6 sm:p-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Kolona 1 */}
        <div>
          <h3 className="font-semibold mb-4">Top Destinationet</h3>
          <ul className="space-y-2">
            <li>Alanya</li>
            <li>Antalya</li>
            <li>Belek</li>
            <li>Lara</li>
            <li>Kemer</li>
            <li>Side</li>
            <li>Bodrum</li>
          </ul>
        </div>
  
        {/* Kolona 2 */}
        <div>
          <h3 className="font-semibold mb-4">Informacion i rëndësishëm</h3>
          <ul className="space-y-2">
            <li>Këshilla për udhëtim</li>
            <li>Rregullat e Udhëtimit</li>
            <li>Rreth nesh</li>
            <li>Politika e Cookies</li>
            <li>Ndrysho cilësimet e Cookies</li>
          </ul>
        </div>
  
        {/* Kolona 3 */}
        <div>
          <h3 className="font-semibold mb-4">Rezervimet</h3>
          <ul className="space-y-2">
            <li>Client Care</li>
            <li>B2B Login</li>
          </ul>
        </div>
  
        {/* Kolona 4 */}
        <div>
          <h3 className="font-semibold mb-4">Bani Travel | Kosova</h3>
          <ul className="space-y-2">
            <li>Bani Travel | Kosova</li>
            <li>Call Center: +383 45 963 828</li>
            <li>info@Bani-travel.com</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
  
  )
}

export default Footer
