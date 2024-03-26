import React from 'react'
import { AdminSiderbar } from '../../utils/contants'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatSlug } from '../../utils/helper'

const AdminSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div>
      {AdminSiderbar.map((el)=> (
        <div 
        onClick={()=> navigate(`${formatSlug(el.text)}`)} 
        key={el.id} 
        className={location.pathname.includes(`/admin/${formatSlug(el.text)}`) ? 'p-3 border-b text-white cursor-pointer bg-red-500' : 'p-3 border-b text-white cursor-pointer'}
        >
          {el.text}
        </div>
      ))}
    </div>
  ) 
}

export default AdminSidebar