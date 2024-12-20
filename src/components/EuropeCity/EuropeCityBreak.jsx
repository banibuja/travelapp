import React from 'react'
import Footer from '../layout/Footer';
import { useNavigate } from "react-router-dom";

const EuropeCityBreak = () => {
    const navigate = useNavigate();
    const places = [{
        id:1,
        countryId:6,
        countryName:'France',
        imageUrl:"https://www.costsavertour.com/media/nylpwiyy/highlights-france-guided-tour-7.jpg"
    },{
        id:2,
        countryId:7,
        countryName:'Italy',
        imageUrl:"https://www.state.gov/wp-content/uploads/2019/04/shutterstock_720444505v2-2208x1406-1.jpg"
    },{
        id:3,
        countryId:8,
        countryName:'Netherlands',
        imageUrl:"https://www.internationalinsurance.com/wp-content/uploads/2024/03/Amsterdam-Netherlands-Channel.jpg"
    },{
        id:4,
        countryId:9,
        countryName:'Spain',
        imageUrl:"https://media.timeout.com/images/106185654/750/562/image.jpg"
    },{
        id:5,
        countryId:10,
        countryName:'Germany',
        imageUrl:"https://usenotioncms.com/proxy-prod/block/8ebadf3d-ea97-424c-a5de-d8ab5b03c4d4/f8f9f4d3-d92f-4d34-91d4-0b9996c3a8ed/67d8e20a-283a-4013-8f51-2617e17dc51b/Untitled.png"
    },{
        id:6,
        countryId:11,
        countryName:'United Kingdom',
        imageUrl:"https://www.focus-info.org/wp-content/uploads/2022/07/london-blog-1.jpg"
    }
]
const handleSearch = (e) => {
    
    const queryParams = Object.entries({
      toId: e.target.id,
      toEmri: e.target.alt,
    });
    
    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`/search?${queryString}`);
  };
  return (
    <>
        <div className="max-w-7xl m-auto">
            <div className="w-full h-80 flex flex-col items-center my-9">
                <div className="w-full text-center">
                    <h1 className="text-3xl py-5 font-mono">EUROPE CITY BREAK</h1>
                </div>
                <div className="p w-[48rem] font-medium text-[#555555] text-[20px] mt-[3rem]">
                    Një city break është mundësia ideale për të shpëtuar nga rutina dhe për të zbuluar magjinë e një qyteti të ri. Është koha perfekte për të ecur pa nxitim dhe për të eksploruar çdo qoshe të fshehur që mban një histori apo një surprizë të këndshme. Shëtisni nëpër rrugicat me kalldrëm dhe ndaloni në kafene të vogla ku aroma e kafesë ju fton për një pushim relaksues. Vizitoni dyqane të vogla artizanale dhe zbuloni thesare të veçanta që do t’ju rikujtojnë këtë përvojë unike.
                </div>
            </div>
            <div className='flex flex-wrap gap-10  py-8 justify-center'>
                {places.map((country) => (
                    <div key={country.id} className="aspect-[7/4] relative h-48 overflow-hidden cursor-pointer">
                        <img id={country.countryId}  className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 "  onClick={handleSearch} src={country.imageUrl} alt={country.countryName}/>
                        
                       <span className="text-nowrap transform -translate-x-1/2 -translate-y-1/2 bg-white absolute top-2/4 left-2/4  z-10 bg-opacity-80 px-9 py-3 rounded" >
                                {country.countryName}
                            </span>
                    </div>
                ))}
            </div>
        </div>
            <hr width="100%" size="2"/>
        <Footer />
    </>
  )
}

export default EuropeCityBreak
