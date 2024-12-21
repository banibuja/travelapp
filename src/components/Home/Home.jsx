
import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaWhatsapp, FaViber, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import HomeTable from "./HomeTable";
import Footer from "../layout/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'; 
import axiosInstance from '../../axiosInstance';

function Home() {

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [hotels, setHotels] = useState([]);
  const [hotelsHurghada, setHotelsHughada] = useState([]);
  const [kapodakia, setKapodakia] = useState([]);




  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get('/images', {
          withCredentials: true,
        });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setMessage('There was an error fetching images.');
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get('/cards', {
          withCredentials: true,
        });
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setMessage('There was an error fetching images.');
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get('/hurghada/cards', {
          withCredentials: true,
        });
        setHotelsHughada(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setMessage('There was an error fetching images.');
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get('/kapodakia/cards', {
          withCredentials: true,
        });
        setKapodakia(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setMessage('There was an error fetching images.');
      }
    };

    fetchImages();
  }, []);




  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 3000, 
    arrows: false, 
  };




  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Shfaq 4 karta njëkohësisht
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, 
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // const hotelss = [
  //   {
  //     id: 1,
  //     image: "https://media.dev.paximum.com/hotelimages/479240/1.jpg",
  //     name: "Ramada by Wyndham Cappadocia",
  //     stars: 5,
  //     location: "Ortahisar, Turkey",
  //     price: "125",
  //   },
  //   {
  //     id: 2,
  //     image: "https://photos.hotelbeds.com/giata/xl/28/284333/284333a_hb_a_001.jpg",
  //     name: "Hotel Cave Konak",
  //     stars: 3,
  //     location: "Ürgüp merkez, Turkey",
  //     price: "155",
  //   },
  //   {
  //     id: 3,
  //     image: "https://photos.hotelbeds.com/giata/xl/37/370942/370942a_hb_ro_039.jpg",
  //     name: "Rox Cappadocia",
  //     stars: 4,
  //     location: "Uçhisar, Turkey",
  //     price: "160",
  //   },
  //   {
  //     id: 4,
  //     image: "https://photos.hotelbeds.com/giata/xl/15/157370/157370a_hb_l_001.jpg",
  //     name: "Kale Konak Hotel",
  //     stars: 4,
  //     location: "Uçhisar, Turkey",
  //     price: "167",
  //   },
  //   {
  //     id: 5,
  //     image: "https://photos.hotelbeds.com/giata/xl/15/157370/157370a_hb_l_001.jpg",
  //     name: "Ban Konak Hotel",
  //     stars: 4,
  //     location: "Uçhisar, Turkey",
  //     price: "167",
  //   },
  // ];



  return (
    <div>
      <HomeTable />

      <div className="flex flex-wrap justify-center items-center gap-4 p-5 mt-8">
  <div className="check flex items-center bg-gray-100 rounded-lg shadow-md p-3 w-full sm:w-auto">
    <svg
      className="w-6 h-6 text-green-500 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
    <span>Charter</span>
  </div>
  <div className="check flex items-center bg-gray-100 rounded-lg shadow-md p-3 w-full sm:w-auto">
    <svg
      className="w-6 h-6 text-green-500 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
    <span>Udhëtime Individuale</span>
  </div>
  <div className="check flex items-center bg-gray-100 rounded-lg shadow-md p-3 w-full sm:w-auto">
    <svg
      className="w-6 h-6 text-green-500 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
    <span>Bileta Aeroplani</span>
  </div>
  <div className="check flex items-center bg-gray-100 rounded-lg shadow-md p-3 w-full sm:w-auto">
    <svg
      className="w-6 h-6 text-green-500 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
    <span>Hotele në të gjithë Botën</span>
  </div>
  <div className="check flex items-center bg-gray-100 rounded-lg shadow-md p-3 w-full sm:w-auto">
    <svg
      className="w-6 h-6 text-green-500 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
    <span>Kroçiere</span>
  </div>
</div>


<div className="flex flex-col justify-center items-center p-6">
  <div className="flex justify-center items-center space-x-4 p-5 mx-auto truncate whitespace-break-spaces text-navy text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
    <span>Oferta Speciale</span>
  </div>
  <div className="group rounded-lg overflow-hidden w-full max-w-[70rem] h-[450px] sm:h-[350px] md:h-[450px]">
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image.id}>
          <img
            className="w-full h-[450px] sm:h-[350px] md:h-[450px] object-cover"
            src={`data:image/png;base64,${image.imageBase64}`}
            alt={image.title}
          />
        </div>
      ))}
    </Slider>
  </div>
