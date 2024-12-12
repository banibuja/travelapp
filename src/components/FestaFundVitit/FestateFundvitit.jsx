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
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/New_York_City_at_night_HDR_edit1.jpg/1200px-New_York_City_at_night_HDR_edit1.jpg"
                alt="New York"
              />
              <p className="font-semibold mt-2">New York</p>
            </div>
            <div className="country-card w-1/3 text-center">
              <img
                className="rounded-lg object-cover w-full h-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Las_Vegas_%2813699175984%29.jpg/1200px-Las_Vegas_%2813699175984%29.jpg"
                alt="Las Vegas"
              />
              <p className="font-semibold mt-2">Las Vegas</p>
            </div>
            <div className="country-card w-1/3 text-center">
              <img
                className="rounded-lg object-cover w-full h-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/San_Francisco_%28cropped%29.jpg/1200px-San_Francisco_%28cropped%29.jpg"
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
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Eiffel_Tower_%28cropped%29.jpg/1200px-Eiffel_Tower_%28cropped%29.jpg"
                alt="Paris"
              />
              <p className="font-semibold mt-2">Paris</p>
            </div>
            <div className="country-card w-1/3 text-center">
              <img
                className="rounded-lg object-cover w-full h-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Vienna_-_Ringstrasse_and_Rathaus_%28cropped%29.jpg/1200px-Vienna_-_Ringstrasse_and_Rathaus_%28cropped%29.jpg"
                alt="Vienna"
              />
              <p className="font-semibold mt-2">Vienna</p>
            </div>
            <div className="country-card w-1/3 text-center">
              <img
                className="rounded-lg object-cover w-full h-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Budapest_Buda_Castle_Panorama.jpg/1200px-Budapest_Buda_Castle_Panorama.jpg"
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
