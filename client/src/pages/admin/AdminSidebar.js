import React from 'react'
import { AdminSiderbar } from '../../utils/contants'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatSlug } from '../../utils/helper'
import Icon from '../../assets/film.png'
import path from '../../utils/path'

const AdminSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div>
      <div onClick={() => navigate(`/${path.HOME}`)} className='w-[full] bg-[#212020] cursor-pointer flex flex-col items-center justify-center'>
        <img src={Icon} alt='icon' className='w-[50px]'/>
        <span>Phimmoi-clone</span>
      </div>
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