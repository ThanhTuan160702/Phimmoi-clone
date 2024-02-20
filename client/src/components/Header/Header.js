import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import { Category, Nation} from '../index';
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import Icon from '../../assets/film.png'
const Header = () => {

    const [isHoverCategory, setIsHoverCategory] = useState(false);
    const [isHoverNation, setIsHoverNation] = useState(false);
    const navigate = useNavigate()

  return (
    <div className='relative w-full'>
        <div className='bg-[#151414] w-full flex justify-center items-center text-center h-[70px]'>
            <div className='w-main flex justify-between h-full items-center'>
                <div className='h-full text-[#cbcbcb] flex justify-center items-center gap-10'>
                    <div className='w-[190px] bg-[#212020] cursor-pointer h-full flex flex-col items-center justify-center'>
                        <img src={Icon} alt='icon' className='w-[50px]' onClick={() => navigate(`${path.HOME}`)}/>
                        <span>Phimcu</span>
                    </div>
                    <span className='h-full flex justify-center items-center cursor-pointer hover:text-blue-700' onClick={() => navigate(`${path.HOME}`)}>Phimmoi</span>
                    <span className='h-full flex justify-center items-center cursor-pointer hover:text-blue-700' onClick={() => navigate(`/phim-le`)}>Phim lẻ</span>
                    <span className='h-full flex justify-center items-center cursor-pointer hover:text-blue-700' onClick={() => navigate(`/phim-bo`)}>Phim bộ</span>
                    <span className='h-full flex justify-center items-center gap-1 cursor-pointer hover:text-blue-700' onMouseEnter={() => setIsHoverCategory(true)} onMouseLeave={() => setIsHoverCategory(false)}>Thể loại <FaCaretDown /></span>
                    <span className='h-full flex justify-center items-center gap-1 cursor-pointer hover:text-blue-700' onMouseEnter={() => setIsHoverNation(true)} onMouseLeave={() => setIsHoverNation(false)}>Quốc gia <FaCaretDown /></span>
                </div>
                <div className='flex justify-center items-center'>
                    <input type='text' className='bg-[#212020] p-4 h-[40px] w-[300px] outline-none rounded-lg rounded-r-none text-[#cbcbcb]' placeholder='Tìm kiếm...'/>
                    <button className='bg-[#212020] h-[40px] rounded-r-lg flex justify-center items-center p-2'>
                        <CiSearch color='white' size={23}/>
                    </button>
                </div>
            </div>
        </div>
        <div onMouseEnter={() => setIsHoverCategory(true)} onMouseLeave={() => setIsHoverCategory(false)} className='w-[550px] absolute right-[290px] z-50'>
            {isHoverCategory && <Category/>}
        </div>
        <div onMouseEnter={() => setIsHoverNation(true)} onMouseLeave={() => setIsHoverNation(false)} className='w-[550px] absolute right-[160px] z-50'>
            {isHoverNation && <Nation/>}
        </div>
    </div>
  )
}

export default Header