import React from 'react'
import { useParams } from 'react-router-dom'
import { slideBodyTest } from '../../utils/contants'

const Year = () => {

  const { yearParams } = useParams()

  return (
    <div className='w-full p-8'>
      <div className='flex flex-col'>
        <span className='text-3xl font-bold flex justify-center text-white mb-8'>{yearParams}</span>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-between pr-3'>
            <span className='border-l-[3px] border-blue-700 mx-3 font-semibold text-lg pl-3 text-white'>{`${yearParams} mới cập nhật`}</span>
          </div>
          <div className='flex flex-wrap justify-between'>
            {slideBodyTest.map(el=>(
              <div key={el.id} className='hover-effect relative flex flex-col px-3 w-[158px] mb-8'>
                <img className='cursor-pointer' src={el.image} alt='img'/>      
                <span className='text-white text-sm line-clamp-1 mt-2'>{el.text}</span>
                <span className='text-sm text-[#cbcbcb]'>{el.year}</span>
              </div>
            ))}
          </div>
      </div>
      </div>
    </div>
  )
}

export default Year