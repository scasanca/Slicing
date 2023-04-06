
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import instance from '../api/api'
import Gambar from '../assets/airTerjun.png'
import Button from '../Component/Button'
import Input from '../Component/Input'
import Back from '../assets/Back.png'


const Ubah = () => {

  const {id}  = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [buttonStatus, setButtonStatus] = useState("Update")
  const [image, setImage] = useState(null)


  // untuk dikirim melalui form
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")
  const [photo, setPhoto] = useState("")
  useEffect(() => {
    const checkUserToken = () => {
    const userToken = localStorage.getItem('token')
    if(!userToken || userToken ==='undefined') {
      return navigate ('/')
    }
  }
  checkUserToken()
  }, [])

  const fileChangeHandler = (e) => {
    // menggambil value bukan (e.target.value) tetapi (e.target.file[0])
    setPhoto(e.target.files[0])
    // membuat object URL agar bisa di tampilkan gambar yang di pilih
    setImage(URL.createObjectURL.apply(e.target.files[0]))
  }

  useEffect(()=>{
    setLoading (true)
    const getData =() => {
      let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `/show/${id}`,
  headers: { 
    Authorization :
    `Bearer ${localStorage.getItem('token')}`,
  },
  data:data
  };
  
  instance
  .request(config)
  .then((response) => {
  console.log(JSON.stringify(response.data))
  setData(response.data.data);
  setName(response.data.data[0].name);
  setEmail(response.data.data[0].email);
  setPhone(response.data.data[0].phone);
  setCity(response.data.data[0].city);
  setAddress(response.data.data[0].address);
  setImage(response.data.data[0].photo);
  fetch (response.data.data[0].photo)
  .then(res => res.blob())
  .then(blob => {
    console.log(blob);
    const nameFile = response.data.data[0].name
    const file = new File ([blob], nameFile,{type:blob.type})
    setPhoto(file)
  })
  setLoading(false)
  })
  .catch((error) => {
  console.log(error);
  setLoading(false)
  })
  
    }
    getData()
  },[id])

  const handleSubmit = (e) => {
    e.preventDefault()
    // merubah status button ketika proses mengirim data
    setButtonStatus('Wait Brohhh...')
    let data = new FormData ()
    data.append('name',name)
    data.append('email',email)
    data.append('phone',phone)
    data.append('address',address)
    data.append('city',city)
    data.append('photo',photo)

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `/UP/${id}`,
      headers: { 
        Authorization :
        `Bearer ${localStorage.getItem('token')}`,
      },
      data:data,
      }

      instance
    .request(config)
    .then((response) => {
    console.log(JSON.stringify(response.data))

    // merubah status button ketika proses mengirim selesai/ berhasil
    setButtonStatus('Create')

    // menavigasi ke halaman home
    navigate('/dashboard/home')

    })
    .catch((error) => {
    console.log(error)

    // merubah status button ketika proses mengirim gagal
    setButtonStatus('Update')
    })

  }
  const userName = localStorage.getItem("user");
  const nama = userName.replace(/[0-9]/gi, "");

  if (loading) {
    return (
     <div className='w-full h-screen flex justify-center items-center '>
      <div class="loading">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  </div>
  
     </div>
    )
  }else {


    return (
    <div className='w-full h-screen lg:p-20 p-0 flex md:justify-center  lg:items-center '>
    <main className='w-full md:w-[70%] lg:w-[60%] flex flex-col gap-10 lg:gap-5'>
    <nav className="lg:justify-start lg:items-center  w-full flex flex-col lg:flex-row items-start lg:w-[80%] gap-5 lg:gap-0 ">
          <div className="flex justify-between  lg:shadow-none w-full lg:w-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-5 items-center md:hidden fixed bg-white">
          <NavLink to='/dashboard/note'><img src={Back} className='w-[15px]' alt="" /></NavLink>
            <h1 className="font-[700] lg:text-[25px] text-[20px] lg:hidden">Hi,{nama.toUpperCase()}!</h1>
          </div>
        <h1 className='text-[#6889FF] font-[700] text-[30px] pl-3 lg:pl-0 mt-[90px] md:mt-[30px] lg:mt-0'>Ubah Wisata</h1>
        </nav>
      <form action="" className='flex flex-col lg:flex-row lg:justify-between lg:items-start items-center gap-10 w-full p-3 lg:p-0 md:mt-10' onSubmit={handleSubmit}>
        <div className='w-full md:w-full flex md:flex  flex-col  md:flex-col gap-6  md:gap-10 mt-[-50px]  sm:mt-[10px]  md:justify-center items-center lg:mt-5'>
          <Input value={name} onChange={(e)=>setName(e.target.value)} type="text"  />
          <Input value={email} onChange={(e)=>setEmail(e.target.value)} type="text"  />
          <Input value={phone} onChange={(e)=>setPhone(e.target.value)} type="text"  />
          <Input value={city} onChange={(e)=>setCity(e.target.value)} type="text"  />
        </div>
  
        <div className='flex w-full flex-col gap-5 md:gap-7 pt-5 items-center md:items-center'>
          <input className='w-full md:w-[370px] h-[80px] text-[#515151] placeholder:text-[#515151] outline-none rounded-[12px] pl-[25px] text-[15px] bg-[#F6F6F6]  ' required type="text"  placeholder='Masukkan Alamat' value={address} onChange={(e)=>setAddress(e.target.value)} />
          <div className='input-gambar bg-[#F6F6F6] relative h-[230px] rounded-[12px] overflow-hidden flex justify-center items-center w-full z-10 '>
          
          {
              image?(
                <>
                <input type="file" id='input' className=' w-full h-full absolute opacity-0 cursor-pointer' onChange={fileChangeHandler}  />
                <img src={image} className='w-full h-full object-cover' alt="" />
                </>
              ):(
                <>
                <input type="file" id='input' className=' w-full h-full absolute opacity-0 cursor-pointer' onChange={fileChangeHandler} />
            <div className="order flex flex-col items-center justify-center gap-5">
              <img src={Gambar} className='w-[60px]' alt="" />
              <p className='font-[200]'>Tambahkan Gambar</p>
            </div>
                </>
              )
            }
            
          </div>
          <button className='w-full md:w-[370px] h-[40px] rounded-md bg-[#6889FF] text-[#F6F6F6] font-bold'>
    {buttonStatus}
</button>
            </div>
    
          </form>
    
        </main>
    
      </div>
    )
    
  }
}

export default Ubah