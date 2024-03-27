import React,{ memo } from 'react'
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Pagination = ({currentNow, TotalPage, handleChangePage, path, search}) => {
    const navigate = useNavigate()
    const pages = []
    const firstPage = currentNow - 2 > 0 ? currentNow - 2 : 1
    const lastPage = firstPage + 4 <= TotalPage ? firstPage + 4 : TotalPage
    for (let index = firstPage; index <= lastPage; index++) {
        pages.push(index)
    }
  return (
    <div className='flex gap-2 text-white'>
        {currentNow > 1 && <button onClick={() => handleChangePage('-')} className='border border-black'>
            <div className='p-2'><IoMdArrowDropleft color='gray'/></div>
        </button>}
        {pages.length > 1 && pages.map((index)=>(
            <button 
            key={index}
            onClick={() => {search ? navigate(`${path}${index}?s=${search}`) : navigate(`${path}${index}`)}} 
            className={Number(currentNow) === index ? 'border border-black text-sm bg-black text-blue-300' : 'border border-black text-sm text-gray-700'}
            >
                <div className='p-2'>{index}</div>    
            </button>
        ))}
        {(currentNow < TotalPage || currentNow === undefined) && <button onClick={() => handleChangePage('+')} className='border border-black'>
            <div className='p-2'><IoMdArrowDropright color='gray'/></div>
        </button>}
    </div>
  )
}

export default memo(Pagination)