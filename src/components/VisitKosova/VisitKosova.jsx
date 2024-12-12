import React from 'react'
import Footer from '../layout/Footer';
import Carousel from '../carousel.component';
const VisitKosova = () => {
  let slides = [
    "https://www.wanderlustingk.com/wp-content/uploads/2017/10/kosovo-221161016111_orig.jpg",
    "https://funkytours.com/wp-content/uploads/2022/01/pristina-national-library-1.jpg",
    "https://www.skyscrapercity.com/cdn-cgi/image/format=auto,onerror=redirect,width=1920,height=1920,fit=scale-down/https://www.skyscrapercity.com/attachments/fb_img_1625690180946-jpg.1750315/",
    "https://www.kosovo-vacations.com/ressourcen/images/mother-teresa-cathedral.jpg",
    // "https://media.istockphoto.com/id/1442685827/photo/river-with-a-stone-bridge-in-downtown-prizren-with-buildings-and-trees-at-night-pristina.jpg?s=612x612&w=0&k=20&c=wTc9kbu0w-x3-79TEkOX9jyG2yq314P2GyXy1YCtkss=",
  ];

  
  return (
  <>
    <div className="overflow-x-auto max-w-4xl m-auto">
      <div className="w-full text-center mb-14 my-9">
          <h1 className="text-3xl py-5 font-mono">Visit Kosova</h1>
      </div>
      


    <Carousel slides={slides}/>


    </div>

    <div className="bg-white text-gray-800 font-sans mt-16">
      <div className="bg-orange-500 text-white py-4 px-6">
        <h1 className="text-xl max-w-4xl mx-auto font-bold">National Museum of Kosovo</h1>
      </div>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-wrap">
          <div className="w-full  pr-4">
            <div className='flex '>
              <p className=" px-36 my-auto h-fit text-center text-blue-800">
                The National Museum of Kosovo is founded in 1949, while the architecture of the building is of 1885 and it has the Austro-Hungarian style.
              </p>
              <img
                src="https://www.viaggidimatt.com/wp-content/uploads/2022/07/IMG_2445-scaled.jpeg"
                alt="Museum Building"
                className="h-96 ml-auto rounded-lg shadow-lg"
              />
            </div>


    
            <div className='flex '>
              <img
              src="https://scontent.fprn2-1.fna.fbcdn.net/v/t39.30808-6/459113938_3813868828886279_4538522020989495697_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aa7094&_nc_ohc=677lkpFOQ4gQ7kNvgGpLEdD&_nc_zt=23&_nc_ht=scontent.fprn2-1.fna&_nc_gid=A9pHkuGJy-MydRS4MBd4Rqe&oh=00_AYDnl7TFC_04FYxHbljujPlI4zCmywookmXfhyKhR8TuWw&oe=675CE46F"
              alt="Goddess on a Throne"
                className="h-96 ml-auto rounded-lg shadow-lg"
              />
              <p className=" px-36 my-auto h-fit text-center text-blue-800">
                The National Museum of Kosovo presents the cultural heritage and has a large number of visitors coming from all over the world. The main sculpture of this museum is *Goddess on a Throne* founded near Prishtina 3500 B.C.
             </p>
            </div>

            
            <div className='flex '>
              <p className=" px-36 my-auto h-fit text-center text-blue-800">
              During the last war in Kosovo, some of the objects in this museum were taken, and the museum is always trying to retrieve them and show them to all visitors.
             </p>
              <img
              src="https://www.viaggidimatt.com/wp-content/uploads/2022/07/IMG_2449-scaled.jpeg"
              alt="Goddess on a Throne"
                className="h-96 ml-auto rounded-lg shadow-lg"
              />
            </div>

          </div>
        </div>
      </div>

      <footer className="text-center text-sm text-gray-600 mt-10">
        <p>Bani Travel</p>
      </footer>
    </div>


    <Footer />
  </>
  
)
}

export default VisitKosova