</div>


    
<div className="p-4 sm:p-6 md:p-10">
      {/* Recommendations Section */}
      <div>
        <div className="flex justify-center items-center space-x-4 mx-auto truncate whitespace-break-spaces text-navy text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
          <span>Rekomandimet</span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-6 sm:mt-8">
          {/* City Break */}
          <div className="card1 w-full sm:w-1/2 lg:w-1/4 text-center relative rounded-lg overflow-hidden">
            <img
              className="rounded-lg object-cover w-full h-[200px] sm:h-[250px] md:h-[300px] transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="https://images.ctfassets.net/pzootm7d2s0g/6HIzcqGhHdAD68aGixaEDl/74d6b3825b8ea872c694b31780c1c919/city_break.jpg"
              alt="City Break"
            />
            <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
              City Break
            </p>
          </div>

          {/* Dubai */}
          <div className="card1 w-full sm:w-1/2 lg:w-1/4 text-center relative rounded-lg overflow-hidden">
            <img
              className="rounded-lg object-cover w-full h-[200px] sm:h-[250px] md:h-[300px] transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="https://images.ctfassets.net/pzootm7d2s0g/4lcQvODRZ3CVyLSVreRCFt/98754a0e4909d5fde9c3af9a23309202/dubai_main1w.jpg"
              alt="Dubai"
            />
            <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
              Dubai
            </p>
          </div>

          {/* Stamboll */}
          <div className="card1 w-full sm:w-1/2 lg:w-1/4 text-center relative rounded-lg overflow-hidden">
            <img
              className="rounded-lg object-cover w-full h-[200px] sm:h-[250px] md:h-[300px] transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="https://images.ctfassets.net/pzootm7d2s0g/11X8bWs3Zrnwq7EqOLhhHU/242d74a5f3d5485f8bbb6ff7f701c34d/IST_TEA.jpg"
              alt="Stamboll"
            />
            <p className="city font-semibold text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
              Stamboll
            </p>
          </div>
        </div>
      </div>

      {/* Contacts Section */}
      <div className="mt-10">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          {/* Call Center */}
          <a
            href="tel:+38345963828"
            className="flex flex-col sm:flex-row items-center justify-between rounded-[20px] bg-white w-full sm:w-[20rem] h-[6rem] border border-blue-900 group hover:bg-[#132246] transition-all duration-300"
          >
            <span className="font-semibold text-blue-900 text-[16px] sm:text-[20px] sm:ml-8 group-hover:text-white transition-colors duration-300">
              Call Center
            </span>
            <div className="bg-[#132246] w-full sm:w-[8rem] h-[6rem] rounded-b-[20px] sm:rounded-l-[20px] sm:rounded-r-[20px] flex items-center justify-center">
              <FaPhoneAlt className="text-white w-[2rem] sm:w-[3rem] h-6 sm:h-8 group-hover:scale-150 transition-transform duration-300" />
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/38345963828"
            className="flex flex-col sm:flex-row items-center justify-between rounded-[20px] bg-white w-full sm:w-[20rem] h-[6rem] border border-green-600 group hover:bg-[#25d366] transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-semibold text-green-600 text-[16px] sm:text-[20px] sm:ml-8 group-hover:text-white transition-colors duration-300">
              WhatsApp
            </span>
            <div className="bg-[#25d366] w-full sm:w-[8rem] h-[6rem] rounded-b-[20px] sm:rounded-l-[20px] sm:rounded-r-[20px] flex items-center justify-center">
              <FaWhatsapp className="text-white w-[2rem] sm:w-[3rem] h-6 sm:h-8 group-hover:scale-150 transition-transform duration-300" />
            </div>
          </a>

          {/* Viber */}
          <a
            href="viber://chat?number=38345963828"
            className="flex flex-col sm:flex-row items-center justify-between rounded-[20px] bg-white w-full sm:w-[20rem] h-[6rem] border border-purple-700 group hover:bg-[#7360f2] transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-semibold text-purple-900 text-[16px] sm:text-[20px] sm:ml-8 group-hover:text-white transition-colors duration-300">
              Viber
            </span>
            <div className="bg-[#7360f2] w-full sm:w-[8rem] h-[6rem] rounded-b-[20px] sm:rounded-l-[20px] sm:rounded-r-[20px] flex items-center justify-center">
              <FaViber className="text-white w-[2rem] sm:w-[3rem] h-6 sm:h-8 group-hover:scale-150 transition-transform duration-300" />
            </div>
          </a>
        </div>
      </div>
    </div>


        <div className="flex justify-center items-center space-x-4 mx-auto truncate whitespace-break-spaces text-navy text-xl font-bold tracking-tight lg:text-2xl">
          <span>Rekomandimet</span>
        </div>
        <div className="rekomandimet  place-items-center py-10">
          <div className="a group relative block overflow-hidden rounded-lg col-span-2">
            <img
              width={400}
              height={400}
              className=" h-96 w-[57rem] w- rounded-lg object-cover transition-all group-hover:scale-105"
              src="https://images.ctfassets.net/pzootm7d2s0g/2BqWwB1eTDPZCiprij3mGi/10bf974ef68fe2f9a30ad5a73662f126/dimri.jpg"
              alt="aaa"
            />
          </div>

          <div className="flex gap-4 justify-center items-center mx-auto py-3">
            <div className="im1 group rounded-lg overflow-hidden">
              <img
                className="w-[28rem] h-auto rounded-lg object-cover transition-all group-hover:scale-105"
                src="https://images.ctfassets.net/pzootm7d2s0g/4a0lfKENlzoNyN9yJy3r7V/3db03110eba2f273b42ac809efefa42a/pexels-asadphoto-1430676.jpg"
                alt="bb"
              />
            </div>
            <div className="im1 group rounded-lg overflow-hidden">
              <img
                className="w-[28rem] h-auto rounded-lg object-cover transition-all group-hover:scale-105"
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
        {hotels.map((hotel, index) => (
          <div key={index} className="stamboll bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">{hotel.name}</h3>
              <p className="text-gray-600 mb-1 flex items-center">
          {"⭐".repeat(Math.min(4))} 
        <span className="ml-2">{hotel.location}</span>
          </p>
              <p className="text-gray-600 mb-1">All Inclusive</p>
              <p className="text-blue-600 font-bold">nga PP €{hotel.price}</p>
            </div>
            <div className="ml-auto">
        

        <img src={`data:image/jpeg;base64,${hotel.imageBase64}`} alt={hotel.title} 
        className="w-32 h-32 object-cover rounded-lg" />

            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="hughada p-10">
      <div className="flex justify-center items-center space-x-4 mx-auto truncate whitespace-break-spaces text-navy text-xl font-bold tracking-tight lg:text-2xl">
        <span>Oferta Hurghada</span>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {hotelsHurghada.map((hotel, index) => (
          <div key={index} className="stamboll bg-white shadow-md rounded-lg flex p-6 w-[30rem]">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">{hotel.name}</h3>
              <p className="text-gray-600 mb-1 flex items-center">
          {"⭐".repeat(Math.min(4))} 
        <span className="ml-2">{hotel.location}</span>
          </p>
              <p className="text-gray-600 mb-1">All Inclusive</p>
              <p className="text-blue-600 font-bold">nga PP €{hotel.price}</p>
            </div>
            <div className="ml-auto">
        

        <img src={`data:image/jpeg;base64,${hotel.imageBase64}`} alt={hotel.title} 
        className="w-32 h-32 object-cover rounded-lg" />

            </div>
          </div>
        ))}
      </div>
    </div>

    
    <div className="kapodakia">
  <h2 className="text-3xl font-bold text-center mb-6">Kapadokia hotele</h2>
  <div className="max-w-6xl mx-auto">
    <Slider {...settings1}>
      {kapodakia.map((hotel, index) => (
        <div key={index} className="p-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden w-60 mx-auto"> {/* Karta të vogla */}
          <img src={`data:image/jpeg;base64,${hotel.imageBase64}`} alt={hotel.title} 

              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{hotel.name}</h3>
              <div className="flex items-center space-x-1">
                {[...Array(hotel.stars)].map((_, i) => (
                  <span key={i} className="text-orange-500">★</span>
                ))}
              </div>
              <p className="text-sm text-gray-500">{hotel.location}</p>
              <div className="text-lg font-semibold mt-2">
                nga PP €{hotel.price}
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
</div>



     
        <Footer />
    </div>
  );
}

export default Home;
