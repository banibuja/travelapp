import React, {useEffect, useState} from 'react'
import Table from '../Table';
import axios from 'axios';
import Footer from '../layout/Footer';

const Dubai = () => {
  const [roomPrices, setRoomPrices] = useState([]);

  useEffect(() => {
    // Fetch room prices from the server
    axios.get('http://localhost:5000/api/dubai-price')
      .then(response => {
        setRoomPrices(response.data); // Assuming response.data contains the room price data
      })
      .catch(error => {
        console.error("There was an error fetching the room prices:", error);
      });
  }, []);

  
  return (
  <>
  <div className=" max-w-4xl m-auto">
    
    <div className="w-full flex flex-col items-center my-9">
      <div className="w-full text-center mb-14">
          <h1 className="text-3xl py-5 font-mono">Pushime në Abu Dhabi dhe Dubai</h1>
      </div>
      <div className="">
        <div className='flex gap-5'>
          <div>
            <img className='aspect-square object-cover rounded-xl' src="https://media.cnn.com/api/v1/images/stellar/prod/181218135609-dubai-beach-pexels.jpg?q=w_1600,h_900,x_0,y_0,c_fill" alt="" />
          </div>
          <div className='grid grid-cols-2 gap-4 max-w-md mx-auto '>
            <img className='aspect-square object-cover rounded-xl' src="https://as2.ftcdn.net/v2/jpg/03/81/67/75/1000_F_381677568_eZaX7u05HIszMcZTTJbfCk0tFoizziFU.jpg" alt="" />
            <img className='aspect-square object-cover rounded-xl ' src="https://www.savoredjourneys.com/wp-content/uploads/2015/08/abu-dhabi-city-guide-feature.jpg" alt="" />
            <img className='aspect-square object-cover rounded-xl ' src="https://images.musement.com/cover/0001/16/abu-dhabi_header-15459.png" alt="" />
            <img className='aspect-square object-cover rounded-xl ' src="https://blog.sothebysrealty.ae/hs-fs/hubfs/Exploring%20the%20Wonders%20of%20Burj%20Khalifa-jpg.jpeg?width=1600&height=1067&name=Exploring%20the%20Wonders%20of%20Burj%20Khalifa-jpg.jpeg" alt="" />
          </div>
        </div>
        <div className='flex mt-6 mb-14'>
          <div className="p w-1/2 font-medium text-[#555555] text-[20px] ">
            Ky udhëtim në Abu Dhabi dhe Dubai është një përvojë e pasur që ofron një kombinim të kultures, historisë dhe luksit modern. Çdo moment do t'ju mbushë me magjinë e këtij rajoni të mrekullueshëm.
          </div>
          <div className="border rounded-md shadow-sm p-4 bg-white w-96 ml-auto">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-gray-800 font-medium text-sm">Nisje çdo të Hënë</p>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-gray-800 font-medium text-sm">5 ditë</p>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-gray-800 font-medium text-sm">Bed & Breakfast</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-800 font-medium text-sm">Tirana Airport</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Prej</p>
                <p className="text-blue-600 font-bold text-xl">€399</p>
              </div>
            </div>
            <a className="mt-4 block text-center bg-orange-500 text-white font-bold py-2 px-4 rounded w-full" href='#hotelPricesID'>
              Çmimi
            </a>
          </div>
        </div>
      </div>
    </div>


  <table id="hotelPricesID" className="table-auto w-full border-collapse  ">
      <thead >
        <tr>
          <th className="px-4 text-left py-2 ">Nisja</th>
          <th className="px-4 text-left py-2 ">Tipi i dhomës</th>
          <th className="px-4 text-left py-2 ">Shërbimi</th>
          <th className="px-4 text-left py-2 ">Udhëtimi</th>
          <th className="px-4 text-left py-2 ">Çmimi</th>
          <th className="px-4 text-left py-2 "></th>
        </tr>
      </thead>
      <tbody className='border border-gray-300 py-5'>
        {roomPrices.map((row, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
            
            <td className="border-b border-b-gray-300 px-4 py-2">{row.nisja}</td>
            <td className="border-b border-b-gray-300 px-4 py-2 max-w-32">{row.tipi_dhomes}</td>
            <td className="border-b border-b-gray-300 px-4 py-2">{row.sherbimi}</td>
            <td className="border-b border-b-gray-300 px-4 py-2">{row.udhetimi} ditë</td>
            <td className="border-b border-b-gray-300 px-4 py-2 text-blue-600">{row.cmimi} Є</td>
            <td className="border-b border-b-gray-300 px-4 py-2">Për Person</td>
          </tr>
        ))}
      </tbody>
  </table>
</div>




<Table  
        perfshihet={['Bileta e aeroplanit',"Transferi nga Aeroporti në Hotelet dhe anasjelltas", "Akomodimi në Hotel në Abu Dhabi dhe Dubai", "Mëngjeset në Hotel", "Shëtitjet me Autobus sipas Programit", "Shoqërues në shqip gjatë gjithë udhëtimit", "Guida vendase në disa Shëtitje", "Vetëm 1 çantë shpine"]} 
        nukPerfshihet={[
            "Xhiro me Anije Catamaran në Dubai Marina me transfertë - €42",
            "Darke 4 Set menu + 1 pije me Pamje nga Shfaqja me Shatervani - €60",
            "Ngjitje në Ndërtesën më të lartë Burj Khalifa me transfertë- €68",
            "Biletë hyrje tek Dubai Frame ose Miracle Garden me transfertë - €47",
            "Shëtitje dhe Darkë Safari në Shkretëtirë me transfertë- €60"]}
      />
      <Footer />
  </>)
}

export default Dubai



