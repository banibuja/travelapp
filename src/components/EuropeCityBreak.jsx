import React from 'react'

const EuropeCityBreak = () => {
    const places = [{
        id:1,
        countryName:'France',
        imageUrl:"https://www.costsavertour.com/media/nylpwiyy/highlights-france-guided-tour-7.jpg"
    },{
        id:2,
        countryName:'Italy',
        imageUrl:"https://www.state.gov/wp-content/uploads/2019/04/shutterstock_720444505v2-2208x1406-1.jpg"
    },{
        id:3,
        countryName:'Netherlands',
        imageUrl:"https://www.internationalinsurance.com/wp-content/uploads/2024/03/Amsterdam-Netherlands-Channel.jpg"
    },{
        id:4,
        countryName:'Spain',
        imageUrl:"https://media.timeout.com/images/106185654/750/562/image.jpg"
    },{
        id:5,
        countryName:'Germany',
        imageUrl:"https://usenotioncms.com/proxy-prod/block/8ebadf3d-ea97-424c-a5de-d8ab5b03c4d4/f8f9f4d3-d92f-4d34-91d4-0b9996c3a8ed/67d8e20a-283a-4013-8f51-2617e17dc51b/Untitled.png"
    },{
        id:6,
        countryName:'United Kingdom',
        imageUrl:"https://www.focus-info.org/wp-content/uploads/2022/07/london-blog-1.jpg"
    },{
        id:7,
        countryName:'Austria',
        imageUrl:"https://traveltipzone.com/wp-content/uploads/traveltipzone.com-the-15-most-beautiful-lakes-in-austria-dscf1883-1200x738.jpg"
    }
]
  return (
    <div className="w-3/4 m-auto">
        <div className="w-full h-96  my-9">
            <div className="w-full text-center">
                <h1 className="text-3xl py-5 font-mono">EUROPE CITY BREAK</h1>
            </div>
            <div className="w-full py-14 text-center">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem quisquam eveniet dolores eligendi. Molestias, nobis. Voluptatum quam necessitatibus eaque, sequi beatae a commodi voluptatibus, et harum laudantium facere. Excepturi, explicabo.</p>
            </div>
        </div>
        <div className='flex flex-wrap gap-10'>
                {places.map((country) => (
                    <div key={country.id} className="aspect-[7/4] relative h-60 overflow-hidden">
                        <img className="object-cover" src={country.imageUrl} alt={country.countryName} />
                        <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center">
                            <span className=" bg-white bg-opacity-80 px-9 py-3 rounded">
                                {country.countryName}
                            </span>
                        </div>
                    </div>
                ))}
        </div>
    </div>
  )
}

export default EuropeCityBreak
