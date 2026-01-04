import React, { useState } from 'react';
import {FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';


function Footer() {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5001/api/abonohu',
        { email }, 
        { withCredentials: true } 
      );
  
      setMessage('You have successfully subscribed! You will be notified about the best offers via email.');
    } catch (error) {
      console.error('Gabim:', error);
      setMessage('An error occurred. Please try again.');
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
          <p className="text-lg sm:text-xl font-semibold">+5,000 Consultants</p>
        </div>
        <div className="text-center w-full sm:w-auto">
          <FaCheckCircle className="text-green-500 w-8 h-8 mx-auto mb-2" />
          <p className="text-lg sm:text-xl font-semibold">+200,000 Annual Tourists</p>
        </div>
        <div className="text-center w-full sm:w-auto">
          <FaCheckCircle className="text-green-500 w-8 h-8 mx-auto mb-2" />
          <p className="text-lg sm:text-xl font-semibold">+25 Years Experience</p>
        </div>
      </div>
      <div className="subscription p-6 sm:p-[3rem] rounded-lg text-center">
        <p className="mb-4 text-base sm:text-lg">
          Register now! We will send the best offers every week.
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
            Subscribe
          </button>
        </div>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </div>
  
    <footer className="bg-blue-100 text-black p-6 sm:p-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Kolona 1 */}
        <div>
          <h3 className="font-semibold mb-4">Top Destinations</h3>
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
          <h3 className="font-semibold mb-4">Important Information</h3>
          <ul className="space-y-2">
            <li>Travel Tips</li>
            <li>Travel Rules</li>
            <li>About Us</li>
            <li>Cookie Policy</li>
            <li>Change Cookie Settings</li>
          </ul>
        </div>
  
        {/* Kolona 3 */}
        <div>
          <h3 className="font-semibold mb-4">Reservations</h3>
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
