import React from 'react'
import Nothing from '../assets/nothing.jpg'
const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <img 
        src={Nothing} 
        alt="No Data" 
        className='mt-10 h-60 m-2'
      />
      <h3 className="text-2xl font-bold text-purple-500 tracking-tight">
          No Data Found
        </h3>
    </div>
  )
}

export default NoData
