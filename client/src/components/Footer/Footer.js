import React from 'react'
import Icon from '../../assets/film.png'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

const Footer = () => {

  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className='w-full'>
      <div className='flex gap-3 border-b border-gray-700 h-[200px]'>
        <div className='w-[40%] flex flex-col'>
          <div className='flex flex-col'>
            <img src={Icon} alt='img' className='w-[60px]'/>
            <span className='text-[#cbcbcb]'>PhimCu</span>
          </div>
          <span className='text-sm max-w-[390px] text-[#cbcbcb]'>Phimcu - Trang xem phim Online với giao diện mới được bố trí và thiết kế thân thiện với người dùng. Nguồn phim được tổng hợp từ các website lớn với đa dạng các đầu phim và thể loại vô cùng phong phú.</span>
        </div>
        <div className='w-[20%] flex flex-col gap-1'>
          <span className='mb-1 text-base text-[#cbcbcb]'>Phim mới</span>
          <span className='text-blue-700 text-sm'>Phim Khoa Học</span>
          <span className='text-blue-700 text-sm'>Phim Kinh Dị</span>
          <span className='text-blue-700 text-sm'>Phim Chiếu Rạp</span>
          <span className='text-blue-700 text-sm'>Phim Hình Sự</span>
          <span className='text-blue-700 text-sm'>Phim Hành Động</span>
        </div>
        <div className='w-[20%] flex flex-col gap-1'>
          <span className='mb-1 text-base text-[#cbcbcb]'>Phim hay</span>
          <span className='text-blue-700 text-sm'>Phim Âu Mỹ</span>
          <span className='text-blue-700 text-sm'>Phim Hàn Quốc</span>
          <span className='text-blue-700 text-sm'>Phim Trung Quốc</span>
          <span className='text-blue-700 text-sm'>Phim Nhật Bản</span>
          <span className='text-blue-700 text-sm'>Phim Thái Lan</span>
        </div>
        <div className='w-[20%] flex flex-col gap-1'>
          <span className='mb-1 text-base text-[#cbcbcb]'>Thông tin</span>
          <span className='text-blue-700 text-sm'>Giới thiệu</span>
          <span className='text-blue-700 text-sm'>Liên hệ chúng tôi</span>
          <span className='text-blue-700 text-sm'>Điều khoản sử dụng</span>
          <span className='text-blue-700 text-sm'>Chính sách riêng tư</span>
          <span className='text-blue-700 text-sm'>Khiếu nại bản quyền</span>
        </div>
      </div>
      <div className='flex justify-between items-center py-3'>
        <div className='text-[#cbcbcb]'>© Phimcu</div>
        <div className='flex items-center gap-4'>
          <FaFacebookF size={20} className='cursor-pointer text-white hover:text-blue-500'/>
          <FaInstagram size={20} className='cursor-pointer text-white hover:text-blue-500'/>
          <FaTwitter size={20} className='cursor-pointer text-white hover:text-blue-500'/>
          <FaYoutube size={20} className='cursor-pointer text-white hover:text-blue-500'/>
          <div className='bg-[#cbcbcb] p-2 rounded-2xl cursor-pointer' onClick={() => onTop()}>
            <IoIosArrowUp/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer