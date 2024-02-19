import React from 'react'
import { useParams } from 'react-router-dom'

const MovieLeOrBo = () => {

  const { movieLeOrBoParams } = useParams()
  const movieLeOrBo = movieLeOrBoParams === 'phim-le' ? 'Phim Lẻ' : 'Phim Bộ'

  return (
    <div className='w-full py-8 px-6'>
      <div className='flex flex-col'>
        <span className='text-3xl font-bold flex justify-center'>{movieLeOrBo}</span>
      </div>
    </div>
  )
}

export default MovieLeOrBo