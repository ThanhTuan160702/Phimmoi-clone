import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiAllMovieEpisode, apiMovies } from '../../apis';
import { Pagination } from '../../components';
import { useDebounce } from '@uidotdev/usehooks';
import queryString from 'query-string';
import { BeatLoader } from 'react-spinners';
import { CiSearch } from 'react-icons/ci';

const AdminMovieEpisode = () => {
  const { pageNumber} = useParams()
  const defaultPageNumber = pageNumber ? Number(pageNumber) : 1;
  const [totalPage, setTotalPage] = useState(null)
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState(null)
  const [loading, setLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(search, 2000);
  const location = useLocation()
  const searchParams = queryString.parse(location.search);
  const navigate = useNavigate()

  const searchMovie = (el) => {
    if(el.length > 0){
        setLoading(true)
    }
    setSearch(el)
  }

  const handleChangePage = (text) => {
    if(text === '+'){
      navigate(`/admin/cac-tap-phim/page/${Number(defaultPageNumber)+1}`)
    }else{
      navigate(`/admin/cac-tap-phim/page/${Number(defaultPageNumber)-1}`)
    }
  }

  const fetchSearch = async(debouncedSearchTerm) => {
    navigate(`/admin/cac-tap-phim/page/1`)
    const response = await apiAllMovieEpisode({slug: debouncedSearchTerm})
    if(response.success){
        setMovies(response.mes)
        setTotalPage(Math.ceil(response.counts/5))
    }
    setLoading(false)
  }

  useEffect(()=>{
    if(debouncedSearchTerm?.length > 0){
      fetchSearch(debouncedSearchTerm)
      setLoading(false)
    }else{
      fetchData()
    }
},[debouncedSearchTerm])

const fetchData = async(search) => {
  if(search){
    const response = await apiAllMovieEpisode({page: Number(defaultPageNumber), slug: search})
    if(response.success){
      setMovies(response.mes)
      setTotalPage(Math.ceil(response.counts/5))
    }
  }else{
    const response = await apiAllMovieEpisode({page: Number(defaultPageNumber)})
    if(response.success){
      setMovies(response.mes)
      setTotalPage(Math.ceil(response.counts/5))
    }
  }
}

useEffect(() => {
  setSearch(searchParams.s)
},[searchParams.s])

useEffect(() => {
  if(search?.length > 0){
    fetchData(search)
  }else{
    fetchData()
  }
  window.scrollTo(0,0)
}, [defaultPageNumber])

  return (
    <div className='p-8'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-4xl mb-1'>Các Tập Phim</h1>
        <div className='flex'>
        <input
          value={search}
          onChange={(el) => searchMovie(el.target.value)}
          type='text' 
          className='bg-[#212020] p-4 h-[40px] w-[300px] outline-none rounded-lg rounded-r-none text-[#cbcbcb]' 
          placeholder='Tìm kiếm...'/>
          <button className='bg-[#212020] h-[40px] rounded-r-lg flex justify-center items-center p-2'>
            {loading ? <BeatLoader color="#36d7b7" size={5}/> :<CiSearch color='white' size={23}/>}
          </button>
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex flex-col gap-2'>
          <div className='flex w-full gap-2 border-b border-gray-700 border-opacity-50'>
            <span className='w-[5%] flex items-center justify-center'>#</span>
            <span className='w-[5%]'>Image</span>
            <span className='w-[20%]'>Name</span>
            <span className='w-[20%]'>Episode</span>
            <span className='w-[20%]'>Actions</span>
          </div>
          {movies?.map((el, index)=>(
            <div className='flex gap-2 border-b border-gray-700 border-opacity-50 pb-2'>
              <span className='w-[5%] flex items-center justify-center'>{defaultPageNumber > 1 ? (defaultPageNumber-1)*5 + index + 1 : index + 1}</span>
              <span className='w-[5%]'>
                <img src={el.mid.imageThumbnail} alt='img'/>
              </span>
              <span className='w-[20%]'>{el.name}</span>
              <span className='w-[20%]'>{el.episode}</span>
              <span className='w-[20%]'>Action</span>
            </div>
          ))}
        </div>
        {totalPage > 1 && <div className='p-3 flex items-center justify-end'>
          <Pagination currentNow={defaultPageNumber} handleChangePage={handleChangePage} TotalPage={6} path={`/admin/cac-tap-phim/page/`} admin={'admin'}/>
        </div>}
      </div>
    </div>
  )
}

export default AdminMovieEpisode