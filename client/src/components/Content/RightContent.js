import React, { useEffect, useState } from 'react'
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import image1 from '../../assets/hellhound2.jpg'
import { FaStar } from "react-icons/fa";
import { apiMovies } from '../../apis/movie';
import { formatSlug, formatYear } from '../../utils/helper';

const RightContent = () => {

  const navigate = useNavigate()

  const years = [];
  for (let year = 2024; year >= 1974; year--) {
      years.push(year);
  }

  const [movies, setMovies] = useState(null)

  const fetchData = async() => {
    const response = await apiMovies({category: 'Phim Hành Động'})
    if(response.success){
      setMovies(response.mes)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
      <div onClick={() => navigate(`/phim-le/cho-san-dia-nguc`)} className='mt-8 relative'>
        <img src={image1} alt='image1' className='two-thirds-image hover:blur-[1px] cursor-pointer'/>
        <span className='absolute text-white top-[75px] left-[5px] text-base'>Chó Săn Địa Ngục</span>
        <span className='absolute text-white top-[95px] left-[5px] text-xs'>2024</span>
      </div>
      {movies?.map(el => (
        <div onClick={() => navigate(`/${formatSlug(el.movieSingleOrSeries)}/${formatSlug(el.name)}`)} key={el._id} className='flex bg-[#0e0e0e] hover:bg-black cursor-pointer mb-3'>
          <div>
            <img src={el.imageThumbnail} alt='image2' className='h-[110px] w-[85px]'/>
          </div>
          <div className='py-2 px-2 flex flex-col gap-1'>
            <span className='text-xs font-semibold text-[#cbcbcb]'>{el.name}</span>
            <div className='flex items-center justify-start gap-2'>
              <div className='border border-gray-400 flex items-center justify-center gap-1 px-2 rounded-md'>
                <FaStar color='gray' size={15}/>
                <span className='text-[#cbcbcb] text-sm'>{el.star}</span>
              </div>
              <span className='text-[#cbcbcb]'>{formatYear(el.date)}</span>
            </div>
          </div>
      </div>
      ))}
    </div>
  )
}

export default RightContent