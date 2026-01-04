import React, { useEffect, useState } from 'react';
import { FaStar, FaSwimmingPool, FaUtensils, FaSpa, FaWifi, FaBed, FaHotel, FaMountain } from 'react-icons/fa';
import axios from 'axios';
import Footer from '../layout/Footer';

const Maqedoni = () => {
  const [roomPrices, setRoomPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5001/api/maqedoni-price')
      .then(response => {
        setRoomPrices(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the room prices:", error);
        setIsLoading(false);
      });
  }, []);

  // CSS animations
  const animationStyles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    
    @keyframes gradient {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out;
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-gradient {
      animation: gradient 3s ease infinite;
      background-size: 200% 200%;
    }
    
    .animate-shimmer {
      background: linear-gradient(90deg, #f0f9ff 25%, #e0f2fe 50%, #f0f9ff 75%);
      background-size: 200% auto;
      animation: shimmer 3s infinite linear;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      
      {/* Hero Banner */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="grid grid-cols-2 h-full">
            <div className="relative overflow-hidden">
              <img
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                src="https://nasemavrovo.mk/wp-content/uploads/2020/12/dji_0473-2.jpg"
                alt="Macedonia Nature"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-transparent"></div>
            </div>
            <div className="relative overflow-hidden">
              <img
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                src="https://www.lachtal.eu/storage/gallery/0a/98cf94/original/p3160198.jpg"
                alt="Macedonia Hotel"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-purple-900/40 via-transparent to-transparent"></div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="animate-fade-in">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold mb-6">
              <FaStar className="mr-2" /> 5-STAR HOTEL
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-white to-cyan-300 bg-[length:200%_200%] animate-gradient">
              MACEDONIA
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 font-light mb-8 max-w-3xl">
            Unique experience in the heart of Macedonia's rich nature
          </p>
          
          <div className="flex items-center space-x-6">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="w-8 h-8 text-yellow-400 fill-current" />
            ))}
            <span className="text-white text-2xl font-semibold">4.9/5</span>
          </div>
        </div>
      </div>

      {/* Hotel Introduction */}
      <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="relative mb-12">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur-2xl opacity-10"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                      Mia's Favorite Hotel
                    </span>
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl">
                    An unforgettable experience in one of Macedonia's most luxurious hotels, 
                    surrounded by stunning landscapes and excellent services.
                  </p>
                </div>
                <a 
                  href="#hotelPricesID" 
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-2xl hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-amber-500/30"
                >
                  View Prices
                  <svg className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Hotel Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: FaSwimmingPool, title: "Infinity Pool", color: "from-blue-500 to-cyan-500" },
              { icon: FaSpa, title: "Spa & Wellness", color: "from-purple-500 to-pink-500" },
              { icon: FaUtensils, title: "Fine Dining Restaurant", color: "from-amber-500 to-orange-500" },
              { icon: FaWifi, title: "Ultra Fast Wi-Fi", color: "from-emerald-500 to-teal-500" }
            ].map((feature, index) => (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 group-hover:-translate-y-2">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Hotel Gallery */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="group relative overflow-hidden rounded-2xl shadow-xl lg:col-span-2">
                <div className="relative h-96 overflow-hidden">
                  <img
                    src="https://cf.bstatic.com/xdata/images/hotel/max500/344781321.jpg?k=dc4ebebb2e1a11f8d6992af3267ae218102baae6846b064f27c3a44ee8a5d946&o="
                    alt="Main Hotel Room"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <div className="flex items-center space-x-2">
                      <FaHotel className="w-8 h-8 text-white" />
                      <span className="text-white text-2xl font-bold">Main Room</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  "https://afar.brightspotcdn.com/dims4/default/2e3942f/2147483647/strip/true/crop/1143x763+0+0/resize/1440x961!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fd0%2F02%2F1e98e7f7f7f8aa4f4b08201d3b76%2Foriginal-st-trop-alp-spa-7.jpg",
                  "https://miasfavorite.com/wp-content/uploads/2021/04/10.jpg",
                  "https://hospitality-school.com/wp-content/uploads/2016/03/buffet-service-style.jpg",
                  "https://miasfavorite.com/wp-content/uploads/2024/10/restaurant_outdoor_MFH.jpg"
                ].map((src, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={src}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price Table Section */}
          <div id="hotelPricesID" className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-10"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-2xl">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                    Room Prices
                  </span>
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Choose the perfect package for your stay at Mia's Favorite Hotel
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">Loading...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                        <th className="py-4 px-6 text-left text-lg font-semibold rounded-tl-xl">
                          <div className="flex items-center space-x-2">
                            <FaBed className="w-5 h-5" />
                            <span>Room Type</span>
                          </div>
                        </th>
                        <th className="py-4 px-6 text-left text-lg font-semibold">
                          <div className="flex items-center space-x-2">
                            <FaUtensils className="w-5 h-5" />
                            <span>Service</span>
                          </div>
                        </th>
                        <th className="py-4 px-6 text-left text-lg font-semibold">
                          <div className="flex items-center space-x-2">
                            <FaStar className="w-5 h-5" />
                            <span>During Season</span>
                          </div>
                        </th>
                        <th className="py-4 px-6 text-left text-lg font-semibold rounded-tr-xl">
                          <div className="flex items-center space-x-2">
                            <FaMountain className="w-5 h-5" />
                            <span>Off Season</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {roomPrices.map((price, index) => (
                        <tr 
                          key={price.id} 
                          className={`border-b border-gray-100 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }`}
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100">
                                <FaBed className="w-5 h-5 text-blue-500" />
                              </div>
                              <span className="font-semibold text-gray-800">{price.lloji_dhomes}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg text-gray-700">
                              {price.sherbimi}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="relative inline-block">
                              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg blur opacity-20"></div>
                              <div className="relative px-4 py-2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                                <span className="text-lg font-bold text-amber-700">
                                  €{price.gjat_sezones}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="relative inline-block">
                              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-20"></div>
                              <div className="relative px-4 py-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                                <span className="text-lg font-bold text-blue-700">
                                  €{price.jasht_sezones}
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Table Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-gray-600">
                    *All prices are per person and include VAT
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">Contact:</span>
                    <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for Your Macedonian Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Book now and get 15% discount on early bookings!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group px-8 py-3 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <span className="flex items-center">
                BOOK ONLINE
                <svg className="ml-3 group-hover:rotate-12 transition-transform" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            <button className="group px-8 py-3 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center">
                CONTACT US
                <svg className="ml-3 group-hover:scale-110 transition-transform" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Maqedoni;