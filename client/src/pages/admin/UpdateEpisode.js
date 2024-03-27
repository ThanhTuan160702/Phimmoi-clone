import React, { useState } from 'react'
import { apiCreateEpisode, apiUpdateEpisode } from '../../apis/movie'
import Swal from 'sweetalert2'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const UpdateEpisode = ({data, cancel}) => {

  const [loading, setLoading] = useState(false)

  const [payload, setPayload] = useState({
    name: data.name,
    episode: data.episode,
    video: null
  })

  const handleAddEpisode = async() => {
    if(payload.episode === '' || payload.video === null){
      Swal.fire('Oops!', 'Missing Input','error')
    }else{
      const updateMovie = {...payload}
      const formData = new FormData()
      for(let i of Object.entries(updateMovie)){
        formData.append(i[0], i[1])
      }
      setLoading(true)
      await apiUpdateEpisode(data._id, formData)
      setLoading(false)
      toast.success('Cập nhật thành công')
    }
  }

  const handleVideoFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPayload(prev => ({ ...prev, [event.target.name]: selectedFile }));
  };

  return (
    <div className='p-8 bg-gray-300 h-screen relative'>
      {loading && 
      <div className='absolute flex justify-center items-center inset-0 min-h-screen bg-opacityLoading'>
        <FadeLoader color='red'/>
      </div>}
      <h1 className='font-bold text-4xl mb-1'>Cập nhật tập phim</h1>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <div className='flex w-full gap-3 justify-center items-center'>
          <div className='flex flex-col w-[300px]'>
            <label className='font-bold text-xl'>Tên</label>
            <input 
            value={payload.name} 
            name='name' 
            className='p-1 border border-black'
            type='text'
            disabled
            />
          </div>
        </div>
        <div className='flex w-full gap-3 justify-center items-center'>
          <div className='flex flex-col w-[300px]'>
            <label className='font-bold text-xl'>Số tập</label>
            <input 
            value={payload.episode} 
            name='episode' 
            onChange={(el) => setPayload(prev => ({...prev,[el.target.name]: el.target.value}))} 
            style={{ caretColor: 'black' }} 
            className='p-1'
            type='text'/>
          </div>
        </div>
        <div className='flex w-full gap-3'>
          <div className='flex flex-col w-full justify-center items-center'>
            <label className='font-bold text-xl'>File video</label>
            <input 
            type='file' 
            name='video'
            onChange={handleVideoFileChange}
            />
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center mt-2'>
        <div onClick={() => cancel()}>
          <button className='p-3 bg-red-500 border'>Hủy</button>
        </div>
        <div onClick={() => handleAddEpisode()}>
          <button className='p-3 bg-blue-500 border'>Cập nhật</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateEpisode