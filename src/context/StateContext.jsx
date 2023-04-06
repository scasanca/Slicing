import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Context= createContext()
export const StateContext = ({children}) => {
    const [sidebar, setSidebar] = useState(false)
    const [user, setUser] = useState(true)
    const showSidebar =()=> (sidebar?'':'hidden')
    const showUser = ()=>(user?`Hi,${userName.toUpperCase()}!`:'')
    const navigate = useNavigate();
    const [userName, setUserName] = useState('')
    const checkUserToken = () => {
      const userToken = localStorage.getItem("token");
      const userName = localStorage.getItem("user");
      if (!userToken || userToken === "undefined" && !userName || userName === "undefined" ) {
          return navigate("/");
        }else{
          return setUserName(userName.replace(/[0-9]/gi, ""))
        }
      };
    return (
        <Context.Provider value={{sidebar,setSidebar,showSidebar,showUser,setUser,checkUserToken}}>{children}</Context.Provider>
  )
}

export const useStateContext = ()=> useContext(Context)