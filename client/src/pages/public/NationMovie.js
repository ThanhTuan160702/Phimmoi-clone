import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { nation} from '../../utils/contants'
import { formatSlug, formatYear } from '../../utils/helper'
import { apiMovies } from '../../apis/movie';
import { Pagination } from '../../components';
import NotFound from './NotFound';

const NationMovie = () => {

  const { nationParams, pageNumber } = useParams()
  const nationByText = nation.find(el => formatSlug(el.text) === nationParams)
  const defaultPageNumber = pageNumber ? Number(pageNumber) : 1;
  const [movies, setMovies] = useState(null)
  const [totalPage, setTotalPage] = useState(null)
  const navigate = useNavigate()

  const fetchData = async(nationByText, defaultPageNumber) => {
    const response = await apiMovies({nation: (nationByText.text).slice(5), page: defaultPageNumber})
    if(response.success){
      setMovies(response.mes)
      setTotalPage(Math.ceil(response.counts/5))
    }
  }

  const handleChangePage = (text) => {
    if(text === '+'){
      navigate(`/quoc-gia/${nationParams}/page/${Number(defaultPageNumber)+1}`)
    }else{
      navigate(`/quoc-gia/${nationParams}/page/${Number(defaultPageNumber)-1}`)
    }
  }

  useEffect(() => {
    if(nationParams && nationByText) {
      fetchData(nationByText, defaultPageNumber)
    }
    window.scrollTo(0,0)
  }, [nationParams, defaultPageNumber])

  return (
    <div className='w-full p-8'>
      {nationByText ? <div className='flex flex-col'>
        <span className='text-3xl font-bold flex justify-center text-white mb-8'>{nationByText.text}</span>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-between pr-3'>
            <span className='border-l-[3px] border-blue-700 mx-3 font-semibold text-lg pl-3 text-white'>{`${nationByText.text} mới cập nhật`}</span>
          </div>
          <div className='flex flex-wrap justify-start'>
            {movies?.map(el=>(
              <div onClick={() => navigate(`/${formatSlug(el.movieSingleOrSeries)}/${formatSlug(el.name)}`)} key={el.id} className='hover-effect relative flex flex-col px-3 w-[158px] mb-8'>
                <img className='cursor-pointer' src={el.imageThumbnail} alt='img'/>      
                <span className='text-white text-sm line-clamp-1 mt-2'>{el.name}</span>
                <span className='text-sm text-[#cbcbcb]'>{formatYear(el.date)}</span>
              </div>
            ))}
          </div>
      </div>
      {totalPage > 1 && <div className='py-3 pt-3 border-t border-gray-700 h-[100px]'>
        <Pagination currentNow={defaultPageNumber} handleChangePage={handleChangePage} TotalPage={totalPage} path={`/quoc-gia/${nationParams}/page/`}/>
      </div>}
      </div> : <NotFound/>}
    </div>
  )
}

export default NationMovie