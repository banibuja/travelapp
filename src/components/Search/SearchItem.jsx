import React, { useEffect } from 'react'
import SvgIcons from '../icons/svgs'

const SearchItem = ({data}) => {
    
    const item = {
        airport: data.airport,
        cmimi: data.cmimi,
        dataKthimit: data.dataKthimit,
        dataNisjes: data.dataNisjes,
        llojiDhomes: data.llojiDhomes,
        nrNeteve: data.nrNeteve,
        nrPersonave: data.nrPersonave,
        rating: data.rating,
        sherbimi: data.sherbimi,
        shteti: data.shteti,
        titulli: data.titulli,
    }
        function formatDate (dateString)  {
            const months = ["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gsh", "Sht", "Tet", "Nën", "Dhj"]; // Albanian month abbreviations
          
            const date = new Date(dateString);
            const day = date.getDate();
            const month = months[date.getMonth()]; // Get the Albanian month abbreviation
            const year = date.getFullYear();
          
            return `${day} ${month} ${year}`;
          };
    

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs w-full">
            <img
            src="https://diq6z0fqx8xxr.cloudfront.net/images/product/1/8/0/2/2/213950/the_byzantium_-_sultanahmet__istanbul_213950.jpg?width=1024&height=768&mode=min"
            alt="Hotel"
            className="w-full h-48 object-cover"
            />

            <div className="p-4 border border-black border-t-0 rounded-bl-lg rounded-br-lg">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800  h-7 text-ellipsis overflow-hidden whitespace-nowrap">{item.titulli}</h3>
                    <span className="text-yellow-500 text-lg flex">
                        {
                            Array.from({ length: item.rating }, (_, index) => (
                                <SvgIcons.StarSvg key={index} />
                            ))
                        }
                    </span>
                </div>
                <p className="text-gray-600 text-sm">{item.shteti}</p>

                <div className="mt-2 flex justify-between text-gray-600 text-sm">
                    <div>
                        <p>{item.nrPersonave} Të rritur</p>
                        <p>{formatDate(item.dataNisjes)} - {formatDate(item.dataKthimit)}</p>
                    </div>
                    <div className="text-right">
                    <p>{item.nrNeteve} Netë</p>
                    <p className="font-semibold text-gray-800">€{item.cmimi}.00</p>
                    </div>
                </div>

                <div className="mt-4 flex justify-between text-gray-600 text-sm">
                    <p>{item.llojiDhomes}</p>
                    <p>{item.sherbimi}</p>
                </div>

                <div className="mt-2 flex items-center text-sm text-gray-600">
                    <span className="mr-1">✈️</span>
                    <p>{item.airport}</p>
                </div>

                <div className="mt-4 text-center">
                    <button className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600">
                    Rezervo këtë arazhma...
                    </button>
                </div>
            </div>
        </div>


    )
}

export default SearchItem
