import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Detail from '../dashboard/Detail'
import NotFound from '../notfound/NotFound'
import Login from '../Pages/Login'
import Register from '../Pages/Register'


const Index = () => {
  return (
    <div> 
        <BrowserRouter>
        <Routes>
           
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route 
            path='/dashboard/*'
            element={
                
                    <Dashboard/>
                
            }/>
            <Route path='/detail/:id' element={<Detail/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Index