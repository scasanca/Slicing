import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../Component/Sidebar'
import Home from './Home'
import Table from './Table'
import Tambah from './Tambah'
import Ubah from './Ubah'
import NotFound from '../notfound/NotFound'
import { StateContext } from '../context/StateContext'

const Dashboard = () => {
  return (
  <div>
   <StateContext>
  <div className='relative'>
    <Sidebar/>
</div>
    <Routes>
    <Route path='/home' element={<Home/>}  />
    <Route path='/note' element={<Table />} />
    <Route path='/tambah' element={<Tambah />} />
    <Route path='/edit/:id' element={<Ubah />} />
    <Route path='/*' element={<NotFound/>}/>   
    </Routes>
    
   </StateContext>

  </div>
  )
}

export default Dashboard
  


