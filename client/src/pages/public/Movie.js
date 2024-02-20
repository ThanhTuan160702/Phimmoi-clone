import React from 'react'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { BsPlayCircleFill } from "react-icons/bs";
import {useNavigate, useParams} from 'react-router-dom'
import path from '../../utils/path';
import Image from '../../assets/chosandianguc.jpg'

const Movie = () => {

  const navigate = useNavigate()
  const {movieLeOrBo} = useParams()

  return (
    <div className='w-full'>
      <div className='flex items-center p-2 gap-3'>
        <span className='text-blue-500 cursor-pointer' onClick={() => navigate(`/${path.HOME}`)}>Trang chủ</span>
        <MdKeyboardDoubleArrowRight />
        <span className='text-blue-500 cursor-pointer' onClick={() => navigate(`/${movieLeOrBo}`)}>{movieLeOrBo === 'phim-le' ? 'Phim Lẻ' : 'Phim Bộ'}</span>
        <MdKeyboardDoubleArrowRight />
        <span className='text-white'>Chó Săn Địa Ngục</span>
      </div>
      <div>
        <video controls className='w-full'>
          <source src='https://res.cloudinary.com/dqngoi6i5/video/upload/v1708442857/Phimmoi-clone/HELLHOUND_Official_Trailer_2024_tfeemn.mp4' type="video/mp4"/>
        </video>
      </div>
      <div className='flex items-center justify-between py-4 px-5 bg-[#070707]'>
        <span className='text-white text-lg'>Chọn server</span>
        <span className='bg-black text-blue-700 p-1 text-xs'>Report Error</span>
      </div>
      <div className='bg-[#0b0b0b] p-5 gap-2 flex flex-col'>
        <div className='flex items-center p-4 gap-2 bg-[#232323] cursor-pointer hover:text-blue-700 text-white'>
          <BsPlayCircleFill color='white' size={20}/>
          <span className='hover:text-blue-700'>Vietsub</span>
        </div>
        <span className='text-yellow-500 text-sm'>Nếu không xem được vui lòng đổi server #2 hoặc #3 hoặc tải lại trang !</span>
      </div>
      <div className='flex p-6 gap-6 border-gray-700 border-opacity-50 border-b-[3px]'>
        <div>
          <img src={Image} alt='image1' className='w-[180px]'/>
        </div>
        <div className='flex flex-col w-full gap-1'>
          <span className='text-3xl text-white'>Chó Săn Địa Ngục</span>
          <span className='text-sm text-[#cbcbcb]'>Hellhound 2024</span>
          <div className='flex gap-3'>
            <span className='text-gray-300'>Feb. 14, 2024</span>
            <span className='text-gray-300'>103 phút</span>
            <span className='text-gray-300'>Mỹ</span>
          </div>
          <div className='border-b border-t border-gray-700 border-opacity-50 py-2 mt-2'>
            <div className='w-[50px] bg-[#232323] rounded-lg'>
              <span className='flex items-center justify-center p-3 text-xl text-white'>4.7</span>
            </div>
          </div>
          <div className='flex gap-2 mt-2'>
            <span className='text-white'>Phim Hành Động</span>
            <span className='text-white'>Phim Hình Sự</span>
          </div>
        </div>
      </div>
      <div className='flex border-gray-700 border-opacity-50 border-b-[3px] px-6 py-3 gap-2'>
        <span className='bg-blue-600 p-2 text-sm text-white rounded-md'>Thông tin</span>
        <span className='bg-blue-600 p-2 text-sm text-white rounded-md'>Diễn viên</span>
      </div>
    </div>
  )
}

export default Movie