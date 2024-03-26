import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Pagination, TopSlick } from '../../components/index'
import { apiMovies } from '../../apis/movie';
import NotFound from './NotFound';

const MovieSingleOrSeries = () => {

  const { movieSingleOrSeriesParams, pageNumber} = useParams()
  const defaultPageNumber = pageNumber ? Number(pageNumber) : 1;
  const [singleOrSeries, setSingleOrSeries] = useState(null)
  const [totalPage, setTotalPage] = useState(null)
  const [slick, setSlick] = useState(null)
  const [movies, setMovies] = useState(null)
  const navigate = useNavigate()

  const handleChangePage = (text) => {
    if(text === '+'){
      navigate(`/${movieSingleOrSeriesParams}/page/${Number(defaultPageNumber)+1}`)
    }else{
      navigate(`/${movieSingleOrSeriesParams}/page/${Number(defaultPageNumber)-1}`)
    }
  }

  const fetchData = async() => {
    const response = await apiMovies({movieSingleOrSeries: singleOrSeries, page: Number(defaultPageNumber)})
    if(response.success){
      setMovies(response.mes)
      setTotalPage(Math.ceil(response.counts/5))
    }
  }

  const fetchSlick = async() => {
    const response = await apiMovies({movieSingleOrSeries: singleOrSeries, limit: 6})
    if(response.success){
      setSlick(response.mes)
    }
  }

  useEffect(() => {
    if (movieSingleOrSeriesParams === 'phim-le') {
      setSingleOrSeries('Phim Lẻ')
    } else {
      setSingleOrSeries('Phim Bộ')
    }
    setMovies(null)
  }, [movieSingleOrSeriesParams])

  useEffect(() => {
    if(singleOrSeries) {
      fetchSlick()
      fetchData(singleOrSeries)
    }
    window.scrollTo(0,0)
  }, [singleOrSeries, defaultPageNumber])

  return (
    <div className='w-full'>
      {(movieSingleOrSeriesParams === 'phim-le' || movieSingleOrSeriesParams === 'phim-bo') ? <div className='w-full p-8'>
        <div className='flex flex-col'>
          <span className='text-3xl font-bold flex justify-center text-white'>{singleOrSeries}</span>
          <div className='py-8'>
            {movies && <TopSlick data={slick}/>}
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex items-center justify-between pr-3'>
              <span className='border-l-[3px] border-blue-700 mx-3 font-semibold text-lg pl-3 text-white'>{`${singleOrSeries} mới cập nhật`}</span>
            </div>
            <div className='flex flex-wrap justify-start'>
              {movies?.map(el=>(
                <div key={el.id} onClick={() => navigate(`/${movieSingleOrSeriesParams}/${el.slug}`)} className='hover-effect relative flex flex-col px-3 w-[158px] mb-8'>
                  <img className='cursor-pointer' src={el.imageThumbnail} alt='img'/>      
                  <span className='text-white text-sm line-clamp-1 mt-2 cursor-pointer'>{el.name}</span>
                  <span className='text-sm text-[#cbcbcb] line-clamp-1 cursor-pointer'>{el.nameEng}</span>
                </div>
              ))}
            </div>
        </div>
        {totalPage > 1 && <div className='py-3 pt-3 border-t border-gray-700 h-[100px]'>
          <Pagination currentNow={defaultPageNumber} handleChangePage={handleChangePage} TotalPage={totalPage} path={`/${movieSingleOrSeriesParams}/page/`}/>
        </div>}
        </div>
      </div> : <NotFound/>}
    </div>
  )
}

export default MovieSingleOrSeries