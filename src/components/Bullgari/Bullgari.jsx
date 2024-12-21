import React, { useState, useEffect } from 'react';
import Footer from '../layout/Footer'
import axios from 'axios'; 
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
          setMessage('There was an error fetching images.');
        }
      };
  
      fetchImages();
    }, []);


    const settings = {
      dots: true, 
      infinite: true, 
      speed: 500, 
      slidesToShow: 1, 
      slidesToScroll: 1, 
      autoplay: true, 
      autoplaySpeed: 3000, 
      arrows: false, 
    };
    
  return (
    <div>

      
        <div className="flex flex-col justify-center mt-[5rem] items-center space-x-4 mx-auto truncate whitespace-break-spaces text-navy text-xl font-bold tracking-tight lg:text-2xl">
        <span>Bankso | Bullgari</span>


        <div className="p w-full sm:w-[42rem] font-medium text-[#555555] text-[16px] sm:text-[20px] mt-[3rem]">
  Përjetoni aventurën e skijimit në Bullgari, një nga destinacionet më të njohura në Evropë për ski! Me peisazhet e saj mahnitëse dhe skistat e shkëlqyer, Bullgaria ofron mundësi të pafundme për të gjithë ata që duan të kalojnë një fundjavë të paharrueshme në mal.
</div>

<div className="group rounded-lg overflow-hidden w-full sm:w-[70rem] h-[300px] sm:h-[450px] mt-4">
  <Slider {...settings}>
    {images.map((image) => (
      <div key={image.id}>
        <img
          className="w-full h-full object-cover"
          src={`data:image/png;base64,${image.imageBase64}`}
          alt={image.title}
        />
      </div>
    ))}
  </Slider>
</div>



      </div>
      <div className="t p-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg shadow-xl">
  <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Hotel Lion Bansko</h1>
  
  <p className="text-lg text-gray-700 mb-6 text-center max-w-4xl mx-auto">
    Mirë se vini në Hotel Lion Bansko, një destinacion ideal për ata që kërkojnë një përvojë të paharrueshme në zemër të natyrës. I vendosur në një nga resortet më të njohura të skijimit dhe turizmit në Bullgari, hoteli ofron komoditet dhe shërbim të shkëlqyer për çdo vizitor.
  </p>
  
  <table className="table-auto border-collapse border border-gray-300 mb-8 w-full bg-white rounded-lg shadow-md">
    <thead>
      <tr>
        <th className="border border-gray-300 px-6 py-4 text-left font-semibold text-blue-600">Lloji i shërbimit</th>
        <th className="border border-gray-300 px-6 py-4 text-left font-semibold text-blue-600">Akomodim + ski paketa</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-gray-300 px-6 py-4">Kategoria</td>
        <td className="border border-gray-300 px-6 py-4">4 yje</td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-6 py-4">Akomodimi</td>
        <td className="border border-gray-300 px-6 py-4">4 ditë, 5 ditë, 6 ditë, 7 ditë</td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-6 py-4">Shërbimi</td>
        <td className="border border-gray-300 px-6 py-4">Half Board</td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-6 py-4">Destinacioni</td>
        <td className="border border-gray-300 px-6 py-4">Bullgari</td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-6 py-4">Nuk përfshihet</td>
        <td className="border border-gray-300 px-6 py-4">Taksat turistike</td>
      </tr>
    </tbody>
  </table>

  <h2 className="text-2xl font-semibold text-gray-800 mb-6">01-13 Dhjetor</h2>

  <div className="mb-6">
    <h3 className="font-semibold text-xl text-blue-600 mb-4">Ski pass, Skitë dhe Shkopinjtë</h3>
    <p className="text-lg text-gray-600 mb-2">Adult</p>
    <table className="table-auto border-collapse border border-gray-300 mb-6 w-full bg-white rounded-lg shadow-md">
      <tbody>
        <tr>
          <td className="border border-gray-300 px-6 py-4">4 ditë/ 3 ditë Skijim</td>
          <td className="border border-gray-300 px-6 py-4">€ 400</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-6 py-4">5 ditë/ 4 ditë Skijim</td>
          <td className="border border-gray-300 px-6 py-4">€ 518</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-6 py-4">7 ditë/ 6 ditë Skijim</td>
          <td className="border border-gray-300 px-6 py-4">€ 676</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div className="mb-6">
    <h3 className="font-semibold text-xl text-blue-600 mb-4">Ski pass, Skitë, Shkopinjtë dhe Këpucët për Skitë</h3>
    <p className="text-lg text-gray-600 mb-2">Adult</p>
    <table className="table-auto border-collapse border border-gray-300 mb-6 w-full bg-white rounded-lg shadow-md">
      <tbody>
        <tr>
          <td className="border border-gray-300 px-6 py-4">4 ditë/ 3 ditë Skijim</td>
          <td className="border border-gray-300 px-6 py-4">€ 422</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-6 py-4">5 ditë/ 4 ditë Skijim</td>
          <td className="border border-gray-300 px-6 py-4">€ 543</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-6 py-4">7 ditë/ 6 ditë Skijim</td>
          <td className="border border-gray-300 px-6 py-4">€ 698</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div className="mb-6">
    <h3 className="font-semibold text-xl text-blue-600 mb-4">Big Ski pass dhe Skitë</h3>
    <p className="text-lg text-gray-600 mb-2">Adult</p>
    <table className="table-auto border-collapse border border-gray-300 mb-6 w-full bg-white rounded-lg shadow-md">
      <tbody>
        <tr>
          <td className="border border-gray-300 px-6 py-4">4 ditë/ 3 ditë Skijim</td>
          <td className="border border-gray-300 px-6 py-4">€ 517</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-6 py-4">5 ditë/ 4 ditë Skijim</td>
          <td className="border border-gray-300 px-6 py-4">€ 662</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-6 py-4">7 ditë/ 6 ditë Skijim</td>
          <td className="border border-gray-300 px-6 py-4">€ 859</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<Footer />
    </div>
  )
}

export default Bullgari
