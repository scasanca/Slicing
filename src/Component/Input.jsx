import React from 'react'

const Input = ({type, placeholder, value, onChange}) => {
  return (
    <input className='w-full md:w-[370px] h-[65px] text-[#515151] placeholder:text-[#515151] outline-none rounded-[12px] bg-[#F6F6F6] pl-[20px]' required type={type} placeholder={placeholder} value={value} onChange={onChange}/>
  )
}

export default Input