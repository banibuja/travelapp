import React from 'react';
import Footer from '../layout/Footer';

function FestateFundvitit() {
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

      <div className="slider-container">
          <div className="slider">
            <h2 className="text-center text-2xl font-bold mb-4">US</h2>
            <div className="flex justify-center space-x-4">
              <a href="#" className="country-card w-1/3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  className="rounded-lg object-cover w-full h-auto"
                  src="https://media.timeout.com/images/105730957/750/422/image.jpg"
                  alt="New York"
                />
                <p className="font-semibold mt-2">New York</p>
              </a>
              <a href="#" className="country-card w-1/3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  className="rounded-lg object-cover w-full h-auto"
                  src="https://ktla.com/wp-content/uploads/sites/4/2020/12/AP20365030764895.jpg?strip=1"
                  alt="Las Vegas"
                />
                <p className="font-semibold mt-2">Las Vegas</p>
              </a>
              <a href="#" className="country-card w-1/3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  className="rounded-lg object-cover w-full h-auto"
                  src="https://miro.medium.com/v2/resize:fit:1200/1*CGvTjTOr6_h40pllQA2ATw.png"
                  alt="San Francisco"
                />
                <p className="font-semibold mt-2">San Francisco</p>
              </a>
            </div>
          </div>

          <div className="slider mt-12">
            <h2 className="text-center text-2xl font-bold mb-4">EU</h2>
            <div className="flex justify-center space-x-4">
              <a href="#" className="country-card w-1/3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  className="rounded-lg object-cover w-full h-auto"
                  src="https://www.bvjhostelparis.com/wp-content/uploads/2017/07/FIRE-WORKS-PARIS-14-JULY.jpg"
                  alt="Paris"
                />
                <p className="font-semibold mt-2">Paris</p>
              </a>
              <a href="#" className="country-card w-1/3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  className="rounded-lg object-cover w-full h-auto"
                  src="https://www.wien.info/resource/image/309314/19x10/1200/630/6e921a41966756ab2b894918a4fb557e/B78CB8E009BF476058916BD62BC65D8F/silvester-silvesterpfad-graben.jpg"
                  alt="Vienna"
                />
                <p className="font-semibold mt-2">Vienna</p>
              </a>
              <a href="#" className="country-card w-1/3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  className="rounded-lg object-cover w-full h-auto"
                  src="https://cdn-imgix.headout.com/microbrands-content-image/image/505c0f8d8d05ad0ddc6fb6da463ca924-Budapest%201.jpg?auto=format&w=1222.3999999999999&h=687.6&q=90&fit=crop&ar=16%3A9&crop=faces"
                  alt="Budapest"
                />
                <p className="font-semibold mt-2">Budapest</p>
              </a>
            </div>
          </div>

          <div className="slider mt-12">
            <h2 className="text-center text-2xl font-bold mb-4">Asia</h2>
            <div className="flex justify-center space-x-4">
              <a href="#" className="country-card w-1/3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  className="rounded-lg object-cover w-full h-auto"
                  src="https://c.regencyholidays.com/blog/blog/content/images/2021/11/New-Year-In-UAE-2022--2-.webp"
                  alt="Dubai"
                />
                <p className="font-semibold mt-2">Dubai</p>
              </a>
              <a href="#" className="country-card w-1/3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  className="rounded-lg object-cover w-full h-auto"
                  src="https://media.timeout.com/images/105692512/image.jpg"
                  alt="Tokyo"
                />
                <p className="font-semibold mt-2">Tokyo</p>
              </a>
              <a href="#" className="country-card w-1/3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  className="rounded-lg object-cover w-full h-auto"
                  src="https://ik.imagekit.io/tvlk/blog/2024/10/shutterstock_727168480.jpg?tr=q-70,w-625,dpr-2"
                  alt="Singapore"
                />
                <p className="font-semibold mt-2">Singapore</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FestateFundvitit;
