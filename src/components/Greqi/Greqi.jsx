import React from 'react';
import Footer from '../layout/Footer';
import Carousel from '../carousel.component';

const Greqi = () => {
  let slides = [
    "https://150429065.v2.pressablecdn.com/wp-content/uploads/2020/01/Santorini-Greece-1000x658.jpg", 
    "https://greekcitytimes.com/wp-content/uploads/2018/07/http-cdn.cnn_.com-cnnnext-dam-assets-170606121035-greece-travel-destination-shutterstock-560829934.jpg", 
    "https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/c0/98/c5/caption.jpg", 
  ];

  return (
    <>
      <div className="overflow-x-auto max-w-4xl m-auto">
        <div className="w-full text-center mb-14 my-9">
          <h1 className="text-3xl py-5 font-mono">Visit Greece</h1>
        </div>

        <Carousel slides={slides} />
      </div>

      <div className="bg-white text-gray-800 font-sans mt-16">
        <div className="bg-blue-500 text-white py-4 px-6">
          <h1 className="text-xl max-w-4xl mx-auto font-bold">Santorini - A Piece of Paradise</h1>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 pr-4">
              <div className="flex flex-col items-start">
                <p className="px-8 my-auto h-fit text-left text-blue-800 max-w-xs">
                  Athina është një qytet që bashkon historinë dhe modernitetin. Akropoli dhe Partenoni janë atraksionet kryesore, ndërsa lagjet e vjetra dhe plazhet përreth ofrojnë një përvojë të pasur kulturore dhe natyrore.
                </p>
                <a
                  href=""
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 text-center hover:bg-blue-600"
                >
                  Ofertat për Athin
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 pr-4">
              <img
                src="https://expertvagabond.com/wp-content/uploads/things-to-do-athens-guide.jpg"
                alt="athen"
                className="h-64 w-auto ml-auto rounded-lg shadow-lg"
              />
            </div>

            <div className="flex">
              <img
                src="https://www.greece-is.com/wp-content/uploads/2018/03/santorini-2.jpg"
                alt="Santorini Sunset"
                className="h-96 ml-auto rounded-lg shadow-lg"
              />
              <p className="px-36 my-auto h-fit text-center text-blue-800">
                The island's famous sunsets are a must-see experience. As the sun sets over the caldera, the view is breathtaking and unforgettable.
              </p>
            </div>

            <div className="flex">
              <p className="px-36 my-auto h-fit text-center text-blue-800">
                Santorini is also home to ancient ruins and archaeological sites, including the famous Akrotiri, which was destroyed by a volcanic eruption in the 16th century BC.
              </p>
              <img
                src="https://media.greece-is.com/wp-content/uploads/2018/02/akrotiri-santorini.jpg"
                alt="Akrotiri Archaeological Site"
                className="h-96 ml-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center text-sm text-gray-600 mt-10">
        <p>Discover Greece</p>
      </footer>

      <Footer />
    </>
  );
};

export default Greqi;
