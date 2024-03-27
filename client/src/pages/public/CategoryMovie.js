import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { category } from '../../utils/contants'
import { formatSlug, formatYear } from '../../utils/helper'
import { apiMovies } from '../../apis/movie';
import { Pagination } from '../../components';
import NotFound from './NotFound';

const CategoryMovie = () => {

  
  const { categoryParams, pageNumber } = useParams()
  const defaultPageNumber = pageNumber ? Number(pageNumber) : 1;
  const categoryByText = category.find(el => formatSlug(el.text) === categoryParams)
  const [totalPage, setTotalPage] = useState(null)
  const navigate = useNavigate()

  const [movies, setMovies] = useState(null)

  const fetchData = async(categoryByText, defaultPageNumber) => {
    const response = await apiMovies({category: categoryByText.text, page: Number(defaultPageNumber)})
    if(response.success){
      setMovies(response.mes)
      setTotalPage(Math.ceil(response.counts/5))
    }
  }

  const handleChangePage = (text) => {
    if(text === '+'){
      navigate(`/the-loai/${categoryParams}/page/${Number(defaultPageNumber)+1}`)
    }else{
      navigate(`/the-loai/${categoryParams}/page/${Number(defaultPageNumber)-1}`)
    }
  }

  useEffect(() => {
    if (categoryParams && categoryByText) {
      fetchData(categoryByText, defaultPageNumber)
    }
    window.scrollTo(0,0)
  }, [categoryParams, defaultPageNumber])

  return (
    <div className='w-full p-8'>
      {categoryByText ? <div className='flex flex-col'>
        <span className='text-3xl font-bold flex justify-center text-white mb-8'>{categoryByText.text}</span>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-between pr-3'>
            <span className='border-l-[3px] border-blue-700 mx-3 font-semibold text-lg pl-3 text-white'>{`${categoryByText.text} mới cập nhật`}</span>
          </div>
          <div className='flex flex-wrap justify-start'>
            {movies?.map(el=>(
              <div onClick={() => navigate(`/${formatSlug(el.movieSingleOrSeries)}/${formatSlug(el.name)}`)} key={el._id} className='hover-effect relative flex flex-col px-3 w-[158px] mb-8'>
                <img className='cursor-pointer' src={el.imageThumbnail} alt='img'/>      
                <span className='text-white text-sm line-clamp-1 mt-2'>{el.name}</span>
                <span className='text-sm text-[#cbcbcb]'>{formatYear(el.date)}</span>
              </div>
            ))}
          </div>
      </div>
      {totalPage > 1 && <div className='py-3 pt-3 border-t border-gray-700 h-[100px]'>
        <Pagination currentNow={defaultPageNumber} handleChangePage={handleChangePage} TotalPage={totalPage} path={`/the-loai/${categoryParams}/page/`}/>
      </div>}
      </div> : <NotFound/>}
    </div>
  )
}

export default CategoryMovie