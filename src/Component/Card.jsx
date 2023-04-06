import React from 'react'
import airTerjun from '../assets/airTerjun.png'

const Card = ({src,alt,name,address,city,phone}) => {
  
  return (
    
    <div  className='w-[320px] h-[250px] rounded-[8px] shadow-[4px_4px_12px_rgba(0,0,0,0.25)]'>
        <div className='img-container w-full h-[180px] overflow-hidden'>
            <img className='w-full' src={src} alt={alt} />

        </div>
        <div className='desc p-[15px] pt-[10px] flex flex-col '>
            <h3 className='text-[10px] font-[700] mb-1'>{name}</h3>
            <p className='text-[10px] font-[400] '>{address},{city}</p>
            <p className='text-[10px] font-[400]'>{phone}</p>

        </div>

    </div>
  )
}

export default Card