import React, { useEffect, useState } from 'react'
import Gambar from '../assets/gallery-export.svg'
import Input from '../Component/Input'
import Button from '../Component/Button'
import { useNavigate } from 'react-router-dom'
import instance from '../api/api'
import { RxHamburgerMenu } from "react-icons/rx"
import { useStateContext } from '../context/StateContext'

const Tambah = () => {
const navigate = useNavigate()
const {setSidebar,showUser,setUser,checkUserToken} =useStateContext()
// state untuk mengubah status button
const [buttonStatus, setButtonStatus] = useState('create')
// state untuk menyimpan gambar preview sebelum dikirimkan
const [image, setImage] = useState(null)
const fileChangeHandler = (e) => {
  // menggambil vale bukan (e.target.value ) tetepi (e.target.files[0])
  setPhoto(e.target.files[0])
  // membuat object URL agar bisa di tampilkan gambar yang di pilih
  setImage(URL.createObjectURL(e.target.files[0]))
}


const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [phone, setPhone] = useState("")
const [address, setAddress] = useState("")
const [city, setCity] = useState("")
const [photo, setPhoto] = useState("")

 
useEffect(() => {
  checkUserToken();
}, []);

const handleSubmit = (e) => {
  e.preventDefault()
  // merubah status button ketika proses mengirim data
  setButtonStatus("sabar massehhhh")

  let data = new FormData ()
  data.append ("name",name)
  data.append ("email",email)
  data.append ("phone",phone)
  data.append ("address",address)
  data.append ("city",city)
  data.append ("photo",photo)

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/create`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  };

    instance
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))

      // merubah status button ketika proses mengirim selesai/berhasil
      setButtonStatus("create")

      // menavigasi halaman home
      navigate("/dashboard/home")
    })
    .catch ((err) => {
      console.log(err)

      // merubah status button ketika proses mengirim gagal
      setButtonStatus("create")
    })
  }

  



return (
  <div className='w-full h-screen lg:p-20 p-0 flex md:justify-center  lg:items-center '>
  <main className='w-full md:w-[70%] lg:w-[60%] flex flex-col gap-10 lg:gap-5'>
  <nav className="lg:justify-start lg:items-center  w-full flex flex-col lg:flex-row items-start lg:w-[80%] gap-5 lg:gap-0 ">
          <div className="flex justify-between z-10 lg:shadow-none w-full lg:w-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-5 items-center fixed bg-white md:hidden">
          <h1 onClick={()=>{
            setSidebar(true)
            setUser(false)
          }} className="lg:hidden"><RxHamburgerMenu/></h1>
            <h1 className="font-[700] lg:text-[25px] text-[20px] md:hidden">{showUser()}</h1>
          </div>
        <h1 className='text-[#6889FF] font-[700] text-[30px] pl-3 lg:pl-0 mt-[90px] md:mt-[30px] lg:mt-0'>Tambah Wisata</h1>
        </nav>
    <form action="" onSubmit={handleSubmit} className='flex flex-col lg:flex-row lg:justify-between lg:items-start items-center gap-10 w-full p-3 lg:p-0 md:mt-10'>

      <div className=' w-full md:w-full flex md:flex  flex-col  md:flex-col gap-5  md:gap-10 mt-[-50px]  sm:mt-[10px]  justify-center items-center lg:mt-5'>
        <Input placeholder='Masukkan Nama wisata'  type="text" onChange={(e) => setName(e.target.value)}/>
        <Input placeholder='Masukkan Nama Email' type="text" onChange={(e) => setEmail(e.target.value)}/>
        <Input placeholder='Masukkan No.Telepon' type="text" onChange={(e) => setPhone(e.target.value)}/>
        <Input placeholder='Masukkan Kota' type="text" onChange={(e) => setCity(e.target.value)}/>
      </div>

      <div className='flex w-full flex-col gap-5 md:gap-7 pt-5 items-center md:items-center'>
        <input className='w-full md:w-[370px] h-[80px] text-[#515151] placeholder:text-[#515151] outline-none rounded-[12px] pl-[25px] text-[15px] bg-[#F6F6F6] ' required  type="text"  placeholder='Masukkan Alamat' onChange={(e)=>setAddress(e.target.value)}/>
        <div className='input-gambar bg-[#F6F6F6] relative h-[230px] rounded-[12px] overflow-hidden flex justify-center items-center w-full z-10'>
          {
            image?(
              <>
              <input type="file" className='w-full h-full absolute opacity-0 cursor-pointer'  onChange={fileChangeHandler}/>
              <img src={image} className='w-full h-full object-cover' alt="" />
              </>
            ):(
          

          <>
          <input type="file" className='w-full h-full absolute opacity-0 cursor-pointer' onChange={fileChangeHandler}/>
          <div className='order flex flex-col justify-center items-center gap-5'>
            <img src={Gambar} className='w-[60px]' />
            <p className='font-[200]'>Tambah Gambar</p>

          </div>
          </>
            )
          }

        </div>
        <button className='w-[370px] h-[40px]  rounded-md bg-[#6889FF] text-[#F6F6F6] font-bold'>
          {buttonStatus}
        </button>
      </div>

    </form>

  </main>

</div>
)
  }

export default Tambah