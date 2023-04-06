import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "../Component/Card";
import Search from "../Component/Search";
import instance from "../api/api";
import { useStateContext } from "../context/StateContext";
import { RxHamburgerMenu } from "react-icons/rx";


const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setSidebar,showUser,setUser,checkUserToken} =useStateContext()
  const [filterData, setFilterData] = useState([])
  useEffect 
    (() => {
      checkUserToken()
      setLoading(true)
      setSidebar(false)
      setUser(true)
      const getData = () => {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "/index",
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
            setFilterData(response.data.data)
            setLoading(false)
          })
          .catch((error) => {
            console.log(error);
            setLoading(false)
          });
      };
      getData();
    },[]);
  
    const handleSearch= (valueInput)=>{
    const filterData = data.filter((item)=>{
    const value = valueInput.toLowerCase()
    const itemData = item.name.toLowerCase()
    return itemData.includes(value)
  }
  )
  if(valueInput.length > 0 && filterData.length === 0 ){
    setFilterData([])
  }else{
    setFilterData(filterData)
  }
  
}
  
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center ">
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  } else {
    return (
      <div>        
        <main className="w-full flex-col flex items-center">
          <nav className="md:flex md:justify-between w-full flex flex-col md:flex-row items-center md:w-[80%] md:mt-10  ">
          <div className="flex justify-between md:shadow-none w-full md:w-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:p-0 p-5 fixed   md:static bg-white z-10">
            <h1 className="md:hidden" onClick={()=>{
              setSidebar(true)
              setUser(false)
              }}><RxHamburgerMenu/></h1>
            <h1 className="font-[700] md:text-[25px]">{showUser()}</h1>
          </div>
            <Search  onChange={handleSearch} />
          </nav>

          <div className=" content w-full ms:w-full flex ms:justify-end lg:justify-center ms:pr-4 md:pl-[70px] flex-wrap gap-x-[30px] gap-y-[30px] justify-center  mt-[65px]  ">
          {filterData.length > 0 ? (
filterData.map((item) => (
<Card
               key={item.id}
               id={item.id}
               src={item.photo}
               alt={item.name}
               name={item.name}
               address={item.address}
               city={item.city}
               phone={item.phone}
             />
))
) : (
<div className="w-full h-[350px] flex justify-center items-center">
<h1>Hasil Tidak Ada</h1>
</div>
)}
     
          </div>
        </main>
        <footer className="w-full h-[130px] bg-[#6889FF] mt-[100px] flex  flex-col  justify-center items-center text-white">
          <p className="">Footer Component</p>
          <p>Copyright 2023 All right reserved</p>
        </footer>
      </div>
    );
  }
};

export default Home;
