import React from 'react'

const NotFound = () => {
  return (
    <div className='p-8 flex flex-col gap-3'>
        <span className='text-xl text-white border-l-[3px] px-2'>Không tìm thấy trang</span>
        <span className='text-gray-300 text-3xl'>ERROR 404</span>
    </div>
  )
}

export default NotFound