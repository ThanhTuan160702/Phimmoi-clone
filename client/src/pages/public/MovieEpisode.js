import React, { useEffect, useState } from 'react'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { BodySlick, Loading } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { apiMovieEpisode, apiMovies } from '../../apis/index';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BsPlayCircleFill } from "react-icons/bs";
import path from '../../utils/path';
import { formatSlug } from '../../utils/helper';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";



const MovieEpisode = () => {

  const { nameEpisode } = useParams()

  const [movieInfomation, setMovieInfomation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [episodes, setEpisodes] = useState([])
  const navigate = useNavigate()
  const [nowEpisode, setNowEpisode] = useState('')

  const [newMovie, setNewMovie] = useState(null)

  const fetchNewMovie = async() => {
    const response = await apiMovies({sort: 'createdAt', limit: 6})
    if(response.success){
      setNewMovie(response.mes)
    }
  }

  const fetchData = async() => {
    const response = await apiMovieEpisode(nameEpisode)
    if(response.success){
      setMovieInfomation(response.mes)
      const newEpisode = []
      for (let i = 1; i <= response.mes.mid.numberOfEpisode; i++) {
        newEpisode.push(
          <div key={i}>
            {`Tập ${i}`}
          </div>
        );
      }
      setLoading(false)
      setEpisodes(newEpisode)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    fetchNewMovie()
    setNowEpisode(nameEpisode[nameEpisode.length - 1])
    window.scrollTo(0,0)
  },[nameEpisode])

  const handleEpisode = (index) => {
    navigate(`/xem-phim/${formatSlug(movieInfomation.name)}-tap-${index}`)
    window.location.reload();
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
        <span className='text-blue-500 cursor-pointer' onClick={() => navigate(`/phim-bo`)}>Phim Bộ</span>
        <MdKeyboardDoubleArrowRight color='white'/>
        <span className='text-blue-500 cursor-pointer' onClick={() => navigate(`/phim-bo/${formatSlug(movieInfomation?.name)}`)}>{movieInfomation?.name}</span>
        <MdKeyboardDoubleArrowRight color='white'/>
        <span className='text-white'>{`Tập ${movieInfomation?.episode}`}</span>
      </div>
      <div>
        <video controls className='w-full'>
          <source src={movieInfomation?.video} type="video/mp4"/>
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
      <div className='border-t-[3px] border-gray-700 border-opacity-50 flex w-full'>
        <button 
        onClick={() => {handleEpisode(Number(nowEpisode)-1)}}
        disabled={nowEpisode === '1'}
        className={nowEpisode === '1' ? 'bg-[#131313] w-1/3 text-gray-500 flex items-center justify-center py-4 gap-2' : 'bg-[#0b0b0b] w-1/3 text-gray-300 flex items-center justify-center py-4 cursor-pointer hover:text-blue-600 gap-2'}
        ><FaArrowAltCircleLeft color='white' size={20}/>PREV</button>
        <button
        onClick={() => navigate(`/phim-bo/${formatSlug(movieInfomation?.name)}`)}
        className='border-x border-black bg-[#0b0b0b] w-1/3 text-gray-300 flex items-center justify-center py-4 cursor-pointer hover:text-blue-600 gap-2'
        ><IoMdMenu color='white' size={20}/>ALL</button>
        <button 
        onClick={() => {handleEpisode(Number(nowEpisode)+1)}}
        disabled={nowEpisode === movieInfomation.mid.numberOfEpisode.toString()}
        className={nowEpisode === movieInfomation.mid.numberOfEpisode.toString() ? 'bg-[#131313] w-1/3 text-gray-500 flex items-center justify-center py-4 gap-2' : 'bg-[#0b0b0b] w-1/3 text-gray-300 flex items-center justify-center py-4 cursor-pointer hover:text-blue-600 gap-2'}
        >NEXT<FaArrowAltCircleRight color='white' size={20}/></button>
      </div>
      <div className='flex flex-col gap-3 px-8 py-5 border-gray-700 border-opacity-50 border-b-[3px]'>
        <span className='text-white text-xl'>Chọn tập phim</span>
        <span className='text-gray-300 text-sm flex gap-3'>
          {episodes.map((el, index) => (
            <button 
            key={index}
            disabled={nowEpisode === (index+1).toString()}
            onClick={() => {handleEpisode(index+1)}} 
            className={nowEpisode === (index+1).toString() ? 'text-gray-300 text-base bg-gray-900 p-2 rounded-sm' : 'text-white text-base bg-gray-700 p-2 rounded-sm cursor-pointer hover:bg-blue-500'}
            >{el}</button>
          ))}
        </span>
      </div>
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

export default MovieEpisode