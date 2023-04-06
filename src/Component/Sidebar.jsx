import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineHome } from "react-icons/ai"
import { BiNotepad } from "react-icons/bi"
import { FiPlusSquare } from "react-icons/fi"
import { BiEditAlt } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { useStateContext } from '../context/StateContext'
import instance from '../api/api'
import { GoHome } from "react-icons/go";


const Sidebar = () => {
    const {setSidebar,setUser,showSidebar} =useStateContext()
    const [name, setName] = useState('')
    const [show, setShow] = useState(false)
    useEffect(() => {
      const checkUserToken = () => {
      const userToken = localStorage.getItem("token");
      const userName = localStorage.getItem("user");
      if (!userToken || userToken === "undefined" && !userName || userName === "undefined" ) {
          return navigate("/");
        }else{
          return setName(userName.replace(/[0-9]/gi, ""))
        }
      };
      checkUserToken();
    }, []);
    // const handleLogout = ()=>{
    //    setShow(true)
    // 
    const activeLink = ({isActive})=>(isActive? 'text-[#0038FF] text-[25px] lg:p-2 lg:rounded-[50%] lg:hover:bg-slate-200 ':'text-[#696a6c] text-[25px] lg:p-2 lg:rounded-[50%] lg:hover:bg-slate-200')
    const navigate = useNavigate()
    const handleLongout = ()=>{

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: '/logout',
  headers: { 
    'Authorization': `Bearer ${localStorage.getItem('token')} `
  }
};

instance.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  navigate('/')
})
.catch((error) => {
  console.log(error);
});
    }
  return (
    <>
    <div className='w-full h-full lg:w-auto lg-h-auto flex' >
    <div className={`md:w-[70px] md:h-[500px] md:rounded-tr-[20px] md:rounded-br-[20px] md:shadow-[4px_4px_4px_rgba(0,0,0,0.25)] flex flex-col md:flex justify-between md:fixed md:top-[50%]  md:translate-y-[-50%] bg-white w-[70%] h-screen fixed ${showSidebar()}  z-30 `}>
        <div className='top flex flex-col md:gap-[35px] gap-6 mt-[50px] md:items-center pl-8 md:pl-0 '>
        <h1 className='md:hidden font-[700] text-[20px] mb-6'>Hi,{name}!</h1>
           <NavLink className={activeLink} onClick={() => setSidebar(false)} to='home' >
               <span className='flex gap-5 items-center'>
               <i  ><AiOutlineHome/></i> 
               
                <h1 className='md:hidden text-[20px]'>Beranda</h1>
                </span>
           </NavLink>

           <NavLink className={activeLink} onClick={()=>setSidebar(false)} to='note' >
           <span className="flex gap-5 items-center">
               
               <i ><BiNotepad/></i>
                <h1 className="md:hidden text-[20px]">Tabel</h1>
                </span>
                </NavLink>

          

           <NavLink className={activeLink} onClick={()=>setSidebar(false)} to='tambah' >
           <span className="flex gap-5 items-center">
               <i ><FiPlusSquare/></i>
               <h1 className='md:hidden text-[20px]'>Tambah</h1>
                </span>
           </NavLink>

          
            </div>

        <div className='bot mb-[41px] flex md:justify-center pl-8 md:pl-0 items-center cursor-pointer gap-2'>
            <i onClick={() => setShow (true)} className='text-[25px] text-[#696a6c] hover:bg-slate-300 p-2 rounded-[50%]'><IoLogOutOutline/></i>
            <h1 className='md:hidden text-[20px] text-[#696a6c]'>Keluar</h1>
           
           </div>
            </div>
            <div onClick={()=>{
        setSidebar(false)
        setUser(true)
        }} className={`w-full h-screen fixed bg-[rgba(0,0,0,0.5)] md:hidden ${showSidebar()} z-20`}>
        </div>
            </div>
   
                           {show?(<div className='w-full h-full bg-[rgba(0,0,0,0.5)] fixed z-30'>
            <div className='logout lg:w-[700px] w-[350px] h-[200px] lg:h-[350px] rounded-[20px] bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center lg:gap-28 gap-12 z-50  fixed'>
                <p className='text-[30px] font-[700] text-[#6889FF]'>Mau Keluar Masss???</p>
               <div className='flex gap-16 mt-10'>
                <button onClick={() => setShow (false)} className='lg:w-[200px] lg:h-[40px] w-[100px] h-[40px] rounded-md bg-[#6889FF] text-[#F6F6F6] font-bold mt-[-20px]'>Batal</button>
                <button onClick={handleLongout} className='lg:w-[200px] lg:h-[40px] rounded-md w-[100px] h-[40px] bg-[#6889FF] text-[#F6F6F6] font-bold mt-[-20px]'>Lanjutkan</button>
                </div>
            </div>
            </div>):null
        } 

        </>
        
  )
}

export default Sidebar