import React from 'react'
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import image1 from '../../assets/hackimcodienthumbnail.jpg'
import image2 from '../../assets/takhixuenfield.jpg'
import image3 from '../../assets/thegioimaquai.jpg'
import image4 from '../../assets/changquycuatoi.jpg'
import image5 from '../../assets/thegioimaquai.jpg'
import { FaStar } from "react-icons/fa";

const RightContent = () => {

  const navigate = useNavigate()

  const years = [];
  for (let year = 2024; year >= 1974; year--) {
      years.push(year);
  }

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center'>
        <span className='text-[#cbcbcb]'>Năm phát hành</span>
        <FaCaretDown color='gray' size={20}/>
      </div>
      <div className='flex justify-center h-[150px] overflow-y-auto scroll-container mt-2'>
        <div className='flex flex-wrap'>
          {years.map((el) => (
            <span 
            key={el} 
            className='mr-2 mb-2 bg-[#0e0e0e] text-[#cbcbcb] w-[90px] px-2 py-1 flex items-center justify-center text-sm hover:bg-blue-600 cursor-pointer'
            onClick={()=> navigate(`/nam-phat-hanh/${el}`)}
            >{el}</span>
          ))}
        </div>
      </div>
      <div className='mt-8 relative'>
        <img src={image1} alt='image1' className='two-thirds-image hover:blur-[1px] cursor-pointer'/>
        <span className='absolute text-white top-[75px] left-[5px] text-base'>Hắc Kim Cổ Điện</span>
        <span className='absolute text-white top-[95px] left-[5px] text-xs'>2023</span>
      </div>
      <div className='flex bg-[#0e0e0e] hover:bg-black cursor-pointer'>
        <div>
          <img src={image2} alt='image2' className='h-[100px] w-[85px]'/>
        </div>
        <div className='py-1 px-2 flex flex-col gap-1'>
          <span className='text-base text-[#cbcbcb]'>Tà Khí Xứ Enfield</span>
          <div className='flex items-center justify-start gap-2'>
            <div className='border border-gray-400 flex items-center justify-center gap-1 px-2 rounded-md'>
              <FaStar color='gray' size={15}/>
              <span className='text-[#cbcbcb]'>9.8</span>
            </div>
            <span className='text-[#cbcbcb]'>2023</span>
          </div>
        </div>
      </div>
      <div className='flex bg-[#0e0e0e] mt-3 hover:bg-black cursor-pointer'>
        <div>
          <img src={image3} alt='image2' className='h-[100px] w-[85px]'/>
        </div>
        <div className='py-1 px-2 flex flex-col gap-1'>
          <span className='text-base text-[#cbcbcb]'>Thế giới ma quái</span>
          <div className='flex items-center justify-start gap-2'>
            <div className='border border-gray-400 flex items-center justify-center gap-1 px-2 rounded-md'>
              <FaStar color='gray' size={15}/>
              <span className='text-[#cbcbcb]'>9.8</span>
            </div>
            <span className='text-[#cbcbcb]'>2023</span>
          </div>
        </div>
      </div>
      <div className='flex bg-[#0e0e0e] mt-3 hover:bg-black cursor-pointer'>
        <div>
          <img src={image4} alt='image2' className='h-[100px] w-[85px]'/>
        </div>
        <div className='py-1 px-2 flex flex-col gap-1'>
          <span className='text-base text-[#cbcbcb]'>Chàng Quỷ Của Tôi</span>
          <div className='flex items-center justify-start gap-2'>
            <div className='border border-gray-400 flex items-center justify-center gap-1 px-2 rounded-md'>
              <FaStar color='gray' size={15}/>
              <span className='text-[#cbcbcb]'>9.8</span>
            </div>
            <span className='text-[#cbcbcb]'>2023</span>
          </div>
        </div>
      </div>
      <div className='flex bg-[#0e0e0e] mt-3 hover:bg-black cursor-pointer'>
        <div>
          <img src={image5} alt='image2' className='h-[100px] w-[85px]'/>
        </div>
        <div className='py-1 px-2 flex flex-col gap-1'>
          <span className='text-base text-[#cbcbcb]'>Thế Giới Ma Quái</span>
          <div className='flex items-center justify-start gap-2'>
            <div className='border border-gray-400 flex items-center justify-center gap-1 px-2 rounded-md'>
              <FaStar color='gray' size={15}/>
              <span className='text-[#cbcbcb]'>9.8</span>
            </div>
            <span className='text-[#cbcbcb]'>2023</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightContent