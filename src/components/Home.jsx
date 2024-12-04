
import React, { useState } from "react";
import { FaPhoneAlt, FaWhatsapp, FaViber, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import HomeTable from "./HomeTable";
import Footer from "./Footer";

function Home() {

  const [selected, setSelected] = useState("Aranzhman");

  return (
    <div>
      <HomeTable />

      <div className="flex justify-center items-center space-x-4 p-5 mt-[2rem]">
        <div className="check flex items-center bg-gray-100 rounded-lg shadow-md p-2">
          <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Charter</span>
        </div>
        <div className="check flex items-center bg-gray-100 rounded-lg shadow-md p-2">
          <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Udhëtime Individuale</span>
        </div>
        <div className="check flex items-center bg-gray-100 rounded-lg shadow-md p-2">
          <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Bileta Aeroplani</span>
        </div>
        <div className="check flex items-center bg-gray-100 rounded-lg shadow-md p-2">
          <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Hotele në të gjithë Botën</span>
        </div>
        <div className="check flex items-center bg-gray-100 rounded-lg shadow-md p-2">
          <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Kroçiere</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-10">
        <div className="flex justify-center items-center space-x-4 p-10 mx-auto truncate whitespace-break-spaces text-navy text-xl font-bold tracking-tight lg:text-2xl"> 
          <span>Oferta Speciale</span> 
        </div> 
          <div className="group rounded-lg overflow-hidden">
          <img className="w-[70rem] h-[450px]  object-cover transition-transform duration-300 group-hover:scale-110" src="https://images.ctfassets.net/pzootm7d2s0g/1h4IWXmTcNR9ZHzw4EX1ti/16b41707c8b54e1ad9fd569a4ae9597e/p0j759k4.jpg" alt="Oferta Speciale" />
          </div> 
        </div>
        <div className="p-10">
          <div className="flex justify-center items-center space-x-4 mx-auto truncate whitespace-break-spaces text-navy text-xl font-bold tracking-tight lg:text-2xl">
            <span>Rekomandimet</span>
          </div>
        
          <div className="flex justify-center items-center space-x-4 mt-8">
            <div className="card1 w-1/4 text-center relative rounded-lg overflow-hidden"> 
              <img className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105" 
                src="https://images.ctfassets.net/pzootm7d2s0g/6HIzcqGhHdAD68aGixaEDl/74d6b3825b8ea872c694b31780c1c919/city_break.jpg" alt="City Break" /> 
              <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
                City Break 
              </p> 
            </div>

            {/* Dubai */}
            <div className="card1 w-1/4 text-center relative rounded-lg overflow-hidden">
              <img
                className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
                src="https://images.ctfassets.net/pzootm7d2s0g/4lcQvODRZ3CVyLSVreRCFt/98754a0e4909d5fde9c3af9a23309202/dubai_main1w.jpg"
                alt="Dubai" />
              <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
                Dubai
              </p>
            </div>

            {/* Stamboll */}
            <div className="card1 w-1/4 text-center relative rounded-lg overflow-hidden">
              <img
                className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
                src="https://images.ctfassets.net/pzootm7d2s0g/11X8bWs3Zrnwq7EqOLhhHU/242d74a5f3d5485f8bbb6ff7f701c34d/IST_TEA.jpg"
                alt="Stamboll"
              />
              <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
                Stamboll
              </p>
            </div>
          </div>
          <div className="contacts">
            <div className="p-10">
              <div className="flex justify-center items-center space-x-8 p-10">
      
                {/* Call Center */}
                <div className="flex items-center justify-between rounded-[20px] bg-white w-[20rem] h-[6rem] border border-blue-900 group hover:bg-[#132246] transition-all duration-300">
                  <span className="font-semibold text-blue-900 text-[20px] ml-8 group-hover:text-white transition-colors duration-300">Call Center</span>
                  <div className="bg-[#132246] w-[8rem] h-[6rem] rounded-l-[20px] rounded-r-[20px] flex items-center justify-center">
                    <FaPhoneAlt className="text-white w-[3rem] h-8 group-hover:scale-150 transition-transform duration-300" />
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center justify-between rounded-[20px] bg-white w-[20rem] h-[6rem] border border-green-600 group hover:bg-[#25d366] transition-all duration-300">
                  <span className="font-semibold text-green-600 text-[20px] ml-8 group-hover:text-white transition-colors duration-300">WhatsApp</span>
                  <div className="bg-[#25d366] w-[8rem] h-[6rem] rounded-l-[20px] rounded-r-[20px] flex items-center justify-center">
                    <FaWhatsapp className="text-white w-[3rem] h-10 group-hover:scale-150 transition-transform duration-300" />
                  </div>
                </div>

                {/* Viber */}
                <div className="flex items-center justify-between rounded-[20px] bg-white w-[20rem] h-[6rem] border border-purple-700 group hover:bg-[#7360f2] transition-all duration-300">
                  <span className="font-semibold text-purple-900 text-[20px] ml-8 group-hover:text-white transition-colors duration-300">Viber</span>
                  <div className="bg-[#7360f2] w-[8rem] h-[6rem] rounded-l-[20px] rounded-r-[20px] flex items-center justify-center">
                    <FaViber className="text-white w-[3rem] h-10 group-hover:scale-150 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4 mx-auto truncate whitespace-break-spaces text-navy text-xl font-bold tracking-tight lg:text-2xl">
          <span>Rekomandimet</span>
        </div>
        <div className="rekomandimet grid place-items-center py-10">
          <div className="a group relative block overflow-hidden rounded-lg col-span-2">
            <img
              width={400}
              height={400}
              className="h-[400px] w-[900px] rounded-lg object-cover transition-all group-hover:scale-105"
              src="https://images.ctfassets.net/pzootm7d2s0g/2BqWwB1eTDPZCiprij3mGi/10bf974ef68fe2f9a30ad5a73662f126/dimri.jpg"
              alt="aaa"
            />
          </div>

          <div className="grid  grid-cols-2 gap-4  justify-center items-center ml-[19.1rem] py-3">
            <div className="im1 group rounded-lg overflow-hidden">
              <img
                className="w-[500px] h-auto rounded-lg object-cover transition-all group-hover:scale-105"
                src="https://images.ctfassets.net/pzootm7d2s0g/4a0lfKENlzoNyN9yJy3r7V/3db03110eba2f273b42ac809efefa42a/pexels-asadphoto-1430676.jpg"
                alt="bb"
              />
            </div>
            <div className="im1 group rounded-lg overflow-hidden">
              <img
                className="w-[500px] h-auto rounded-lg object-cover transition-all group-hover:scale-105"
                src="https://images.ctfassets.net/pzootm7d2s0g/54r5Al6TKR7Sf7TdYv4tr9/10900d0e2733316bad53b80d214dc90d/exotic.jpg"
                alt="cc"
              />
            </div>
          </div>
        </div>

        <div className="stamboll p-10">
          <div className="flex justify-center items-center space-x-4 mx-auto truncate whitespace-break-spaces text-navy text-xl font-bold tracking-tight lg:text-2xl">
            <span>Oferta Stamboll</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Kartela 1 */}
            <div className="stamboll bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">The Byzantium</h3>
                <p className="text-gray-600 mb-1">⭐⭐⭐⭐ Istanbul, Turkey</p>
                <p className="text-gray-600 mb-1">Bed And Breakfast</p>
                <p className="text-blue-600 font-bold">nga PP €320</p>
              </div>
              <div className="ml-auto">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src="https://diq6z0fqx8xxr.cloudfront.net/images/product/1/8/0/2/2/213950/the_byzantium_-_sultanahmet__istanbul_213950.jpg?width=1024&height=768&mode=min"
                  alt="The Byzantium"
                />
              </div>
            </div>

            {/* Kartela 2 */}
            <div className="stamboll bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">Hotel Centrum Istanbul</h3>
                <p className="text-gray-600 mb-1">⭐⭐⭐ Istanbul, Turkey</p>
                <p className="text-gray-600 mb-1">Bed And Breakfast</p>
                <p className="text-blue-600 font-bold">nga PP €300</p>
              </div>
              <div className="ml-auto">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src="https://media.dev.paximum.com/hotelimages/105991/1.jpg"
                  alt="Hotel Centrum Istanbul"
                />
              </div>
            </div>

            {/* Kartela 3 */}
            <div className="stamboll bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">Ipek Palas</h3>
                <p className="text-gray-600 mb-1">⭐⭐⭐ Istanbul, Turkey</p>
                <p className="text-gray-600 mb-1">Bed And Breakfast</p>
                <p className="text-blue-600 font-bold">nga PP €289</p>
              </div>
              <div className="ml-auto">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src="https://diq6z0fqx8xxr.cloudfront.net/images/product/1/41/0/2/2/175184/ipek_palas_175184.jpg?width=1024&height=768&mode=min"
                  alt="Hotel Centrum Istanbul"
                />
              </div>
            </div>

            {/* Kartela 4 */}
            <div className="stamboll bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">Premist Taksim</h3>
                <p className="text-gray-600 mb-1">⭐⭐⭐ Istanbul, Turkey</p>
                <p className="text-gray-600 mb-1">Bed And Breakfast</p>
                <p className="text-blue-600 font-bold">nga PP €300</p>
              </div>
              <div className="ml-auto">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src="https://photos.hotelbeds.com/giata/xl/63/632485/632485a_hb_a_005.JPG"
                  alt="Hotel Centrum Istanbul"
                />
              </div>
            </div>

            <div className="stamboll bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">Lady Diana</h3>
                <p className="text-gray-600 mb-1">⭐⭐⭐ Istanbul, Turkey</p>
                <p className="text-gray-600 mb-1">Bed And Breakfast</p>
                <p className="text-blue-600 font-bold">nga PP €300</p>
              </div>
              <div className="ml-auto">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src="https://diq6z0fqx8xxr.cloudfront.net/images/product/1/41/0/2/2/170250/lady_diana_170250.jpg?width=1024&height=768&mode=min"
                  alt="Hotel Centrum Istanbul"
                />
              </div>
            </div>
            <div className="stamboll bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">AKKA Lush Hotem Taksim</h3>
                <p className="text-gray-600 mb-1">⭐⭐⭐ Istanbul, Turkey</p>
                <p className="text-gray-600 mb-1">Bed And Breakfast</p>
                <p className="text-blue-600 font-bold">nga PP €300</p>
              </div>
              <div className="ml-auto">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src="https://images.ctfassets.net/1i1co12z89xy/6jyo1OnV6Ardh20dnZ4xCw/d6f0a8c018c4f49806dba4abedc206d7/akka-lush-taksim.jpg"
                  alt="Hotel Centrum Istanbul"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="Hurghada p-10">

          <div className="flex justify-center items-center space-x-4 mx-auto truncate whitespace-break-spaces text-navy text-xl font-bold tracking-tight lg:text-2xl">
            <span>Hurghada hotele</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Kartela 1 */}
            <div className=" bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">Royal Lagoons Aqua Park Resort</h3>
                <p className="text-gray-600 mb-1">⭐⭐⭐⭐ Hurghada, Egypt</p>
                <p className="text-gray-600 mb-1">All Inclusive</p>
                <p className="text-blue-600 font-bold">nga PP €320</p>
              </div>
              <div className="ml-auto">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src="https://diq6z0fqx8xxr.cloudfront.net/images/product/1/8/0/2/2/202996/royal_lagoons_aqua_park_resort_-_el_memsha__hurgada_202996.jpg?width=1024&height=768&mode=min"
                  alt="The Byzantium"
                />
              </div>
            </div>

            {/* Kartela 2 */}
            <div className=" bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">SUNRISE Holidays Resort</h3>
                <p className="text-gray-600 mb-1">⭐⭐⭐⭐ Hurghada, Egypt</p>
                <p className="text-gray-600 mb-1">All Inclusive</p>
                <p className="text-blue-600 font-bold">nga PP €320</p>
              </div>
              <div className="ml-auto">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src="https://media.dev.paximum.com/hotelimages/310041/3fe79b2285ebe8d9c613dfbe57987eec.jpg"
                  alt="The Byzantium"
                />
              </div>
            </div>

            {/* Kartela 3 */}
            <div className=" bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">Caves Beach Resort</h3>
                <p className="text-gray-600 mb-1">⭐⭐⭐⭐ Hurghada, Egypt</p>
                <p className="text-gray-600 mb-1">All Inclusive</p>
                <p className="text-blue-600 font-bold">nga PP €320</p>
              </div>
              <div className="ml-auto">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src="https://service.fibula.ro/media/images/product/1/8/0/2/2/103812/caves_beach_resort_-_al_ahyaa__hurgada_103812.jpg?width=1024&height=768&mode=min"
                  alt="The Byzantium"
                />
              </div>
            </div>

            {/* Kartela 4 */}
            <div className=" bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">Minamark Resort</h3>
                <p className="text-gray-600 mb-1">⭐⭐⭐⭐ Hurghada, Egypt</p>
                <p className="text-gray-600 mb-1">All Inclusive</p>
                <p className="text-blue-600 font-bold">nga PP €320</p>
              </div>
              <div className="ml-auto">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src="https://diq6z0fqx8xxr.cloudfront.net/images/product/1/8/0/2/2/202809/minamark_resort_-_sakkala__hurgada_202809.jpg?width=1024&height=768&mode=min"
                  alt="The Byzantium"
                />
              </div>
            </div>

            <div className=" bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">SUNRISE Aqua Joy Resort</h3>
                <p className="text-gray-600 mb-1">⭐⭐⭐⭐ Hurghada, Egypt</p>
                <p className="text-gray-600 mb-1">All Inclusive</p>
                <p className="text-blue-600 font-bold">nga PP €320</p>
              </div>
              <div className="ml-auto">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src="https://diq6z0fqx8xxr.cloudfront.net/images/product/1/6/0/2/2/137329/sunrise_aqua_joy_resort_137329.jpg"
                  alt="The Byzantium"
                />
              </div>
            </div>
            <div className=" bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">Albatros Citadel Sahl Hashsih</h3>
                <p className="text-gray-600 mb-1">⭐⭐⭐⭐ Hurghada, Egypt</p>
                <p className="text-gray-600 mb-1">All Inclusive</p>
                <p className="text-blue-600 font-bold">nga PP €320</p>
              </div>
              <div className="ml-auto">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src="https://images.fibula.rs/HotelImage/1/7127/96156_L.jpg"
                  alt="The Byzantium"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  );
}

export default Home;
