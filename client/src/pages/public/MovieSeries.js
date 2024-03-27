import React, { useEffect, useState } from 'react'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import {useNavigate, useParams} from 'react-router-dom'
import path from '../../utils/path';
import {actorTest} from '../../utils/contants'
import cast from '../../assets/cast.png'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BodySlick, Loading } from '../../components';
import { apiMovie, apiMovies } from '../../apis/index'
import { formatSlug } from '../../utils/helper';

const MovieSeries = () => {

  const [movieInfomation, setMovieInfomation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [episodes, setEpisodes] = useState([])
  const [categories, setCategories] = useState([])
  const [date, setDate] = useState(null)

  const { movieSeries } = useParams()

  const [newMovie, setNewMovie] = useState(null)

  const fetchNewMovie = async() => {
    const response = await apiMovies({sort: 'createdAt', limit: 6})
    if(response.success){
      setNewMovie(response.mes)
    }
  }

  const fetchData = async() => {
    const response = await apiMovie('Phim Bộ',movieSeries)
    if(response.success){
      setMovieInfomation(response.mes)
      const newEpisode = []
      for (let i = 1; i <= response.mes.numberOfEpisode; i++) {
        newEpisode.push(
          <div key={i}>
            {`Tập ${i}`}
          </div>
        );
      }
      setCategories(response.mes.category.split(", "))
      setEpisodes(newEpisode)
      const dateString = response.mes.date
      const dateObj = new Date(dateString);
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('en-US', options);
      setDate(formattedDate)
      setLoading(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    fetchNewMovie()
    window.scrollTo(0,0)
  },[movieSeries])


  const navigate = useNavigate()
  const [isTabs, setIsTabs] = useState(1)

  const handleEpisode = (index) => {
    navigate(`/xem-phim/${movieSeries}-tap-${index}`)
  }

  return (
    <div className='w-full'>
      {loading ? (
        <Loading type='balls' color='red'/>
      ) :
      movieInfomation
      ? 
      <div>
        <div className='flex items-center p-2 gap-3'>
        <span className='text-blue-500 cursor-pointer' onClick={() => navigate(`/${path.HOME}`)}>Trang chủ</span>
        <MdKeyboardDoubleArrowRight color='white'/>
        <span className='text-blue-500 cursor-pointer' onClick={() => navigate(`/phim-bo`)}>{movieInfomation?.movieSingleOrSeries}</span>
        <MdKeyboardDoubleArrowRight color='white'/>
        <span className='text-white'>{movieInfomation?.name}</span>
      </div>
      <div className='flex p-6 gap-6 border-gray-700 border-opacity-50 border-b-[3px]'>
        <div>
          <img src={movieInfomation?.imageThumbnail} alt='image1' className='w-[180px]'/>
        </div>
        <div className='flex flex-col w-full gap-1'>
          <span className='text-3xl text-white'>{movieInfomation?.name}</span>
          <span className='text-sm text-[#cbcbcb]'>{movieInfomation?.nameEng}</span>
          <div className='flex gap-3'>
            <span className='text-gray-400'>{date}</span>
            <span className='text-gray-400'>{movieInfomation?.time}</span>
            <span className='text-gray-400'>{movieInfomation?.nation}</span>
          </div>
          <div className='border-b border-t border-gray-700 border-opacity-50 py-2 mt-2'>
            <div className='w-[50px] bg-[#232323] rounded-lg'>
              <span className='flex items-center justify-center p-3 text-xl text-white'>{movieInfomation?.star}</span>
            </div>
          </div>
          <div className='flex gap-2 mt-2'>
            {categories.map((el, index) => (
              <span onClick={() => navigate(`/the-loai/${formatSlug(el)}`)} key={index} className={index !== (categories.length) - 1 ? 'text-white border-r border-white pr-2 hover:text-blue-600 cursor-pointer' : 'text-white hover:text-blue-600 cursor-pointer'}>{el}</span>
            ))}
          </div>
        </div>
      </div>
      <div className='flex border-gray-700 border-opacity-50 border-b-[3px] px-6 py-3 gap-2'>
        <span className={isTabs === 1 ? 'bg-blue-600 p-2 text-sm text-white rounded-md cursor-pointer' : 'p-2 text-sm text-white rounded-md cursor-pointer hover:text-blue-600'} onClick={() => setIsTabs(1)}>Xem phim</span>
        <span className={isTabs === 2 ? 'bg-blue-600 p-2 text-sm text-white rounded-md cursor-pointer' : 'p-2 text-sm text-white rounded-md cursor-pointer hover:text-blue-600'} onClick={() => setIsTabs(2)}>Thông tin</span>
        <span className={isTabs === 3 ? 'bg-blue-600 p-2 text-sm text-white rounded-md cursor-pointer' : 'p-2 text-sm text-white rounded-md cursor-pointer hover:text-blue-600'} onClick={() => setIsTabs(3)}>Diễn viên</span>
      </div>
      {isTabs === 1 && <div className='flex flex-col gap-3 px-8 py-5 border-gray-700 border-opacity-50 border-b-[3px]'>
        <span className='text-white text-xl'>Chọn tập phim</span>
        <span className='text-gray-300 text-sm flex gap-3'>
          {episodes.map((el, index) => (
            <span key={el._id} onClick={() => {handleEpisode(index+1)}} className='text-white text-base bg-gray-700 p-2 rounded-sm cursor-pointer hover:bg-blue-500'>{el}</span>
          ))}
        </span>
      </div>}
      {isTabs === 2 && <div className='flex flex-col gap-3 px-8 py-5 border-gray-700 border-opacity-50 border-b-[3px]'>
        <span className='text-white text-xl'>Tóm Tắt</span>
        <span className='text-gray-300 text-sm'>{movieInfomation?.description}</span>
      </div>}
      {isTabs === 3 && <div className='flex flex-col gap-3 px-8 py-3 border-gray-700 border-opacity-50 border-b-[3px]'>
        <div>
          <span className='text-white text-xl'>Đạo diễn</span>
          <div className='flex border-b border-gray-700 border-opacity-50 max-w-[250px] h-[70px] gap-2 mt-4'>
            <img src={cast} alt='img' className='w-[60px] h-[60px]'/>
            <div className='flex flex-col'>
              <span className='text-white text-base'>Joshua Dixon</span>
              <span className='text-gray-300 text-sm'>Director</span>
            </div>
          </div>
        </div>
        <div className=''>
          <span className='text-white text-xl'>Diễn viên</span>
          <div className='flex flex-wrap'>
            {actorTest.map(el => (
              <div className='flex border-b border-gray-700 border-opacity-50 w-[260px] h-[70px] gap-2 mt-4'>
                <img src={cast} alt='img' className='w-[60px] h-[60px]'/>
                <div className='flex flex-col'>
                  <span className='text-white text-base'>{el.nameReal}</span>
                  <span className='text-gray-300 text-sm'>{el.nameFake}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>}
      <div className='px-8 py-5 flex items-center gap-2 border-b-[3px] border-gray-700 border-opacity-50'>
        <span className='text-gray-300'>Chia sẻ</span>
        <span className='pr-2 border-r text-white text-xl'>10</span>
        <div className='flex gap-2'>
          <FaFacebookF size={23} className='cursor-pointer text-white hover:text-blue-600'/>
          <FaTwitter size={23} className='cursor-pointer text-white hover:text-blue-600'/>
        </div>
      </div>
      <div className='px-8 py-5 flex flex-col'>
        <span className='text-white font-semibold mb-2'>Phim mới</span>
        <BodySlick data={newMovie}/>
      </div>
      </div> 
      : 
      <div className='p-8 flex flex-col gap-3'>
        <span className='text-xl text-white border-l-[3px] px-2'>Không tìm thấy trang</span>
        <span className='text-gray-300 text-3xl'>ERROR 404</span>
      </div>}
    </div>
  )
}

export default MovieSeries