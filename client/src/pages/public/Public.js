import React from 'react'
import { Footer, Header, RightContent } from '../../components/index'
import { Outlet } from 'react-router-dom'

const Public = () => {
  return (
    <div className='w-full flex flex-col items-center h-[2200px]'>
        <Header/>
        <div className='w-main flex items-center flex-col bg-[#151414]'>
            <div className='bg-[#000000] w-full border border-yellow-400 p-2 flex items-center justify-center'>
              <span className='text-[#cbcbcb]'>Web Phim TuanFlix</span>
            </div>
            <div className='flex items-center justify-center w-full h-[1700px]'>
              <div className='w-[70%] h-full flex justify-center'>
                <Outlet/>
              </div>
              <div className='w-[30%] shadow-inset h-full border-l border-gray-700 border-opacity-50'>
                <RightContent/>
              </div>
            </div>
            <div className='p-10 shadow-inset border-t border-gray-700 border-opacity-50 w-full flex justify-center h-[300px]'>
              <Footer/>
            </div>
        </div>
    </div>
  )
}

export default Public