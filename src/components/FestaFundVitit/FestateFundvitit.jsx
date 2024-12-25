import React, { useEffect, useState } from 'react';
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
    "https://example.com/second-image-las-vegas.jpg",
    "https://example.com/third-image-las-vegas.jpg"
  ];

  const imagesSanFrancisco = [
    "https://miro.medium.com/v2/resize:fit:1200/1*CGvTjTOr6_h40pllQA2ATw.png",
    "https://example.com/second-image-san-francisco.jpg",
    "https://example.com/third-image-san-francisco.jpg"
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

  return (
    <div>
      <div className="max-w-7xl m-auto">
        <div className="w-full h-80 flex flex-col items-center my-9">
          <div className="w-full text-center">
            <h1 className="text-3xl py-5 font-mono">Festat e Fundvitit</h1>
          </div>
          <div className="w-[48rem] font-medium text-[#555555] text-[20px] mt-[3rem]">
            Festat e fundvitit sjellin një atmosferë magjike dhe gëzim të pashoq për njerëzit në mbarë botën. 
            Dritat shumëngjyrëshe, fishekzjarrët dhe traditat unike i bëjnë këto ditë të paharrueshme. 
            Për ta bërë këtë periudhë edhe më të veçantë, <span className="font-semibold">Bani Travel</span> ju ndihmon të zgjidhni destinacionet ideale për të vizituar. 
            Nga madhështia e <span className="font-semibold">New York-ut</span> në SHBA, romantizmi i <span className="font-semibold">Parisit</span> në Evropë, deri te moderniteti i <span className="font-semibold">Dubait</span> në Azi, 
            këto tre qytete kryesore ofrojnë eksperienca të paharrueshme për të festuar fundvitin në mënyrën më të bukur.
          </div>
        </div>
        <hr className="my-8 border-t-4 border-gray-300"></hr>
        <div className="slider-container">
          <div className="slider">
            <h2 className="text-center text-2xl font-bold mb-4">Destinacionet Më të Mirë për Festime Spektakolare të Vitit të Ri</h2>
            <div className="flex justify-center space-x-4">
              <div 
                className="country-card w-1/3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg"
                onMouseEnter={() => setIsHoveredNewYork(true)}
                onMouseLeave={() => setIsHoveredNewYork(false)}
              >
                <img
                  className="rounded-lg object-cover w-full h-auto"
                  src={imagesNewYork[currentImageIndexNewYork]}
                  alt="New York"
                />
                <p className="font-semibold mt-2">New York</p>
              </div>
              <div 
                className="country-card w-1/3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg"
                onMouseEnter={() => setIsHoveredLasVegas(true)}
                onMouseLeave={() => setIsHoveredLasVegas(false)}
              >
                <img
                  className="rounded-lg object-cover w-full h-auto"
                  src={imagesLasVegas[currentImageIndexLasVegas]}
                  alt="Las Vegas"
                />
                <p className="font-semibold mt-2">Las Vegas</p>
              </div>
              <div 
                className="country-card w-1/3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg"
                onMouseEnter={() => setIsHoveredSanFrancisco(true)}
                onMouseLeave={() => setIsHoveredSanFrancisco(false)}
              >
                <img
                  className="rounded-lg object-cover w-full h-auto"
                  src={imagesSanFrancisco[currentImageIndexSanFrancisco]}
                  alt="San Francisco"
                />
                <p className="font-semibold mt-2">San Francisco</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FestateFundvitit;
