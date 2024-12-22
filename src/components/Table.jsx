import React from 'react'

const Table = ({perfshihet, nukPerfshihet}) => {
  return (
    <div className="tick bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8 rounded-xl shadow-lg mt-8">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-20 p-8">
          {/* Div për çmimet që përfshihen */}
          <div className="w-full sm:w-1/2 md:w-1/3 max-w-sm p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="font-bold text-2xl text-blue-600 mb-6 text-center">Në çmim përfshihet</h2>
            <ul className="list-none space-y-4">
                {perfshihet.map((e, index) => (
                    <li key={index} className="flex items-center text-lg">
                        <span className="text-green-500 text-xl mr-3">✔️</span>
                        {e}
                    </li>
                ))}
            </ul>
          </div>

          {/* Div për çmimet që nuk përfshihen */}
          <div className="w-full sm:w-1/2 md:w-1/3 max-w-sm p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="font-bold text-2xl text-red-600 mb-6 text-center">Në çmim nuk përfshihet</h2>
            <ul className="list-none space-y-4">
                {nukPerfshihet.map((e, index) => (
                    <li key={index} className="flex items-center text-lg">
                        <span className="text-red-500 text-xl mr-3">✘</span>
                        {e}
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
  )
}

export default Table
