import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaStar, 
  FaSwimmingPool, 
  FaWifi, 
  FaCar, 
  FaUmbrellaBeach, 
  FaUtensils,
  FaSpa,
  FaBed,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCrown,
  FaFire,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
  FaMoneyBillWave,
  FaHeart,
  FaShareAlt,
  FaWhatsapp,
  FaHotel
} from 'react-icons/fa';
import Footer from '../layout/Footer';
import Table from '../Table';
import axiosInstance from '../../axiosInstance';

function Turqi() {
  const navigate = useNavigate();
  const [roomPrices, setRoomPrices] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [turkeyCountryId, setTurkeyCountryId] = useState(null);

  // Sample data for demonstration
  const cities = [
    {
      id: 1,
      name: "Antalya",
      description: "Mediterranean coastline with golden beaches",
      image: "https://images.ctfassets.net/pzootm7d2s0g/1kARR2mbPE3LiFAeV2OYmi/266c1d6d9df5156aec01a75a10983be6/antlya_teaser.jpg",
      rating: 4.8,
      tags: ["Beach", "Spa", "History"],
      popular: true,
      temperature: "28°C",
      season: "High Season",
      highlights: ["Kaleiçi", "Düden Waterfalls", "Konyaaltı Beach"]
    },
    {
      id: 2,
      name: "Bodrum",
      description: "Nightlife and luxurious beaches",
      image: "https://images.ctfassets.net/pzootm7d2s0g/1IKyu5EnQgbdTTvJo7FEh0/0b2a5680302f64d3ce895807fb0ef9d8/bodrum_teasser.jpg",
      rating: 4.6,
      tags: ["Nightlife", "Luxury", "Beach"],
      popular: false,
      temperature: "26°C",
      season: "Good Season",
      highlights: ["Bodrum Castle", "Gümüşlük", "Bodrum Marina"]
    },
    {
      id: 3,
      name: "Istanbul",
      description: "Historic capital with rich culture",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      rating: 4.9,
      tags: ["History", "Culture", "Shopping"],
      popular: true,
      temperature: "22°C",
      season: "Year-round",
      highlights: ["Hagia Sophia", "Grand Bazaar", "Bosporus"]
    }
  ];

  useEffect(() => {
    const fetchRoomPrices = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/room-price');
        setRoomPrices(response.data);
      } catch (error) {
        console.error('Error fetching room prices:', error);
        setMessage('An error occurred while fetching prices.');
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch Turkey country ID
    const fetchTurkeyCountryId = async () => {
      try {
        const response = await axiosInstance.get('/shtetet');
        const turkey = response.data.find(country => 
          country.emri && (country.emri.toLowerCase().includes('turkey') || 
          country.emri.toLowerCase().includes('turqi'))
        );
        if (turkey) {
          setTurkeyCountryId(turkey.id);
        }
      } catch (error) {
        console.error('Error fetching country ID:', error);
      }
    };

    fetchRoomPrices();
    fetchTurkeyCountryId();
  }, []);

  // Animation styles as inline objects
  const animationStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }
    
    @keyframes floatDelayed {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-15px);
      }
    }
    
    @keyframes floatSlow {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    @keyframes gradient {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }
    
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    @keyframes scroll {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      100% {
        transform: translateY(10px);
        opacity: 0;
      }
    }
    
    @keyframes zoom {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.1);
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out;
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-float-delayed {
      animation: floatDelayed 7s ease-in-out infinite;
      animation-delay: 1s;
    }
    
    .animate-float-slow {
      animation: floatSlow 8s ease-in-out infinite;
    }
    
    .animate-gradient {
      animation: gradient 3s ease infinite;
      background-size: 200% 200%;
    }
    
    .animate-bounce {
      animation: bounce 2s infinite;
    }
    
    .animate-scroll {
      animation: scroll 2s infinite;
    }
    
    .animate-zoom {
      animation: zoom 20s linear infinite;
    }
    
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      
      {/* Hero Section with Parallax */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover transform scale-110 animate-zoom"
            src="https://images.ctfassets.net/pzootm7d2s0g/6r3BuT5jsh89EFRo3cJynZ/640af9075c991e2959a70d0290aba7ef/turqi.jpg"
            alt="Turkey Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-emerald-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black/20_40%,_black/60_100%)]"></div>
        </div>
        
        {/* Animated Floating Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-pink-400/20 to-rose-500/20 rounded-full blur-lg animate-float-slow"></div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold mb-6">
              <FaCrown className="mr-2" /> #1 DESTINATION IN THE BALKANS
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-white to-cyan-300 bg-[length:200%_200%] animate-gradient">
              TURKEY
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-white text-xl font-semibold">4.8/5</span>
            </div>
            <div className="hidden sm:block w-1 h-8 bg-white/30 rounded"></div>
            <div className="text-white text-xl">
              <FaUserFriends className="inline mr-2" />
              10,000+ Satisfied Customers
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 font-light mb-10 max-w-3xl leading-relaxed px-4">
            Discover the beauty of Turkey with our exclusive vacation packages
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 px-4">
            <button 
              onClick={() => {
                if (turkeyCountryId) {
                  navigate(`/search?toId=${turkeyCountryId}&toEmri=Turkey`);
                } else {
                  navigate('/search?toEmri=Turkey');
                }
              }}
              className="group px-8 sm:px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-2xl hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-amber-500/30"
            >
              <span className="flex items-center justify-center">
                BOOK NOW
                <FaCalendarAlt className="ml-3 group-hover:rotate-12 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => {
                if (turkeyCountryId) {
                  navigate(`/search?toId=${turkeyCountryId}&toEmri=Turkey`);
                } else {
                  navigate('/search?toEmri=Turkey');
                }
              }}
              className="group px-8 sm:px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-2xl hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/30"
            >
              <span className="flex items-center justify-center">
                VIEW PACKAGES
                <FaMoneyBillWave className="ml-3 group-hover:scale-110 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100" height="100" viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <path d="M0,0 L100,0 L100,100" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="2"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: FaUserFriends, value: "50,000+", label: "Annual Tourists", color: "from-blue-500 to-cyan-500" },
              { icon: FaHotel, value: "200+", label: "Hotels", color: "from-purple-500 to-pink-500" },
              { icon: FaStar, value: "4.8/5", label: "Rating", color: "from-amber-500 to-orange-500" },
              { icon: FaCalendarAlt, value: "365", label: "Days a Year", color: "from-emerald-500 to-teal-500" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredCard(`stat-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl md:rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 group-hover:scale-105">
                  <div className={`inline-flex p-3 md:p-4 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mt-4 md:mt-6 mb-2">{stat.value}</h3>
                  <p className="text-gray-300 font-medium text-sm md:text-base">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Gallery Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 md:mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Choose Your City
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Explore the most beautiful destinations in Turkey with exclusive offers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-20">
            {cities.map((city, index) => (
              <div
                key={city.id}
                className="relative group"
                onMouseEnter={() => setSelectedCity(city.id)}
                onMouseLeave={() => setSelectedCity(null)}
              >
                {/* Card Container */}
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl transition-all duration-700 transform group-hover:scale-[1.02]">
                  {/* Image with Gradient */}
                  <div className="relative h-64 md:h-96 overflow-hidden">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 mix-blend-overlay"></div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-4 md:top-6 left-4 md:left-6">
                      {city.popular && (
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <div className="absolute inset-0 bg-amber-500 rounded-full blur-md"></div>
                            <span className="relative flex items-center px-3 md:px-4 py-1 md:py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full text-xs md:text-sm">
                              <FaFire className="mr-2 animate-pulse" /> POPULAR
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Temperature Badge */}
                    <div className="absolute top-4 md:top-6 right-4 md:right-6">
                      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl shadow-lg">
                        <div className="text-center">
                          <div className="text-lg md:text-2xl font-bold">{city.temperature}</div>
                          <div className="text-xs opacity-90">{city.season}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
                    <div className="flex justify-between items-start mb-3 md:mb-4">
                      <h3 className="text-xl md:text-3xl font-bold">{city.name}</h3>
                      <div className="flex items-center bg-black/40 backdrop-blur-sm px-2 md:px-3 py-1 md:py-2 rounded-full">
                        <FaStar className="text-yellow-400 mr-1 md:mr-2 w-3 h-3 md:w-4 md:h-4" />
                        <span className="font-bold text-sm md:text-base">{city.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-200 text-sm md:text-base mb-4 md:mb-6">{city.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                      {city.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 md:px-4 py-1 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium hover:bg-white/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="mb-6 md:mb-8">
                      <div className="flex items-center mb-2 md:mb-3">
                        <FaMapMarkerAlt className="mr-2 text-cyan-300 w-3 h-3 md:w-4 md:h-4" />
                        <span className="font-semibold text-sm md:text-base">Key Highlights:</span>
                      </div>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {city.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-2 md:px-3 py-0.5 md:py-1 bg-black/30 rounded text-xs md:text-sm"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center">
                      <button className="group flex-1 mr-2 md:mr-3 px-3 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg md:rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        <span className="flex items-center justify-center text-xs md:text-sm">
                          View Details
                          <FaShareAlt className="ml-2 group-hover:rotate-12 transition-transform w-3 h-3 md:w-4 md:h-4" />
                        </span>
                      </button>
                      <button className="group p-2 md:p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg md:rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300">
                        <FaHeart className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl md:rounded-3xl transition-all duration-500 pointer-events-none"></div>
                </div>

                {/* 3D Shadow Effect */}
                <div className="absolute -bottom-2 md:-bottom-4 -left-2 md:-left-4 -right-2 md:-right-4 h-2 md:h-4 bg-gradient-to-t from-gray-900/30 to-transparent blur-xl rounded-b-2xl md:rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: FaSwimmingPool, title: "Infinity Pool", color: "from-blue-500 to-cyan-500" },
              { icon: FaSpa, title: "Spa & Wellness", color: "from-purple-500 to-pink-500" },
              { icon: FaUtensils, title: "Fine Dining Restaurants", color: "from-amber-500 to-orange-500" },
              { icon: FaShieldAlt, title: "24/7 Security", color: "from-emerald-500 to-teal-500" }
            ].map((feature, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl md:rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                <div className="relative bg-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-300 group-hover:-translate-y-2">
                  <div className={`inline-flex p-2 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br ${feature.color} mb-3 md:mb-6`}>
                    <feature.icon className="w-5 h-5 md:w-8 md:h-8 text-white" />
                  </div>
                  <h4 className="text-base md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-xs md:text-sm">Premium services in all our hotels</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Table Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Packages & Prices
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Choose the perfect package for your vacation in Turkey
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12 md:py-20">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-semibold">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Table Container */}
              <div className="relative bg-gray-800/30 backdrop-blur-lg rounded-2xl md:rounded-3xl overflow-hidden border border-gray-700/50 shadow-xl md:shadow-2xl">
                {/* Table Header */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
                  <div className="relative px-4 md:px-8 py-4 md:py-6 border-b border-gray-700/50">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">Room Prices</h3>
                        <p className="text-gray-300 text-sm md:text-base">Season 2024</p>
                      </div>
                      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                        <div className="flex items-center">
                          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                          <span className="text-gray-300 text-sm md:text-base">Available</span>
                        </div>
                        <button className="px-4 md:px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105">
                          <span className="flex items-center text-sm md:text-base">
                            <FaCalendarAlt className="mr-2" />
                            Book Now
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px] md:min-w-0">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-800 to-gray-900">
                        <th className="px-4 md:px-8 py-4 md:py-6 text-left">
                          <div className="flex items-center space-x-2 md:space-x-3">
                            <div className="p-1 md:p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                              <FaBed className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-base md:text-lg font-bold text-white">Room Type</div>
                              <div className="text-xs md:text-sm text-gray-400">Choose category</div>
                            </div>
                          </div>
                        </th>
                        <th className="px-4 md:px-8 py-4 md:py-6 text-left">
                          <div className="flex items-center space-x-2 md:space-x-3">
                            <div className="p-1 md:p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                              <FaCheckCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-base md:text-lg font-bold text-white">Services</div>
                              <div className="text-xs md:text-sm text-gray-400">Included in price</div>
                            </div>
                          </div>
                        </th>
                        <th className="px-4 md:px-8 py-4 md:py-6 text-center">
                          <div className="flex flex-col items-center">
                            <div className="p-1 md:p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 mb-1 md:mb-2">
                              <FaMoneyBillWave className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                            <div className="text-base md:text-lg font-bold text-white">Price 1</div>
                            <div className="text-xs md:text-sm text-green-400">Special Offer</div>
                          </div>
                        </th>
                        <th className="px-4 md:px-8 py-4 md:py-6 text-center">
                          <div className="flex flex-col items-center">
                            <div className="p-1 md:p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 mb-1 md:mb-2">
                              <FaClock className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                            <div className="text-base md:text-lg font-bold text-white">Price 2</div>
                            <div className="text-xs md:text-sm text-blue-400">Flexible</div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {roomPrices.length > 0 ? roomPrices.map((room, index) => (
                        <tr
                          key={index}
                          className={`border-b border-gray-700/30 transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-800/30 group ${
                            index % 2 === 0 ? 'bg-gray-800/10' : 'bg-gray-900/10'
                          }`}
                        >
                          <td className="px-4 md:px-8 py-4 md:py-6">
                            <div className="flex items-center space-x-2 md:space-x-4">
                              <div className="relative">
                                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                                  <FaBed className="w-4 h-4 md:w-6 md:h-6 text-blue-400" />
                                </div>
                              </div>
                              <div>
                                <div className="text-base md:text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                                  {room.room_type}
                                </div>
                                <div className="text-xs md:text-sm text-gray-400">Capacity: 2-4 persons</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 md:px-8 py-4 md:py-6">
                            <div className="flex items-center flex-wrap gap-1 md:gap-2">
                              {room.service && typeof room.service === 'string' ? room.service.split(',').map((service, i) => (
                                <span
                                  key={i}
                                  className="px-2 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-gray-700 to-gray-800 rounded text-xs md:text-sm text-gray-300 font-medium border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300"
                                >
                                  {service.trim()}
                                </span>
                              )) : (
                                <span className="text-gray-400 text-sm">No services specified</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 md:px-8 py-4 md:py-6 text-center">
                            <div className="relative inline-block group/price">
                              <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg md:rounded-xl blur opacity-20 group-hover/price:opacity-30 transition-opacity duration-300"></div>
                              <div className="relative px-4 md:px-8 py-3 md:py-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg md:rounded-xl border border-amber-500/20">
                                <div className="text-lg md:text-2xl font-bold text-white">
                                  {room.price_1 || 'N/A'}
                                </div>
                                <div className="text-xs md:text-sm text-amber-400 font-semibold mt-0.5 md:mt-1">
                                  24% Discount
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 md:px-8 py-4 md:py-6 text-center">
                            <div className="relative inline-block group/price2">
                              <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg md:rounded-xl blur opacity-20 group-hover/price2:opacity-30 transition-opacity duration-300"></div>
                              <div className="relative px-4 md:px-8 py-3 md:py-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg md:rounded-xl border border-emerald-500/20">
                                <div className="text-lg md:text-2xl font-bold text-white">
                                  {room.price_2 || 'N/A'}
                                </div>
                                <div className="text-xs md:text-sm text-emerald-400 font-semibold mt-0.5 md:mt-1">
                                  Flexible
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="px-4 md:px-8 py-8 md:py-12 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mb-3 md:mb-4">
                                <FaTimesCircle className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                              </div>
                              <div className="text-base md:text-xl text-gray-400">No data available</div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer */}
                <div className="px-4 md:px-8 py-4 md:py-6 border-t border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse mr-2"></div>
                        <span className="text-gray-300 text-sm md:text-base">Offer available</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500 animate-pulse mr-2"></div>
                        <span className="text-gray-300 text-sm md:text-base">Requires confirmation</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <button className="px-4 md:px-8 py-2 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg md:rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        <span className="flex items-center justify-center font-bold text-sm md:text-base">
                          <FaCalendarAlt className="mr-2" />
                          CONTACT US
                        </span>
                      </button>
                      <button className="px-4 md:px-8 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg md:rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        <span className="flex items-center justify-center font-bold text-sm md:text-base">
                          <FaWhatsapp className="mr-2" />
                          WHATSAPP
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-5 -left-5 md:-top-10 md:-left-10 w-20 h-20 md:w-40 md:h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl md:blur-3xl"></div>
              <div className="absolute -bottom-5 -right-5 md:-bottom-10 md:-right-10 w-30 h-30 md:w-60 md:h-60 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-2xl md:blur-3xl"></div>
            </div>
          )}
        </div>
      </section>

      {/* Additional Table Component */}
      <section className="py-8 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <Table  
            perfshihet={['Accommodation', "Breakfast", "Spa center", "Pool", "Aqua Park", "Parking", "WI-FI"]} 
            nukPerfshihet={["Transfer", "Additional services"]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6">
            Ready for Your Turkey Adventure?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto">
            Book now and get 15% discount on early bookings!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group px-8 md:px-12 py-3 md:py-4 bg-white text-blue-600 font-bold text-lg md:text-xl rounded-xl md:rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <span className="flex items-center">
                BOOK ONLINE
                <FaCalendarAlt className="ml-3 group-hover:rotate-12 transition-transform" />
              </span>
            </button>
            <button className="group px-8 md:px-12 py-3 md:py-4 bg-transparent border-2 border-white text-white font-bold text-lg md:text-xl rounded-xl md:rounded-2xl hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center">
                <FaWhatsapp className="mr-3 group-hover:scale-110 transition-transform" />
                CONTACT US
              </span>
            </button>
          </div>
          
          <div className="mt-8 md:mt-12 text-white/80 text-sm md:text-base">
            <p>📞 Phone: +355 4X XXX XXXX</p>
            <p>✉️ Email: info@turkeytravel.al</p>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
}

export default Turqi;