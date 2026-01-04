import React, { useEffect, useState } from 'react';
import Footer from '../layout/Footer';
import Carousel from '../carousel.component';
import axios from 'axios';

const Greqi = () => {
  const [slides, setSlides] = useState([]);

  // Fetch images from backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/greqi-images');
        setSlides(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const cities = [
    {
      id: 1,
      name: "Athens",
      nameShqip: "Athina",
      description: "Athens is a city that combines history and modernity. The Acropolis and Parthenon are main attractions, while the old neighborhoods and surrounding beaches offer a rich cultural and natural experience.",
      image: "https://expertvagabond.com/wp-content/uploads/things-to-do-athens-guide.jpg",
      buttonText: "Offers for Athens"
    },
    {
      id: 2,
      name: "Thessaloniki",
      nameShqip: "Selaniku",
      description: "Thessaloniki, Greece's second largest city, is an important historical, cultural and economic hub in the Balkans. Known for its large port and as an active center for festivals, education and trade.",
      image: "https://www.discovergreece.com/sites/default/files/styles/og_image/public/2019-12/2-thessaloniki_and_the_white_tower_from_above-1.jpg",
      buttonText: "Offers for Thessaloniki"
    },
    {
      id: 3,
      name: "Patras",
      nameShqip: "Patra",
      description: "Patras, Greece's third largest city, is an important port connecting the country with Italy and other parts of Europe. The city also has historical monuments like the Ancient Odeon and Castle.",
      image: "https://v9c9u8s9.delivery.rocketcdn.me/wp-content/uploads/2021/09/Upper-town-Patras-.jpg",
      buttonText: "Offers for Patras"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-cyan-300">
              GREECE
            </span>
          </h1>
          <p className="text-lg text-white/90 font-light mb-6 max-w-2xl">
            Discover the beauty of ancient history and breathtaking islands
          </p>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Carousel slides={slides.map(slide => `data:image/jpeg;base64,${slide.imageBase64}`)} />
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Greek Cities
              </span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore the most beautiful cities of Greece, each offering unique cultural experiences and breathtaking landscapes
            </p>
          </div>

          {/* Cities Grid */}
          <div className="space-y-12">
            {cities.map((city, index) => (
              <div
                key={city.id}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className="lg:w-1/2">
                  <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-64 lg:h-80 object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2">
                  <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{city.name}</h3>
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {city.nameShqip}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {city.description}
                    </p>
                    
                    <button className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <span className="flex items-center">
                        {city.buttonText}
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { label: "Historic Sites", value: "18", color: "from-blue-500 to-cyan-500" },
              { label: "Beautiful Islands", value: "200+", color: "from-purple-500 to-pink-500" },
              { label: "Annual Visitors", value: "32M+", color: "from-amber-500 to-orange-500" },
              { label: "UNESCO Sites", value: "18", color: "from-emerald-500 to-teal-500" }
            ].map((stat, index) => (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                <div className="relative bg-white p-6 rounded-xl border border-gray-200 text-center hover:border-gray-300 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Explore Greece?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Book your dream vacation to Greece today and experience ancient history, beautiful beaches, and delicious cuisine
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              View All Packages
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Greqi;