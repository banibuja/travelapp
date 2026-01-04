import React, { useEffect, useState } from 'react';
import { 
  FaFire, 
  FaCalendarAlt, 
  FaStar, 
  FaMapMarkerAlt,
  FaGlassCheers,
  FaMusic,
  FaCamera,
  FaHeart,
  FaShareAlt,
  FaClock,
  FaUsers,
  FaCrown,
  FaHotel,
  FaCity,
  FaPalette
} from 'react-icons/fa';
import Footer from '../layout/Footer';

function FestateFundvitit() {
  const [currentImageIndexNewYork, setCurrentImageIndexNewYork] = useState(0);
  const [currentImageIndexLasVegas, setCurrentImageIndexLasVegas] = useState(0);
  const [currentImageIndexSanFrancisco, setCurrentImageIndexSanFrancisco] = useState(0);

  const [isHoveredNewYork, setIsHoveredNewYork] = useState(false);
  const [isHoveredLasVegas, setIsHoveredLasVegas] = useState(false);
  const [isHoveredSanFrancisco, setIsHoveredSanFrancisco] = useState(false);

  const imagesNewYork = [
    "https://images.rove.me/w_1920,q_85/rd9hr8htudskgwb5esid/new-york-times-square-new-years-eve.jpg",
    "https://cdn-imgix.headout.com/media/images/b54d5c0b0bc915fb893bb3a4ef981ac0-Fireworks%20over%20New%20York%20City.jpeg?auto=format&w=1069.6000000000001&h=687.6&q=90&fit=crop&ar=14%3A9&crop=faces",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbHSwQ2d1quCmYGpUqGhtVWoiiJ_Q6GWj-TUKEVLyWxYlRd1r-wirDQeHnxOoDNgzctLY&usqp=CAU"
  ];

  const imagesLasVegas = [
    "https://ktla.com/wp-content/uploads/sites/4/2020/12/AP20365030764895.jpg?strip=1",
    "https://images.unsplash.com/photo-1605639152160-d3b35242a5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  ];

  const imagesSanFrancisco = [
    "https://miro.medium.com/v2/resize:fit:1200/1*CGvTjTOr6_h40pllQA2ATw.png",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1533864608884-0415602e78ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  ];

  useEffect(() => {
    if (isHoveredNewYork) {
      const interval = setInterval(() => {
        setCurrentImageIndexNewYork((prevIndex) => (prevIndex + 1) % imagesNewYork.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHoveredNewYork, imagesNewYork.length]);

  useEffect(() => {
    if (isHoveredLasVegas) {
      const interval = setInterval(() => {
        setCurrentImageIndexLasVegas((prevIndex) => (prevIndex + 1) % imagesLasVegas.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHoveredLasVegas, imagesLasVegas.length]);

  useEffect(() => {
    if (isHoveredSanFrancisco) {
      const interval = setInterval(() => {
        setCurrentImageIndexSanFrancisco((prevIndex) => (prevIndex + 1) % imagesSanFrancisco.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHoveredSanFrancisco, imagesSanFrancisco.length]);

  const destinations = [
    {
      id: 1,
      name: "New York",
      description: "The iconic Times Square ball drop celebration",
      rating: 4.9,
      temperature: "-2°C",
      season: "Winter Wonder",
      tags: ["Times Square", "Fireworks", "Broadway"],
      popular: true,
      highlights: ["Ball Drop", "Central Park", "Brooklyn Bridge"],
      imageIndex: currentImageIndexNewYork,
      images: imagesNewYork,
      isHovered: isHoveredNewYork,
      setIsHovered: setIsHoveredNewYork,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Las Vegas",
      description: "Spectacular shows and non-stop entertainment",
      rating: 4.7,
      temperature: "8°C",
      season: "Desert Celebration",
      tags: ["Casinos", "Shows", "Nightlife"],
      popular: false,
      highlights: ["The Strip", "Bellagio", "Fremont Street"],
      imageIndex: currentImageIndexLasVegas,
      images: imagesLasVegas,
      isHovered: isHoveredLasVegas,
      setIsHovered: setIsHoveredLasVegas,
      color: "from-amber-500 to-orange-500"
    },
    {
      id: 3,
      name: "San Francisco",
      description: "Golden Gate celebrations with bay views",
      rating: 4.6,
      temperature: "10°C",
      season: "Bay Area Magic",
      tags: ["Golden Gate", "Bay", "Culture"],
      popular: true,
      highlights: ["Fisherman's Wharf", "Pier 39", "Union Square"],
      imageIndex: currentImageIndexSanFrancisco,
      images: imagesSanFrancisco,
      isHovered: isHoveredSanFrancisco,
      setIsHovered: setIsHoveredSanFrancisco,
      color: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-20"
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="New Year Celebration"
          />
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold mb-6">
              <FaCrown className="mr-2" /> PREMIER NEW YEAR CELEBRATIONS
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-white to-cyan-300">
              NEW YEAR EVE
            </span>
          </h1>
          
          <div className="flex items-center justify-center mb-8">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current mx-1" />
            ))}
            <span className="ml-2 text-white text-xl font-semibold">4.8/5</span>
          </div>
          
          <p className="text-xl text-white/90 font-light mb-10 max-w-3xl leading-relaxed">
            Experience unforgettable New Year celebrations in the world's most spectacular cities
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-12 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FaUsers, value: "1M+", label: "Annual Celebration", color: "from-purple-500 to-pink-500" },
              { icon: FaFire, value: "500+", label: "Fireworks Shows", color: "from-amber-500 to-orange-500" },
              { icon: FaCity, value: "50+", label: "Global Cities", color: "from-blue-500 to-cyan-500" },
              { icon: FaClock, value: "24/7", label: "Non-Stop Parties", color: "from-emerald-500 to-teal-500" }
            ].map((stat, index) => (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-3 mb-1">{stat.value}</h3>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600">
                Year-End Celebrations
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Year-end celebrations bring a magical atmosphere and unparalleled joy to people around the world. 
              Multicolored lights, fireworks, and unique traditions make these days unforgettable. 
              To make this period even more special, <span className="font-semibold text-purple-600">Bani Travel</span> helps you choose the ideal destinations to visit. 
              From the majesty of <span className="font-semibold text-blue-600">New York</span> in the USA, the romance of <span className="font-semibold text-pink-600">Paris</span> in Europe, to the modernity of <span className="font-semibold text-amber-600">Dubai</span> in Asia, 
              these three major cities offer unforgettable experiences to celebrate the new year in the most beautiful way.
            </p>
          </div>

          <div className="mb-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Best Destinations for Spectacular New Year Celebrations</h3>
              <div className="flex items-center justify-center">
                <FaGlassCheers className="text-pink-500 mr-2" />
                <span className="text-gray-600">Choose your perfect celebration city</span>
              </div>
            </div>
          </div>

          {/* Destinations Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {destinations.map((city) => (
              <div
                key={city.id}
                className="relative group"
                onMouseEnter={() => city.setIsHovered(true)}
                onMouseLeave={() => city.setIsHovered(false)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-700 transform group-hover:scale-[1.02]">
                  {/* Image with Gradient */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={city.images[city.imageIndex]}
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    {/* Popular Badge */}
                    <div className="absolute top-4 left-4">
                      {city.popular && (
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <div className="absolute inset-0 bg-amber-500 rounded-full blur-md"></div>
                            <span className="relative flex items-center px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full text-xs">
                              <FaFire className="mr-2 animate-pulse" /> TRENDING
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Temperature Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-3 py-2 rounded-lg shadow-lg">
                        <div className="text-center">
                          <div className="text-lg font-bold">{city.temperature}</div>
                          <div className="text-xs opacity-90">{city.season}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{city.name}</h3>
                      <div className="flex items-center bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                        <FaStar className="text-yellow-400 mr-1 w-3 h-3" />
                        <span className="font-bold text-sm">{city.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-200 text-sm mb-3">{city.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {city.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium hover:bg-white/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <div className="flex items-center mb-1">
                        <FaMapMarkerAlt className="mr-2 text-cyan-300 w-3 h-3" />
                        <span className="font-semibold text-xs">Key Highlights:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {city.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-black/30 rounded text-xs"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center">
                      <button className="group flex-1 mr-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        <span className="flex items-center justify-center text-xs">
                          View Details
                          <FaShareAlt className="ml-2 group-hover:rotate-12 transition-transform w-3 h-3" />
                        </span>
                      </button>
                      <button className="group p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300">
                        <FaHeart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: FaMusic, title: "Live Music", color: "from-purple-500 to-pink-500" },
              { icon: FaGlassCheers, title: "Champagne Toast", color: "from-amber-500 to-orange-500" },
              { icon: FaCamera, title: "Photo Spots", color: "from-blue-500 to-cyan-500" },
              { icon: FaPalette, title: "Light Shows", color: "from-emerald-500 to-teal-500" }
            ].map((feature, index) => (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                <div className="relative bg-white p-4 rounded-xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 group-hover:-translate-y-1">
                  <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${feature.color} mb-2`}>
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600 text-xs">Premium celebration features</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-amber-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Ready for an Unforgettable New Year?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book your dream New Year celebration and get special early bird discounts!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group px-8 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <span className="flex items-center">
                BOOK NOW
                <FaCalendarAlt className="ml-3 group-hover:rotate-12 transition-transform" />
              </span>
            </button>
            <button className="group px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center">
                LEARN MORE
              </span>
            </button>
          </div>
          
          <div className="mt-8 text-white/80 text-sm">
            <p>📞 Contact us for special New Year packages</p>
            <p>⭐ Limited spots available for premium locations</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default FestateFundvitit;