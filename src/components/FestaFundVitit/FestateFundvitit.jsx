import React from 'react';
import Footer from '../layout/Footer';

function FestateFundvitit() {
  return (
    <div>
      <div className="slider-container">
        <div className="slider">
          <h2 className="text-center text-2xl font-bold mb-4">US</h2>
          <div className="flex justify-center space-x-4">
            <div className="country-card w-1/3 text-center">
              <img
                className="rounded-lg object-cover w-full h-auto"
                src="https://media.timeout.com/images/105730957/750/422/image.jpg"
                alt="New York"
              />
              <p className="font-semibold mt-2">New York</p>
            </div>
            <div className="country-card w-1/3 text-center">
              <img
                className="rounded-lg object-cover w-full h-auto"
                src="https://ktla.com/wp-content/uploads/sites/4/2020/12/AP20365030764895.jpg?strip=1"
                alt="Las Vegas"
              />
              <p className="font-semibold mt-2">Las Vegas</p>
            </div>
            <div className="country-card w-1/3 text-center">
              <img
                className="rounded-lg object-cover w-full h-auto"
                src="https://miro.medium.com/v2/resize:fit:1200/1*CGvTjTOr6_h40pllQA2ATw.png"
                alt="San Francisco"
              />
              <p className="font-semibold mt-2">San Francisco</p>
            </div>
          </div>
        </div>

        <div className="slider mt-12">
          <h2 className="text-center text-2xl font-bold mb-4">EU</h2>
          <div className="flex justify-center space-x-4">
            <div className="country-card w-1/3 text-center">
              <img
                className="rounded-lg object-cover w-full h-auto"
                src="https://www.bvjhostelparis.com/wp-content/uploads/2017/07/FIRE-WORKS-PARIS-14-JULY.jpg"
                alt="Paris"
              />
              <p className="font-semibold mt-2">Paris</p>
            </div>
            <div className="country-card w-1/3 text-center">
              <img
                className="rounded-lg object-cover w-full h-auto"
                src="https://www.wien.info/resource/image/309314/19x10/1200/630/6e921a41966756ab2b894918a4fb557e/B78CB8E009BF476058916BD62BC65D8F/silvester-silvesterpfad-graben.jpg"
                alt="Vienna"
              />
              <p className="font-semibold mt-2">Vienna</p>
            </div>
            <div className="country-card w-1/3 text-center">
              <img
                className="rounded-lg object-cover w-full h-auto"
                src="https://cdn-imgix.headout.com/microbrands-content-image/image/505c0f8d8d05ad0ddc6fb6da463ca924-Budapest%201.jpg?auto=format&w=1222.3999999999999&h=687.6&q=90&fit=crop&ar=16%3A9&crop=faceshttps://cdn-imgix.headout.com/microbrands-content-image/image/505c0f8d8d05ad0ddc6fb6da463ca924-Budapest%201.jpg?auto=format&w=1222.3999999999999&h=687.6&q=90&fit=crop&ar=16%3A9&crop=faces"
                alt="Budapest"
              />
              <p className="font-semibold mt-2">Budapest</p>
            </div>
          </div>
        </div>

        <div className="slider mt-12">
          <h2 className="text-center text-2xl font-bold mb-4">Asia</h2>
          <div className="flex justify-center space-x-4">
            <div className="country-card w-1/3 text-center">
              <img
                className="rounded-lg object-cover w-full h-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Dubai_Skyline.jpg/1200px-Dubai_Skyline.jpg"
                alt="Dubai"
              />
              <p className="font-semibold mt-2">Dubai</p>
            </div>
            <div className="country-card w-1/3 text-center">
              <img
                className="rounded-lg object-cover w-full h-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Tokyo_Skyline.jpg/1200px-Tokyo_Skyline.jpg"
                alt="Tokyo"
              />
              <p className="font-semibold mt-2">Tokyo</p>
            </div>
            <div className="country-card w-1/3 text-center">
              <img
                className="rounded-lg object-cover w-full h-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Singapore_Skyline.jpg/1200px-Singapore_Skyline.jpg"
                alt="Singapore"
              />
              <p className="font-semibold mt-2">Singapore</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FestateFundvitit;
