import React from 'react'
import Footer from '../layout/Footer';
import Carousel from '../carousel.component';
import { FaMapMarkerAlt, FaStar, FaGlobe, FaPlane, FaHistory } from 'react-icons/fa';

const VisitKosova = () => {
  let slides = [
    "https://www.wanderlustingk.com/wp-content/uploads/2017/10/kosovo-221161016111_orig.jpg",
    "https://funkytours.com/wp-content/uploads/2022/01/pristina-national-library-1.jpg",
    "https://www.skyscrapercity.com/cdn-cgi/image/format=auto,onerror=redirect,width=1920,height=1920,fit=scale-down/https://www.skyscrapercity.com/attachments/fb_img_1625690180946-jpg.1750315/",
    "https://www.kosovo-vacations.com/ressourcen/images/mother-teresa-cathedral.jpg",
  ];

  return (
    <>
      {/* Hero Section - Identike me ngjyrat e EuropeCityBreak */}
      <section className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
              <FaGlobe className="mr-2" /> DISCOVER THE BALKANS
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-pink-300">
              VISIT KOSOVA
            </span>
          </h1>
          
          <div className="flex items-center justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current mx-1" />
            ))}
            <span className="ml-2 text-white text-lg font-semibold tracking-wide underline decoration-pink-500">4.9/5 Rating</span>
          </div>
          
          <p className="text-lg text-white/90 font-light max-w-2xl italic">
            "Europe's youngest heart with an ancient soul"
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Featured Carousel */}
          <div className="mb-24 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white group">
            <Carousel slides={slides} />
          </div>

          {/* Museum Experience */}
          <div className="max-w-5xl mx-auto space-y-32">
            
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm uppercase tracking-widest mb-6 shadow-lg">
                <FaHistory className="mr-2" /> National Museum of Kosovo
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">A Journey Through Time</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto rounded-full"></div>
            </div>

            {/* Row 1 - Building */}
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Austro-Hungarian Heritage</h3>
                <p className="text-xl text-gray-600 leading-relaxed italic">
                  Founded in <span className="font-bold text-gray-900">1949</span>, the building itself is a masterpiece 
                  from 1885. Its unique architecture brings a touch of Vienna to the heart of Prishtina.
                </p>
              </div>
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-blue-500 rounded-3xl rotate-3 scale-105 opacity-10 group-hover:rotate-0 transition-transform duration-500"></div>
                <img src="https://www.viaggidimatt.com/wp-content/uploads/2022/07/IMG_2445-scaled.jpeg" 
                     className="relative rounded-3xl shadow-2xl h-80 w-full object-cover z-10" alt="Museum" />
              </div>
            </div>

            {/* Row 2 - THE GODDESS (ME LINKUN TËND) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">Goddess on a Throne</h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  The museum's most precious treasure is the <span className="font-bold text-pink-600">"Goddess on a Throne"</span>. 
                  Dating back to <span className="underline decoration-purple-400">3500 B.C.</span>, this Neolithic terracotta 
                  sculpture is the ultimate symbol of Kosovo's history.
                </p>
              </div>
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-purple-500 rounded-3xl -rotate-3 scale-105 opacity-10 group-hover:rotate-0 transition-transform duration-500"></div>
                {/* LINKU JUAJ I VENDOSUR KËTU */}
                <img src="https://funkytours.com/wp-content/uploads/2022/01/pristina-national-library-1.jpg" 
                     className="relative rounded-3xl shadow-2xl h-[450px] w-full object-cover z-10 border-4 border-white" alt="Goddess on a Throne" />
              </div>
            </div>

            {/* Row 3 - Resilience */}
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">Preserving Identity</h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Through decades of challenges, the National Museum has remained a bastion of identity, 
                  recovering lost artifacts and telling the story of resilience to every visitor.
                </p>
              </div>
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-pink-500 rounded-3xl rotate-2 scale-105 opacity-10 group-hover:rotate-0 transition-transform duration-500"></div>
                <img src="https://www.viaggidimatt.com/wp-content/uploads/2022/07/IMG_2449-scaled.jpeg" 
                     className="relative rounded-3xl shadow-2xl h-80 w-full object-cover z-10" alt="Artifacts" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section - Identike me ngjyrat e EuropeCityBreak */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-6">Ready to Discover Kosova?</h2>
          <p className="text-white/80 mb-10 text-xl font-light max-w-2xl mx-auto">
            Experience the unique blend of ancient history and modern energy.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-12 py-4 bg-white text-purple-600 font-black rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl uppercase tracking-widest">
              Plan Your Visit
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default VisitKosova;