import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { formatSlug } from '../../utils/helper'
import path from '../../utils/path'

const Search = ({search, data}) => {
  
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate({
      pathname: path.HOME,
      search: createSearchParams({s: search}).toString()
    })
  }


  return (
    <div className='w-[360px] absolute right-[128px] z-50 bg-opacity'>
        {data?.map((el)=> (
          <div key={el._id} className='p-3 border-b border-gray-700 border-opacity-50 flex gap-3 hover:bg-gray-900'>
            <img src={el.imageThumbnail} alt='img' className='w-[55px]'/>
            <div className='flex gap-1 justify-center'>
              <h1 onClick={() => navigate(`/${formatSlug(el.movieSingleOrSeries)}/${formatSlug(el.name)}`)} className='text-white text-sm cursor-pointer'>{el.name}</h1>
              <h1 className='text-white text-sm cursor-pointer'>({el.nameEng})</h1>
            </div>
          </div>
        ))}
        {data.length > 0 && <div onClick={() => handleSearch()} className='flex items-center justify-center text-xs p-4 text-blue-500 italic cursor-pointer hover:bg-gray-900'>Xem tất cả kết quả</div>}
    </div>
  )
}

export default Search