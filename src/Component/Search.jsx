import React, { useState } from 'react'
import search from '../assets/phone.png'
import { CiSearch } from "react-icons/ci";

const Search = ({onChange}) => {
  const [valueInput, setvalueInput] = useState('')
  const handleSearch = (e)=>{
    onChange(valueInput)
    setvalueInput(e.target.value)
  }
  return (
    <div className='lg:w-[450px] md:w-[350px] w-[320px] md:h-[50px] h-[50px]  rounded-[25px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-between mb-[30px] mt-[90px] md:mt-0'>
        <i className='w-[50px] h-[30px] ml-2 mr-2 md:ml-[22.5px] md:mr-[22.5p]'><CiSearch className='text-2xl lg:text-3xl'/></i>
        <input className='w-full h-full placeholder:text-[15px] text-[15px] outline-none' type='text' placeholder='Cari wisata...' value={valueInput} onInput={(e)=>handleSearch(e)} onChange={(e)=>onChange(e.target.value)}/>
        <button className='md:min-w-[100px] min-w-[80px] h-[50px] bg-[#6889FF] rounded-[25px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-[#ffffff] font-[700] md:text-[15px] text-[12px]'>Cari</button>
    </div>
  )
}

export default Search
