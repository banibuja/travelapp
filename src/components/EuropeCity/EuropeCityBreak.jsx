import React from 'react'
import Footer from '../layout/Footer';
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaCalendarAlt, FaHeart, FaPlane } from 'react-icons/fa';

const EuropeCityBreak = () => {
    const navigate = useNavigate();
    
    const places = [
        {
            id: 1,
            countryId: 6,
            countryName: 'France',
            description: 'Romantic Parisian streets and culinary delights',
            rating: 4.8,
            imageUrl: "https://www.focus-info.org/wp-content/uploads/2022/07/london-blog-1.jpg",
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            countryId: 7,
            countryName: 'Italy',
            description: 'Ancient history and Renaissance art',
            rating: 4.9,
            imageUrl: "https://www.state.gov/wp-content/uploads/2019/04/shutterstock_720444505v2-2208x1406-1.jpg",
            color: "from-purple-500 to-pink-500"
        },
        {
            id: 3,
            countryId: 8,
            countryName: 'Netherlands',
            description: 'Canals, tulips, and charming architecture',
            rating: 4.7,
            imageUrl: "https://www.internationalinsurance.com/wp-content/uploads/2024/03/Amsterdam-Netherlands-Channel.jpg",
            color: "from-amber-500 to-orange-500"
        },
        {
            id: 4,
            countryId: 9,
            countryName: 'Spain',
            description: 'Vibrant culture and sunny beaches',
            rating: 4.6,
            imageUrl: "https://media.timeout.com/images/106185654/750/562/image.jpg",
            color: "from-red-500 to-rose-500"
        },
        {
            id: 5,
            countryId: 10,
            countryName: 'Germany',
            description: 'Modern cities and fairytale castles',
            rating: 4.5,
            imageUrl: "https://usenotioncms.com/proxy-prod/block/8ebadf3d-ea97-424c-a5de-d8ab5b03c4d4/f8f9f4d3-d92f-4d34-91d4-0b9996c3a8ed/67d8e20a-283a-4013-8f51-2617e17dc51b/Untitled.png",
            color: "from-emerald-500 to-teal-500"
        },
        {
            id: 6,
            countryId: 11,
            countryName: 'United Kingdom',
            description: 'Royal heritage and modern sophistication',
            rating: 4.7,
            imageUrl: "https://www.focus-info.org/wp-content/uploads/2022/07/london-blog-1.jpg",
            color: "from-indigo-500 to-blue-500"
        }
    ];

    const handleSearch = (e) => {
        const queryParams = Object.entries({
            toId: e.target.id,
            toEmri: e.target.alt,
        });
        const queryString = new URLSearchParams(queryParams).toString();
        navigate(`/search?${queryString}`);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative w-full h-[50vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
                
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                    <div className="mb-4">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
                            <FaPlane className="mr-2" /> BEST EUROPEAN CITIES
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-pink-300">
                            EUROPE CITY BREAK
                        </span>
                    </h1>
                    
                    <div className="flex items-center justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current mx-1" />
                        ))}
                        <span className="ml-2 text-white text-lg font-semibold">4.7/5 Rating</span>
                    </div>
                    
                    <p className="text-lg text-white/90 font-light mb-6 max-w-2xl">
                        Perfect short getaways to discover Europe's most enchanting cities
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    {/* Description */}
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium mb-4">
                            <FaMapMarkerAlt className="mr-2" /> CITY BREAK EXPERIENCE
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            A city break is the ideal opportunity to escape from routine and discover the magic of a new city. 
                            It's the perfect time to walk without rush and explore every hidden corner that holds a story 
                            or a pleasant surprise. Stroll through cobblestone streets and stop at small cafes where the 
                            aroma of coffee invites you for a relaxing break. Visit small artisan shops and discover 
                            unique treasures that will remind you of this special experience.
                        </p>
                    </div>

                    {/* Countries Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {places.map((country) => (
                            <div
                                key={country.id}
                                className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                                onClick={() => navigate(`/search?toId=${country.countryId}&toEmri=${country.countryName}`)}
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        id={country.countryId}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        src={country.imageUrl}
                                        alt={country.countryName}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                    
                                    {/* Rating Badge */}
                                    <div className="absolute top-4 right-4 flex items-center bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                                        <FaStar className="text-yellow-400 mr-1" />
                                        <span className="text-white font-semibold text-sm">{country.rating}</span>
                                    </div>
                                    
                                    {/* Country Name */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-bold text-white mb-1">{country.countryName}</h3>
                                        <p className="text-gray-200 text-sm">{country.description}</p>
                                    </div>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full">
                                        <span className="flex items-center font-semibold text-gray-900">
                                            Explore {country.countryName}
                                            <FaMapMarkerAlt className="ml-2" />
                                        </span>
                                    </div>
                                </div>

                                {/* Color Border */}
                                <div className={`absolute inset-0 border-2 border-transparent group-hover:border-white/50 rounded-2xl transition-all duration-300 pointer-events-none`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: "European Cities", value: "50+", color: "from-blue-500 to-cyan-500" },
                            { label: "Cultural Sites", value: "200+", color: "from-purple-500 to-pink-500" },
                            { label: "Happy Travelers", value: "10K+", color: "from-amber-500 to-orange-500" },
                            { label: "Year-round", value: "365", color: "from-emerald-500 to-teal-500" }
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
            <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready for Your European Adventure?
                    </h2>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                        Book your perfect city break today and create unforgettable memories in Europe's most beautiful cities
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button className="group px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                            <span className="flex items-center">
                                View All Cities
                                <FaCalendarAlt className="ml-3 group-hover:rotate-12 transition-transform" />
                            </span>
                        </button>
                        <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                            <span className="flex items-center">
                                <FaHeart className="mr-3" />
                                Save Your Favorites
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default EuropeCityBreak;