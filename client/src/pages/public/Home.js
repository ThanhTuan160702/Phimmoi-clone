import React from 'react'
import { BodySlick, TopSlick } from '../../components/index'

const Home = () => {

  return (
    <div className='w-full p-8 flex flex-col gap-6'>
      <div>
        <TopSlick/>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center'>
          <span className='border-l-[3px] border-blue-700 mx-3 font-semibold text-lg pl-3'>Phim mới nổi bật</span>
        </div>
        <BodySlick/>
      </div>
      <span className='border-b border-gray-700'></span>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between pr-3'>
          <span className='border-l-[3px] border-blue-700 mx-3 font-semibold text-lg pl-3'>Phim chiếu rạp mới cập nhật</span>
          <span className='text-xs bg-blue-700 p-1 rounded-lg cursor-pointer'>Xem thêm</span>
        </div>
        <BodySlick/>
      </div>
      <span className='border-b border-gray-700'></span>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between pr-3'>
          <span className='border-l-[3px] border-blue-700 mx-3 font-semibold text-lg pl-3'>Phim bộ mới cập nhật</span>
          <span className='text-xs bg-blue-700 p-1 rounded-lg cursor-pointer'>Xem thêm</span>
        </div>
        <BodySlick/>
      </div>
      <span className='border-b border-gray-700'></span>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between pr-3'>
          <span className='border-l-[3px] border-blue-700 mx-3 font-semibold text-lg pl-3'>Phim lẻ mới cập nhật</span>
          <span className='text-xs bg-blue-700 p-1 rounded-lg cursor-pointer'>Xem thêm</span>
        </div>
        <BodySlick/>
      </div>
    </div>
  )
}

export default Home