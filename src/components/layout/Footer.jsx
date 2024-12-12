import React from 'react'
import { FaPhoneAlt, FaWhatsapp, FaViber, FaHeadset, FaCheckCircle } from 'react-icons/fa';


function Footer() {
  return (
    <div>
      <div className="f p-10">
        <div className="flex justify-center space-x-9 mb-6 gap-40">
          <div className="text-center">
            <FaCheckCircle className="text-green-500 w-8 h-8 mx-auto mb-2" />
            <p className="text-xl font-semibold">Call Center</p>
          </div>
          <div className="text-center">
            <FaCheckCircle className="text-green-500 w-8 h-8 mx-auto mb-2" />
            <p className="text-xl font-semibold">+5.000 konsulant</p>
          </div>
          <div className="text-center">
            <FaCheckCircle className="text-green-500 w-8 h-8 mx-auto mb-2" />
            <p className="text-xl font-semibold">+200.000 turistë vjetorë</p>
          </div>
          <div className="text-center">
            <FaCheckCircle className="text-green-500 w-8 h-8 mx-auto mb-2" />
            <p className="text-xl font-semibold">+25 vite eksperiencë</p>
          </div>
        </div>
        <div className="subscription  p-6 rounded-lg text-center">
          <p className="mb-4 text-lg">Regjistrohu tani! Ne do të dërgojmë ofertat më të mira çdo javë.</p>
          <input type="email" placeholder="Email" className="w-[16rem] p-2 border border-gray-300 rounded-[10px] mb-4 mr-2" />
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Abonohu</button>
        </div>
      </div>

    <footer className="bg-blue-100 text-black p-10">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Kolona 1 */}
        <div>
          <h3 className="font-semibold mb-4">Top Destinationet</h3>
          <ul>
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
          <ul>
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
          <ul>
            <li>Client Care</li>
            <li>B2B Login</li>
          </ul>
        </div>

        {/* Kolona 4 */}
        <div>
          <h3 className="font-semibold mb-4">Bani Travel | Kosova</h3>
          <ul>
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
