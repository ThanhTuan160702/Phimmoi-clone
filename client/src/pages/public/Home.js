import React, { useEffect, useState } from 'react'
import { BodySlick, Pagination, TopSlick } from '../../components/index'
import { createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom'
import { apiMovies } from '../../apis'
import queryString from 'query-string'
import { CiSearch } from 'react-icons/ci'
import { formatSlug } from '../../utils/helper'
import path from '../../utils/path'

const Home = () => {

  const { pageNumber } = useParams()

  const [searchMovies, setSearchMovies] = useState(null)
  const [search, setSearch] = useState('')
  const [movieSingle, setMovieSingle] = useState(null)
  const [movieSeries, setMovieSeries] = useState(null)
  const [movieAction, setMovieAction] = useState(null)
  const [movieTopSlick, setMovieTopSlick] = useState(null)
  const location = useLocation()
  const [totalPage, setTotalPage] = useState(null)
  const defaultPageNumber = pageNumber ? Number(pageNumber) : 1;
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  const searchParams = queryString.parse(location.search);

  const handleChangePage = (text) => {
    if(text === '+'){
      navigate({
        pathname: `/page/${Number(defaultPageNumber)+1}`,
        search: createSearchParams({s: search}).toString()
      })
    }else{
      navigate({
        pathname: `/page/${Number(defaultPageNumber)-1}`,
        search: createSearchParams({s: search}).toString()
      })
    }
  }

  const fetchDataSingle = async() => {
    const response = await apiMovies({movieSingleOrSeries: 'Phim Lẻ', limit: 6})
    if(response.success){
      setMovieSingle(response.mes)
    }
  }

  const fetchDataSeries = async() => {
    const response = await apiMovies({movieSingleOrSeries: 'Phim Bộ', limit: 6})
    if(response.success){
      setMovieSeries(response.mes)
    }
  }

  const fetchDataAction = async() => {
    const response = await apiMovies({category: 'Phim Hành Động'})
    if(response.success){
      setMovieAction(response.mes)
    }
  }

  const fetchTopSlick = async() => {
    const response = await apiMovies({sort: 'createdAt', limit: 6})
    if(response.success){
      setMovieTopSlick(response.mes)
    }
  }

  const searchMovie = (el) => {
    if(el.length > 0){
        setLoading(true)
    }
    setSearch(el)
  }

  const fetchSearch = async(debouncedSearchTerm) => {
    const response = await apiMovies({slug: debouncedSearchTerm, page: pageNumber})
    if(response.success){
      setSearchMovies(response.mes)
      setTotalPage(Math.ceil(response.counts/5))
    }
    setLoading(false)
  }

  useEffect(() => {
    if(location.search.length > 0){
      setSearch(searchParams.s)
      fetchSearch(searchParams.s, pageNumber)
      window.scrollTo(0,0)
    }
  },[searchParams.s, pageNumber])

  const handleSearch = () => {
    navigate({
      pathname: path.PUBLIC,
      search: createSearchParams({s: search}).toString()
    })
  }

  useEffect(() => {
    fetchDataSingle()
    fetchDataSeries()
    fetchDataAction()
    fetchTopSlick()
    window.scrollTo(0,0)
  },[])

  return (
    <>
      {location.search.length === 0 ? <div className='w-full p-8 flex flex-col gap-6'>
        <div>
          <TopSlick data={movieTopSlick}/>
        </div>
        <span className='border-b border-gray-700'></span>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-between pr-3'>
            <span className='border-l-[3px] border-blue-700 mx-3 font-semibold text-lg pl-3 text-white'>Phim hành động mới cập nhật</span>
            <span onClick={() => navigate(`the-loai/phim-hanh-dong`)} className='text-xs bg-blue-700 p-1 rounded-lg cursor-pointer'>Xem thêm</span>
          </div>
          <BodySlick data={movieAction}/>
        </div>
        <span className='border-b border-gray-700'></span>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-between pr-3'>
            <span className='border-l-[3px] border-blue-700 mx-3 font-semibold text-lg pl-3 text-white'>Phim bộ mới cập nhật</span>
            <span onClick={() => navigate(`phim-bo`)} className='text-xs bg-blue-700 p-1 rounded-lg cursor-pointer'>Xem thêm</span>
          </div>
          <BodySlick data={movieSeries}/>
        </div>
        <span className='border-b border-gray-700'></span>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-between pr-3'>
            <span className='border-l-[3px] border-blue-700 mx-3 font-semibold text-lg pl-3 text-white'>Phim lẻ mới cập nhật</span>
            <span onClick={() => navigate(`phim-le`)} className='text-xs bg-blue-700 p-1 rounded-lg cursor-pointer'>Xem thêm</span>
          </div>
          <BodySlick data={movieSingle}/>
        </div>
      </div>
      :
      <div className='w-full p-20 flex flex-col gap-2'>
        <h1 className='text-xl font-bold text-white'>{`Kết quả tìm kiếm: ${searchParams.s}`}</h1>
        <div className='flex'>
          <input
            value={search}
            onChange={(el) => searchMovie(el.target.value)}
            type='text' 
            className='bg-black p-6 h-[40px] w-[700px] outline-none rounded-lg rounded-r-none text-white' 
            placeholder='Tìm kiếm...'/>
            <button onClick={() => handleSearch()} className='bg-black h-[40px] rounded-r-lg flex justify-center items-center p-6'>
              <CiSearch color='white' size={23}/>
            </button>
        </div>
        <div>
          {searchMovies?.map((el)=>(
            <div key={el._id} className='p-3 border-b border-gray-700 border-opacity-50 flex gap-5 hover:bg-gray-900'>
            <img src={el.imageThumbnail} alt='img' className='w-[130px]'/>
            <div className='flex-col gap-3'>
              <h1 onClick={() => navigate(`/${formatSlug(el.movieSingleOrSeries)}/${formatSlug(el.name)}`)} className='text-[#cbcbcb] text-base cursor-pointer'>{el.name}</h1>
              <h1 className='text-[#cbcbcb] text-sm cursor-pointer'>{el.movieSingleOrSeries}</h1>
              <div className='text-[#cbcbcb] text-sm cursor-pointer line-clamp-3 w-full'>{el.description}</div>
            </div>
          </div>
          ))}
        </div>
        {totalPage > 1 && <div className='py-3 pt-3 h-[100px]'>
        <Pagination currentNow={defaultPageNumber} handleChangePage={handleChangePage} TotalPage={totalPage} path={`/page/`} search={searchParams.s}/>
      </div>}
      </div>
      }
    </>
  )
}

export default Home