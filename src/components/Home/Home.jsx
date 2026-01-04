
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
    <span>Individual Trips</span>
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
    <span>Airplane Tickets</span>
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
    <span>Hotels Worldwide</span>
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
    <span>Cruises</span>
  </div>
</div>


<div className="flex flex-col justify-center items-center p-6">
  <div className="flex justify-center items-center space-x-4 p-5 mx-auto truncate whitespace-break-spaces text-navy text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
    <span>Special Offers</span>
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
      <div className="mb-12">
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800" style={{ 
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Recommendations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* City Break */}
          <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative h-[280px] sm:h-[320px] overflow-hidden">
            <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop&q=80"
              alt="City Break"
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">City Break</h3>
                <p className="text-white/90 text-sm">Explore the most beautiful cities of Europe</p>
              </div>
            </div>
          </div>

          {/* Dubai */}
          <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative h-[280px] sm:h-[320px] overflow-hidden">
            <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1512453979798-5e66b5f9f7e7?w=800&h=600&fit=crop&q=80"
              alt="Dubai"
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Dubai</h3>
                <p className="text-white/90 text-sm">Luxury and adventure in the city of gold</p>
              </div>
            </div>
          </div>

          {/* Stamboll */}
          <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
            <div className="relative h-[280px] sm:h-[320px] overflow-hidden">
            <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop&q=80"
              alt="Stamboll"
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Stamboll</h3>
                <p className="text-white/90 text-sm">A city where two continents meet</p>
              </div>
            </div>
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


        <div className="mb-12">
          <div className="flex justify-center items-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800" style={{ 
              background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Recommendations
            </h2>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Large Featured Image */}
            <div className="mb-6 group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&q=80"
                  alt="Recommended destination"
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">Special Destinations</h3>
                  <p className="text-white/90 text-lg">Discover the most beautiful places for vacation</p>
                </div>
              </div>
            </div>

            {/* Two Smaller Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-[300px] sm:h-[350px] overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop&q=80"
                    alt="Destination 1"
                    onError={(e) => {
                      e.target.src = 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">Adventure and Exploration</h3>
                    <p className="text-white/90 text-sm">Unforgettable experiences</p>
                  </div>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-[300px] sm:h-[350px] overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80"
                    alt="Destination 2"
                    onError={(e) => {
                      e.target.src = 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">Exotic Destinations</h3>
                    <p className="text-white/90 text-sm">Relaxation and luxury</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stamboll p-10">
      <div className="flex justify-center items-center space-x-4 mx-auto truncate whitespace-break-spaces text-navy text-xl font-bold tracking-tight lg:text-2xl">
        <span>Istanbul Offers</span>
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
              <p className="text-blue-600 font-bold">from PP €{hotel.price}</p>
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
        <span>Hurghada Offers</span>
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
              <p className="text-blue-600 font-bold">from PP €{hotel.price}</p>
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
  <h2 className="text-3xl font-bold text-center mb-6">Cappadocia Hotels</h2>
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
                from PP €{hotel.price}
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
