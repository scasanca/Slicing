import React, { useEffect, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import instance from "../api/api";
import { RxHamburgerMenu } from "react-icons/rx";
import { useStateContext } from "../context/StateContext";



const Table = () => {
  const [data, setData] = useState([])
  const [Loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [isDelete, setisDelete] = useState(false)
  const {setSidebar,showUser,setUser,checkUserToken} = useStateContext()

  useEffect(() => {
    const checkUserToken = () => {
    const userToken = localStorage.getItem('token')
    if(!userToken || userToken === 'undefined') {
      return navigate ('/')
    }
  }
  checkUserToken()
  }, [])
  
  useEffect(()=>{
    setLoading(true)
    checkUserToken()
    setSidebar(false)
    setUser(true)
  const getData =() => {
    let config = {
method: 'get',
maxBodyLength: Infinity,
url: '/index',
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
setLoading(false)
})
.catch((error) => {
console.log(error);
setLoading(false)
});

  }
  getData()
},[isDelete])

const handleDelete = (id) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `/delete/${id}`,
    headers: { 
      Authorization :
      `Bearer ${localStorage.getItem('token')}`,
    },
    data:data,
    }
    
    instance
    .request(config)
    .then((response) => {
      console.log(`ini delete`);
    console.log(JSON.stringify(response.data))
    setisDelete(!isDelete)
    })
    
}

if (Loading) {
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
    <main className='w- flex flex-col justify-center ms:items-center  ms:overflow-x-auto'>
     <nav className="md:justify-start items-start md:items-center w-full flex flex-col md:flex-row md:w-[80%] gap-5 bg-indigo-300 ">
          <div className="flex justify-between  md:shadow-none w-full md:hidden md:w-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-5 items-center fixed bg-white md:static z-10 ">
          <span onClick={()=>{
            setSidebar(true)
            setUser(false)
          }} className="md:hidden"><RxHamburgerMenu/></span>
            <h1 className="font-[700] md:text-[25px] text-[20px] md:hidden">{showUser()}</h1>
          </div>
        </nav>
          <div className="table-container w-full flex-col md:pl-24 md:pr-24  overflow-x-auto flex lg:justify-center ">
        <h1 className='text-[25px] font-[700] lg:mb-5 mb-5 pl-5 lg:mt-14 mt-[100px] md:mt-14  text-[#6889FF]'>Tabel Wisata</h1>
        <div className="md:overflow-x-auto flex lg:justify-center ">
  <table className="rounded-[20px] overflow-hidden shadow-lg md:mt-14 ">
    <thead>
      <tr className="bg-[#E7EAF0] text-[#212529]">
        <th className="text-center font-[500] p-2">No</th>
        <th className="text-center font-[500] p-2">Nama</th>
        <th className="text-center font-[500] p-2">Alamat</th>
        <th className="text-center font-[500] p-2">No Telefon</th>
        <th className="text-center font-[500] p-2">Email</th>
        <th className="text-center font-[500] p-2">Aksi</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td className="text-center p-2">{index+1}</td>
          <td className="p-2">{item.name}</td>
          <td className="p-2">{item.address}</td>
          <td className="p-2">{item.phone}</td >
          <td className="p-2">{item.email}</td>
          <td className="p-2 flex gap-2">
            <Link to={`/detail/${item.id}`}>
              <button className="min-w-[45px] min-h-[45px] border-[1px] flex justify-center items-center border-[#E8EBF0] text-[25px] rounded-[6px] text-[#465170] hover:scale-110">
                <FiInfo />
              </button>
            </Link>

            <Link to={`/dashboard/edit/${item.id}`}>
              <button className="min-w-[45px] min-h-[45px] hover:scale-110 border-[1px] flex justify-center items-center border-[#E8EBF0] text-[25px] rounded-[6px] text-[#465170]">
                <CiEdit />
              </button>
            </Link>
            <button className="min-w-[45px] min-h-[45px] hover:scale-110 border-[1px] flex justify-center items-center border-[#E8EBF0] text-[25px] rounded-[6px] text-[#465170]" onClick={() => handleDelete(item.id)}>
                  <RiDeleteBin4Line />      
                </button>

              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
      </div>
      
    </div>
    </main>
  );
  

  
 
  
        }
    }

export default Table;

      