import React from 'react';
import Footer from '../layout/Footer';
import axios from 'axios';

const Maqedoni = () => {
  return (
    <>
      <div className="flex w-full">
        <div className="relative w-1/2 min-h-[20rem]">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://nasemavrovo.mk/wp-content/uploads/2020/12/dji_0473-2.jpg"
            alt="Image 1"
          />
        </div>
        <div className="relative w-1/2 min-h-[20rem]">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://www.lachtal.eu/storage/gallery/0a/98cf94/original/p3160198.jpg"
            alt="Image 2"
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center my-9">
        <div className="w-full text-center mb-14">
          <h1 className="text-3xl py-5 font-mono">Mia's Favorite Hotel</h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className='flex gap-5'>
            <div>
              <img className='aspect-square object-cover rounded-xl' src="https://cf.bstatic.com/xdata/images/hotel/max500/344781321.jpg?k=dc4ebebb2e1a11f8d6992af3267ae218102baae6846b064f27c3a44ee8a5d946&o=" alt="" />
              <a className="mt-4 block text-center bg-orange-500 text-white font-bold py-2 px-4 rounded w-full" href='#hotelPricesID'>
                Çmimi
              </a>
            </div>
            <div className='grid grid-cols-2 gap-4 max-w-md mx-auto'>
              <img className='aspect-square object-cover rounded-xl' src="https://afar.brightspotcdn.com/dims4/default/2e3942f/2147483647/strip/true/crop/1143x763+0+0/resize/1440x961!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fd0%2F02%2F1e98e7f7f7f8aa4f4b08201d3b76%2Foriginal-st-trop-alp-spa-7.jpg" alt="" />
              <img className='aspect-square object-cover rounded-xl' src="https://miasfavorite.com/wp-content/uploads/2021/04/10.jpg" alt="" />
              <img className='aspect-square object-cover rounded-xl' src="https://hospitality-school.com/wp-content/uploads/2016/03/buffet-service-style.jpg" alt="" />
              <img className='aspect-square object-cover rounded-xl' src="https://miasfavorite.com/wp-content/uploads/2024/10/restaurant_outdoor_MFH.jpg" alt="" />
            </div>
          </div>
          <div className="mt-6 mb-14">
            <table className="min-w-full">
              <thead>
                <tr className="bg-white">
                  <th className="py-2 text-left">Lloji dhomes</th>
                  <th className="py-2 text-left">Sherbimi</th>
                  <th className="py-2 text-left">Gjatë sezones</th>
                  <th className="py-2 text-left">Jasht sezones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100">
                  <td className="py-2 px-4">Standard</td>
                  <td className="py-2 px-4">B&B</td>
                  <td className="py-2 px-4">€100</td>
                  <td className="py-2 px-4">€80</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4">Deluxe</td>
                  <td className="py-2 px-4">Half-Board</td>
                  <td className="py-2 px-4">€150</td>
                  <td className="py-2 px-4">€120</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="py-2 px-4">Suite</td>
                  <td className="py-2 px-4">Full-Board</td>
                  <td className="py-2 px-4">€200</td>
                  <td className="py-2 px-4">€170</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4">Family Room</td>
                  <td className="py-2 px-4">All Inclusive</td>
                  <td className="py-2 px-4">€250</td>
                  <td className="py-2 px-4">€220</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Maqedoni;
