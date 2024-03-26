import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const Admin = () => {
  return (
    <div className='w-full flex'>
      <div className='w-[20%] h-screen'>
        <AdminSidebar/>
      </div>
      <div className='w-[80%] h-screen bg-gray-300'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Admin