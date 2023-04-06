import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Back from '.././assets/Back.png'
import Location from '.././assets/Location.png'
import Email from '.././assets/Email.png'
import Phone from '.././assets/phone.png'
import instance from '.././api/api'
const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    const checkUserToken = ()=>{  
      const userToken = localStorage.getItem('token')
      if(!userToken || userToken ==='undefined'){
        return navigate('/')
      }
    }
    checkUserToken()
  },[])
  useEffect 
  (() => {
    setLoading(true)
    const getData = () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `/show/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: data,
      };

      instance
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setData(response.data.data)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    };
    getData();
  },
  []);
  const userName = localStorage.getItem("user");
  const nama = userName.replace(/[0-9]/gi, "");
  if(loading){
    return(
      <div className='w-full flex justify-center items-center animate-pulse'>
            <main className='lg:w-[60%] md:w-[80%] w-full ' >
      <nav className="md:justify-start md:items-center w-full flex flex-col md:flex-row items-center md:w-[80%] gap-5 ">
          <div className="flex justify-between  md:shadow-none w-full md:w-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-5 items-center">
          <NavLink to='/dashboard/table'> <img src={Back} className='w-[15px]' alt="" /></NavLink>
            <h1 className="font-[700] lg:text-[25px] text-[20px] md:hidden">Hi,{nama.toUpperCase()}!</h1>
          </div>
      <h1 className='text-[25px] font-[700] md:mb-0 mb-5 bg-slate-300 w-80 h-6 rounded-md'></h1>
        </nav>
      <article className='flex flex-col gap-5 ml-5 mr-5'>
        <div className="img-container w-full rounded-[8px] lg:h-[440px] h-[350px] bg-slate-300 overflow-hidden ">
          <img  className='w-full h-full object-cover '  />
        </div>
        <div className="description flex flex-col gap-2 pl-1 ">
          <div className="location flex  items-center gap-3 ">
            <img className='w-[25px]' src={Location} alt="" />
            <p className='text-[15px] font-[ 400] bg-slate-300 w-60 h-5 rounded-md '></p>
          </div>
          <div className="email flex   items-center gap-3">
          <img className='w-[25px]' src={Email} alt="" />
          <p className='text-[15px] font-[ 400] bg-slate-300 w-60 h-5 rounded-md '></p>
          </div>
          <div className="phone flex   items-center gap-3 ">
          <img className='w-[25px]' src={Phone} alt="" />
          <p className='tex t-[15px] font-[ 400] bg-slate-300 w-60 h-5 rounded-md'></p>
          </div>
        </div>
      </article>
      </main>
          )
    </div>)
  }else{
  return (
    <div className='w-full flex justify-center items-center'>
      {
        data.map((item)=>{
          return(
            <main className='lg:w-[60%] md:w-[80%] w-full ' key={item.id}>
      <nav className="md:justify-start md:items-center w-full flex flex-col md:flex-row items-center md:w-[80%] gap-5 ">
          <div className="flex justify-between  md:shadow-none w-full md:w-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-5 items-center">
          <NavLink to='/dashboard/note'> <img src={Back} className='w-[15px]' alt="" /></NavLink>
            <h1 className="font-[700] lg:text-[25px] text-[20px] md:hidden">Hi,{nama.toUpperCase()}!</h1>
          </div>
      <h1 className='text-[25px] font-[700] md:mb-0 mb-5'>{item.name}</h1>
        </nav>
      <article className='flex flex-col gap-5 ml-5 mr-5'>
        <div className="img-container w-full rounded-[8px] lg:h-[440px] h-[350px] overflow-hidden ">
          <img src={item.photo} className='w-full h-full object-cover ' alt="" />
        </div>
        <div className="description flex flex-col gap-2 pl-1 ">
          <div className="location flex  items-center gap-3 ">
            <img className='w-[25px]' src={Location} alt="" />
            <p className='text-[15px] font-[ 400]'>{item.address},{item.city}</p>
          </div>
          <div className="email flex   items-center gap-3">
          <img className='w-[25px]' src={Email} alt="" />
          <p className='text-[15px] font-[ 400]'>{item.email}</p>
          </div>
          <div className="phone flex   items-center gap-3 ">
          <img className='w-[25px]' src={Phone} alt="" />
          <p className='tex t-[15px] font-[ 400]'>{item.phone}</p>
          </div>
        </div>
      </article>
      </main>
          )
        })
      }

    </div>
  )
}}

export default Detail