import React,{ memo } from 'react'
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Pagination = ({currentNow, TotalPage, handleChangePage, path, search, admin}) => {
    const navigate = useNavigate()
    const pages = []
    for (let index = 1; index <= TotalPage; index++) {
        if(TotalPage < 6){
            pages.push(index)
        }else if(TotalPage >= 6){
            if(index < Number(currentNow) + 5){
                pages.push(index)
                if(currentNow > 1 && currentNow === pages.length - 4){
                    pages.shift()
                }
            }
        }
    }
  return (
    <div className='flex gap-2 text-white'>
        {currentNow > 1 && <button onClick={() => handleChangePage('-')} className='border border-black'>
            <div className='p-2'><IoMdArrowDropleft color='gray'/></div>
        </button>}
        {pages.length > 1 && pages.map((index)=>(
            <button 
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