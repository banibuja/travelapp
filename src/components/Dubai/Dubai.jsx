import React, { useEffect, useState } from 'react'
import Footer from '../layout/Footer';
import axios from 'axios';
import Table from '../Table';
import { FaMapMarkerAlt, FaStar, FaCalendarAlt, FaHeart, FaPlane } from 'react-icons/fa';

const Dubai = () => {
    const [roomPrices, setRoomPrices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/dubai-price')
            .then(response => {
                setRoomPrices(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the room prices:", error);
            });
    }, []);

    const stats = [
        { label: "Luxury Destinations", value: "50+", color: "from-blue-500 to-cyan-500" },
        { label: "Cultural Sites", value: "120+", color: "from-purple-500 to-pink-500" },
        { label: "Happy Travelers", value: "15K+", color: "from-amber-500 to-orange-500" },
        { label: "Year-round Sun", value: "365", color: "from-emerald-500 to-teal-500" }
    ];

    return (
        <>
            {/* Hero Section - Identike me EuropeCityBreak */}
            <section className="relative w-full h-[50vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
                
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                    <div className="mb-4">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
                            <FaPlane className="mr-2" /> DISCOVER THE EMIRATES
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-pink-300">
                            DUBAI & ABU DHABI
                        </span>
                    </h1>
                    
                    <div className="flex items-center justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current mx-1" />
                        ))}
                        <span className="ml-2 text-white text-lg font-semibold">5.0/5 Rating</span>
                    </div>
                    
                    <p className="text-lg text-white/90 font-light mb-6 max-w-2xl">
                        Experience futuristic luxury and rich Arabian heritage in one unforgettable journey
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    
                    {/* Description - Identike me EuropeCityBreak */}
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium mb-4">
                            <FaMapMarkerAlt className="mr-2" /> EMIRATES EXPERIENCE
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            This trip to Abu Dhabi and Dubai is a rich experience that offers a combination of culture, 
                            history, and modern luxury. Every moment will fill you with the magic of this magnificent 
                            region. Explore every hidden corner that holds a story or a pleasant surprise.
                        </p>
                    </div>

                    {/* Image Grid Style */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {[
                            { id: 1, name: 'Dubai Marina', img: "https://media.cnn.com/api/v1/images/stellar/prod/181218135609-dubai-beach-pexels.jpg", desc: "Stunning beaches and modern skylines" },
                            { id: 2, name: 'Sheikh Zayed Mosque', img: "https://www.savoredjourneys.com/wp-content/uploads/2015/08/abu-dhabi-city-guide-feature.jpg", desc: "A masterpiece of Islamic architecture" },
                            { id: 3, name: 'Burj Khalifa', img: "https://blog.sothebysrealty.ae/hs-fs/hubfs/Exploring%20the%20Wonders%20of%20Burj%20Khalifa-jpg.jpeg", desc: "Touching the clouds in the world's tallest tower" }
                        ].map((item) => (
                            <div key={item.id} className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                                <div className="relative h-64 overflow-hidden">
                                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={item.img} alt={item.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                                        <p className="text-gray-200 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pricing Table Section */}
                    <div className="mb-12 overflow-hidden rounded-2xl border border-gray-100 shadow-xl bg-white">
                        <table id="hotelPricesID" className="table-auto w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="px-6 py-4 text-left text-sm uppercase font-bold">Departure</th>
                                    <th className="px-6 py-4 text-left text-sm uppercase font-bold">Room Type</th>
                                    <th className="px-6 py-4 text-left text-sm uppercase font-bold">Service</th>
                                    <th className="px-6 py-4 text-left text-sm uppercase font-bold">Days</th>
                                    <th className="px-6 py-4 text-right text-sm uppercase font-bold">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomPrices.map((row, index) => (
                                    <tr key={index} className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? "bg-gray-50/30" : "bg-white"}`}>
                                        <td className="px-6 py-4 font-medium text-gray-800">{row.nisja}</td>
                                        <td className="px-6 py-4 text-gray-600">{row.tipi_dhomes}</td>
                                        <td className="px-6 py-4 text-gray-600">{row.sherbimi}</td>
                                        <td className="px-6 py-4 text-gray-600">{row.udhetimi}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-xl font-black text-blue-600">{row.cmimi}€</span>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold text-right">Per Person</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Stats Section - Identike me EuropeCityBreak */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="relative group">
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                                <div className="relative bg-white p-6 rounded-xl border border-gray-200 text-center hover:border-gray-300 transition-all duration-300">
                                    <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Table  
                        perfshihet={['Round-trip flight ticket', "Airport transfers", "Accommodation in Abu Dhabi & Dubai", "Bed & Breakfast", "Bus tours per Program", "Albanian speaking guide", "Local guides", "1 Backpack"]} 
                        nukPerfshihet={["Catamaran Trip - €42", "Fountain Dinner - €60", "Burj Khalifa Entry - €68", "Dubai Frame - €47", "Desert Safari - €60"]}
                    />
                </div>
            </section>

            {/* CTA Section - Identike me EuropeCityBreak */}
            <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready for Your Arabian Adventure?
                    </h2>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto font-light">
                        Book your premium Dubai getaway today and experience the magic of the Middle East
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button className="group px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                            <span className="flex items-center">
                                View Details <FaCalendarAlt className="ml-3 group-hover:rotate-12 transition-transform" />
                            </span>
                        </button>
                        <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                            <span className="flex items-center">
                                <FaHeart className="mr-3" /> Save to Favorites
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Dubai;