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
        const response = await axios.get('http://localhost:5000/api/greqi-images');
        setSlides(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <div className="overflow-x-auto max-w-4xl m-auto">
        <div className="w-full text-center mb-14 my-9">
          <h1 className="text-3xl py-5 font-mono">Visit Greece</h1>
        </div>
        <Carousel slides={slides.map(slide => `data:image/jpeg;base64,${slide.imageBase64}`)} />
      </div>

      <div className="bg-white text-gray-800 font-sans mt-16">
        <div className="bg-blue-500 text-white py-4 px-6">
          <h1 className="text-xl max-w-4xl mx-auto font-bold">Qytetet e Greqis - A Piece of Paradise</h1>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 pr-4">
              <div className="flex flex-col items-start">
                <p className="px-8 my-auto h-fit text-left text-blue-800 max-w-xs">
                  Athina është një qytet që bashkon historinë dhe modernitetin. Akropoli dhe Partenoni janë atraksionet kryesore, ndërsa lagjet e vjetra dhe plazhet përreth ofrojnë një përvojë të pasur kulturore dhe natyrore.
                </p>
                <a
                  href="/search?s=athin"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 text-center hover:bg-blue-600"
                >
                  Ofertat për Athin
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 pr-4">
              <img
                src="https://expertvagabond.com/wp-content/uploads/things-to-do-athens-guide.jpg"
                alt="athen"
                className="h-64 w-auto ml-auto rounded-lg shadow-lg"
              />
            </div>

            <div className="flex flex-wrap relative">
              <div className="w-full md:w-1/2 pr-4">
                <img
                  src="https://www.discovergreece.com/sites/default/files/styles/og_image/public/2019-12/2-thessaloniki_and_the_white_tower_from_above-1.jpg"
                  alt="Selaniku"
                  className="h-64 w-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2 pl-4 relative">
                <div className="flex flex-col h-full justify-between">
                  <p className="px-8 my-auto h-fit text-left text-blue-800 max-w-xs">
                    Selaniku, qyteti i dytë më i madh në Greqi, është një nyje e rëndësishme historike, kulturore dhe ekonomike në Ballkan. I njohur për port i madh dhe një qendër aktive për festivale, arsim dhe tregti.
                  </p>
                  <a
                    href=""
                    className="bg-blue-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-600 absolute bottom-0 right-0 m-4"
                  >
                    Ofertat për Selaniku
                  </a>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto p-6">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-4 relative">
                  <div className="flex flex-col items-start h-full">
                    <p className="px-8 my-auto h-fit text-left text-blue-800 max-w-xs">
                      Patra, qyteti i tretë më i madh në Greqi, është një port i rëndësishëm që lidh vendin me Italinë dhe pjesë të tjera të Europës. Qyteti ka edhe monumente historike si Odeoni Antik dhe Kalaja.
                    </p>
                    <a
                      href=""
                      className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 text-center hover:bg-blue-600 absolute bottom-0 left-0 m-4"
                    >
                      Ofertat për Patra
                    </a>
                  </div>
                </div>
                <div className="w-full md:w-1/2 pr-4">
                  <img
                    src="https://v9c9u8s9.delivery.rocketcdn.me/wp-content/uploads/2021/09/Upper-town-Patras-.jpg"
                    alt="Patra"
                    className="h-64 w-auto ml-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <footer className="text-center text-sm text-gray-600 mt-10">
        <p>Discover Greece</p>
      </footer>

      <Footer />
    </>
  );
};

export default Greqi;
