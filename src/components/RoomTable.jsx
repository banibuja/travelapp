import React from 'react'

const RoomTable = ({tableData}) => {
  console.log(tableData);
  return (
    <div className="overflow-x-auto max-w-4xl m-auto">
    <table className="table-auto w-full border-collapse  ">
      <thead className="">
        <tr>
        {tableData.titles.map((title) => (
          <th className="px-4 text-left py-2 ">{title}</th>
        ))}
        </tr>
      </thead>
      <tbody className='border border-gray-300 '>
        {tableData.data.map((row, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
            <td className="border-b border-b-gray-300 px-4 py-2">{row.date}</td>
            <td className="border-b border-b-gray-300 px-4 py-2 max-w-32">{row.roomType}</td>
            <td className="border-b border-b-gray-300 px-4 py-2">{row.service}</td>
            <td className="border-b border-b-gray-300 px-4 py-2">{row.duration}</td>
            <td className="border-b border-b-gray-300 px-4 py-2 text-blue-600">{row.price}</td>
            <td className="border-b border-b-gray-300 px-4 py-2">{row.perPerson}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default RoomTable
