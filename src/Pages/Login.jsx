import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate=useNavigate()

     function handleSubmit(e) {
      e.preventDefault()

     
if (email === "" || password === "" ) {
  return false
} else {
let data = new FormData();
data.append('email', email);
data.append('password', password);

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://frontendreq.pondokprogrammer.com/api/login',
  headers: {},
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  if (response.data.token) {

    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user',response.data.user.name)
    navigate('/dashboard/home')
  } else {
    alert ('Email atau Password anda salah')
  }
})
.catch((error) => {
  console.log(error);
});

     }
    }


  return (
    <div className='w-full h-screen flex justify-center items-center '>

    <div className='w-[300px] h-[400px] rounded-xl relative  bg-slate-100 shadow-2xl flex justify-center '>
            <div className='flex flex-col items-center gap-3 mt-12'>
              <form onSubmit={handleSubmit}>
            <h1 className=' top-52 left-96 text-[40px] flex justify-center font-bold leading-10 text-[#6889FF] placeholder: '>
                Login
            </h1>
            <input 
            type="text"
            placeholder='Masukkan Email' 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className='w-[280px] h-[35px] rounded-md bg-[#F6F6F6] mt-12 flex justify-center items-center font-normal p-[25px] text-black placeholder:text-[#515151] '/>
             <input 
            type="Password"
            placeholder='Masukkan Password' 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className='w-[280px] h-[35px] rounded-md bg-[#F6F6F6] mt-5 flex justify-center items-center font-normal p-5 text-black placeholder:text-[#515151]'/>
             
             
                
            <button className='w-[280px] h-[40px] rounded-md bg-[#6889FF] text-[#F6F6F6] font-bold mt-6'>
                Button
            </button>
             
            <div className='flex absolute mr-28 mt-[5px] gap-2 '>
            <input type="checkbox" />
            <p className='w-[200] h-[15px] top-[500px] left-[450px] text-xs'>    
                 Ingat saya untuk login
            </p>
            </div>
            
            <p className='w-full h-[15px] top-[500px] ml-14  text-xs mt-9 flex text-center'>
                Belum memiliki akun,
                <a href="http://localhost:5173/register" className='text-[#6889FF]'> Register</a>
            </p>

            </form>

          
            </div>

        </div>
    </div>
  )
}

export default Login