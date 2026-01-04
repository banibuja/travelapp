import React, { useState, useEffect } from 'react';
import Footer from '../layout/Footer';
import { FaSnowflake, FaSkiing, FaMountain, FaHotel, FaStar, FaCalendarAlt, FaCheckCircle, FaUtensils, FaTemperatureLow, FaRegSnowflake, FaFire } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from '../../axiosInstance';

function Bullgari() {
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axiosInstance.get('/bullgari/images', {
                    withCredentials: true,
                });
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
                setMessage('There was an error fetching the images.');
            }
        };

        fetchImages();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        fade: true,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        pauseOnHover: true,
        appendDots: (dots) => (
            <div style={{ position: 'absolute', bottom: '32px', width: '100%' }}>
                <ul style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    padding: 0, 
                    margin: 0,
                    gap: '8px'
                }}>{dots}</ul>
            </div>
        ),
        customPaging: () => (
            <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
            }}></div>
        )
    };

    // Generate snowflakes with simple styling
    const Snowflakes = () => {
        return (
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div 
                        key={i}
                        className="absolute text-blue-300"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            fontSize: `${10 + Math.random() * 15}px`,
                            opacity: 0.3 + Math.random() * 0.4,
                            animation: `fall ${3 + Math.random() * 7}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    >
                        ❄
                    </div>
                ))}
            </div>
        );
    };

    // Simplified CSS
    const customStyles = `
        @keyframes fall {
            from {
                transform: translateY(-100px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }
        
        @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        
        .animate-shimmer {
            background: linear-gradient(90deg, #f0f9ff 25%, #e0f2fe 50%, #f0f9ff 75%);
            background-size: 200% auto;
            animation: shimmer 3s infinite linear;
        }
        
        .slick-dots li button:before {
            display: none;
        }
        
        .slick-dots li.slick-active div {
            background-color: rgba(255, 255, 255, 1);
        }
    `;

    return (
        <>
            <style>{customStyles}</style>
            <Snowflakes />
            
            {/* Hero Section */}
            <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-cyan-50 pt-16">
                {/* Floating elements */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-cyan-300/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-tr from-indigo-200/20 to-blue-300/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-2xl blur-xl opacity-20"></div>
                            <div className="relative bg-white/80 backdrop-blur-sm px-8 py-6 rounded-xl border border-white/40 shadow-2xl">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center space-x-4 mb-3">
                                        <FaMountain className="w-10 h-10 text-blue-600" />
                                        <FaSnowflake className="w-10 h-10 text-cyan-500" />
                                        <FaSkiing className="w-10 h-10 text-indigo-600" />
                                    </div>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-3">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
                                            BANSKO | BULGARIA
                                        </span>
                                    </h1>
                                    <div className="flex items-center space-x-3">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                                        ))}
                                        <span className="text-lg font-semibold text-gray-700">4.8/5 Rating</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Card */}
                    <div className="max-w-4xl mx-auto mt-12 px-4">
                        <div className="relative">
                            <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-xl">
                                <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
                                    Experience the skiing adventure in Bulgaria, one of the most popular destinations in Europe for skiing! 
                                    With its stunning landscapes and excellent ski slopes, Bulgaria offers endless opportunities for 
                                    everyone who wants to spend an unforgettable weekend in the mountains.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center mt-6 space-y-4 sm:space-y-0 sm:space-x-6">
                                    <div className="flex items-center space-x-2">
                                        <FaTemperatureLow className="w-5 h-5 text-blue-500" />
                                        <span className="text-gray-700 font-semibold">-5°C / -10°C</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaRegSnowflake className="w-5 h-5 text-cyan-500" />
                                        <span className="text-gray-700 font-semibold">30-50cm snow</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaFire className="w-5 h-5 text-orange-500" />
                                        <span className="text-gray-700 font-semibold">Peak Season</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Slider */}
                    <div className="max-w-6xl mx-auto mt-12 px-4">
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                {images.length > 0 ? (
                                    <div className="relative">
                                        <Slider {...settings}>
                                            {images.map((image) => (
                                                <div key={image.id} className="relative">
                                                    <div className="relative h-[500px]">
                                                        <img
                                                            className="w-full h-full object-cover"
                                                            src={`data:image/png;base64,${image.imageBase64}`}
                                                            alt={image.title || 'Bansko Image'}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                ) : (
                                    <div className="w-full h-[500px] bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center rounded-2xl">
                                        <div className="text-center">
                                            <FaSnowflake className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-spin" />
                                            <p className="text-gray-600 text-lg">Loading images...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hotel Information Section */}
            <div className="relative py-16 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hotel Card */}
                    <div className="relative mb-12">
                        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 p-1 rounded-2xl">
                            <div className="bg-white rounded-xl p-8">
                                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                                    <div className="flex items-center space-x-4 mb-6 md:mb-0">
                                        <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                                            <FaHotel className="w-10 h-10 text-blue-600" />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl md:text-4xl font-bold">
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                                                    Hotel Lion Bansko
                                                </span>
                                            </h1>
                                            <div className="flex items-center space-x-2 mt-2">
                                                {[...Array(4)].map((_, i) => (
                                                    <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                                                ))}
                                                <span className="text-gray-600 font-semibold">4 Star Hotel</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <FaCheckCircle className="w-6 h-6 text-green-500" />
                                        <span className="text-lg font-semibold text-gray-700">Book Online</span>
                                    </div>
                                </div>
                                
                                <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center max-w-4xl mx-auto">
                                    Welcome to Hotel Lion Bansko, an ideal destination for those seeking an unforgettable experience 
                                    in the heart of nature. Located in one of the most popular ski and tourist resorts in Bulgaria, 
                                    the hotel offers comfort and excellent service for every visitor.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hotel Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Left Column */}
                        <div className="relative">
                            <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-xl">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <FaCalendarAlt className="mr-3 text-blue-500" />
                                    Hotel Details
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Category', value: '4 stars', icon: FaStar },
                                        { label: 'Accommodation', value: '4, 5, 6, 7 days', icon: FaHotel },
                                        { label: 'Service', value: 'Half Board', icon: FaUtensils },
                                        { label: 'Destination', value: 'Bulgaria', icon: FaMountain },
                                        { label: 'Not Included', value: 'Tourist taxes', icon: FaCheckCircle }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                                            <div className="flex items-center">
                                                <item.icon className="w-5 h-5 text-blue-500 mr-3" />
                                                <span className="font-medium text-gray-700">{item.label}</span>
                                            </div>
                                            <span className="font-semibold text-blue-600">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="relative">
                            <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 shadow-xl">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <FaSnowflake className="mr-3 text-indigo-500" />
                                    December 01-13
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    First ski season with special offers and excellent snow conditions.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { title: 'Temperature', value: '-5°C to -10°C', color: 'from-blue-100 to-cyan-100' },
                                        { title: 'Snow Depth', value: '30-50 cm', color: 'from-indigo-100 to-purple-100' },
                                        { title: 'Piste Condition', value: 'Excellent', color: 'from-emerald-100 to-teal-100' }
                                    ].map((item, index) => (
                                        <div key={index} className={`p-4 rounded-xl bg-gradient-to-r ${item.color} border border-white`}>
                                            <div className="text-sm text-gray-500">{item.title}</div>
                                            <div className="text-xl font-bold text-gray-800">{item.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ski Packages */}
                    <div className="space-y-12">
                        {[
                            {
                                title: "Ski Pass, Skis and Poles",
                                subtitle: "Adult",
                                packages: [
                                    { days: "4 days/ 3 days Skiing", price: "€ 400" },
                                    { days: "5 days/ 4 days Skiing", price: "€ 518" },
                                    { days: "7 days/ 6 days Skiing", price: "€ 676" }
                                ],
                                color: "blue"
                            },
                            {
                                title: "Ski Pass, Skis, Poles and Ski Boots",
                                subtitle: "Adult",
                                packages: [
                                    { days: "4 days/ 3 days Skiing", price: "€ 422" },
                                    { days: "5 days/ 4 days Skiing", price: "€ 543" },
                                    { days: "7 days/ 6 days Skiing", price: "€ 698" }
                                ],
                                color: "cyan"
                            },
                            {
                                title: "Big Ski Pass and Skis",
                                subtitle: "Adult",
                                packages: [
                                    { days: "4 days/ 3 days Skiing", price: "€ 517" },
                                    { days: "5 days/ 4 days Skiing", price: "€ 662" },
                                    { days: "7 days/ 6 days Skiing", price: "€ 859" }
                                ],
                                color: "indigo"
                            }
                        ].map((packageGroup, groupIndex) => (
                            <div key={groupIndex} className="relative">
                                <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-xl">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                                <FaSkiing className={`mr-3 text-${packageGroup.color}-500`} />
                                                {packageGroup.title}
                                            </h3>
                                            <p className="text-lg text-gray-600 mt-2">{packageGroup.subtitle}</p>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                                                <FaSnowflake className="w-8 h-8 text-blue-500" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {packageGroup.packages.map((pkg, index) => (
                                            <div key={index} className="relative">
                                                <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                                                    <div className="text-center">
                                                        <div className="text-lg font-semibold text-gray-700 mb-3">{pkg.days}</div>
                                                        <div className="text-3xl font-bold text-blue-600">
                                                            {pkg.price}
                                                        </div>
                                                        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md">
                                                            Book Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready for Your Ski Adventure?
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Book your package now and get 10% discount on early bookings!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <button className="px-8 py-3 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl flex items-center">
                            BOOK ONLINE
                            <FaCalendarAlt className="ml-3" />
                        </button>
                        <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center">
                            <FaSkiing className="mr-3" />
                            VIEW PACKAGES
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Bullgari;