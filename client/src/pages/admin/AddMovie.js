import React, { useState } from 'react'
import { apiCreateMovie } from '../../apis/movie'
import Swal from 'sweetalert2'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const AddMovie = () => {

  const [loading, setLoading] = useState(false)
  
  const [payload, setPayload] = useState({
    name: '',
    nameEng: '',
    nation: '',
    quality: '',
    star: '',
    numberOfEpisode: 0,
    movieSingleOrSeries: '',
    date: '',
    description: '',
    category: '',
    video: null,
    imageThumbnail: null,
    imageOther: null
  })

  const handleAddMovie = async() => {
      const createMovie = {...payload}
      const formData = new FormData()
      for(let i of Object.entries(createMovie)){
        formData.append(i[0], i[1])
      }
      setLoading(true)
      await apiCreateMovie(formData)
      setLoading(false)
      toast.success('Thêm thành công')
  }

  const handleVideoFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPayload(prev => ({ ...prev, [event.target.name]: selectedFile }));
  };

  return (
    <div className='p-8 relative'>
      {loading && 
      <div className='absolute flex justify-center items-center inset-0 min-h-screen bg-opacityLoading'>
        <FadeLoader color='red'/>
      </div>}
      <h1 className='font-bold text-4xl mb-1'>Thêm phim</h1>
      <div className='flex flex-col gap-5'>
        <div className='flex w-full gap-3'>
          <div className='flex flex-col w-full'>
            <label className='font-bold text-xl'>Tên</label>
            <input 
            value={payload.name} 
            name='name' 
            onChange={(el) => setPayload(prev => ({...prev,[el.target.name]: el.target.value}))} 
            style={{ caretColor: 'black' }} 
            className='p-1'
            type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-bold text-xl'>Tên tiếng anh</label>
            <input 
            value={payload.nameEng} 
            name='nameEng' 
            onChange={(el) => setPayload(prev => ({...prev,[el.target.name]: el.target.value}))} 
            style={{ caretColor: 'black' }}
            className='p-1'
            type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-bold text-xl'>Quốc gia</label>
            <input 
            value={payload.nation} 
            name='nation' 
            onChange={(el) => setPayload(prev => ({...prev,[el.target.name]: el.target.value}))} 
            style={{ caretColor: 'black' }}
            className='p-1'
            type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-bold text-xl'>Chất lượng</label>
            <input 
            value={payload.quality} 
            name='quality' 
            onChange={(el) => setPayload(prev => ({...prev,[el.target.name]: el.target.value}))} 
            style={{ caretColor: 'black' }}
            className='p-1'
            type='text'/>
          </div>
        </div>
        <div className='flex w-full gap-3'>
          <div className='flex flex-col w-full'>
            <label className='font-bold text-xl'>Số sao</label>
            <input 
            value={payload.star} 
            name='star' 
            onChange={(el) => setPayload(prev => ({...prev,[el.target.name]: el.target.value}))} 
            style={{ caretColor: 'black' }}
            className='p-1'
            type='number'/>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-bold text-xl'>Số tập</label>
            <input 
            value={payload.numberOfEpisode} 
            style={{ caretColor: 'black' }}
            className='p-1 border border-black'
            type='number'
            disabled
            />
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-bold text-xl'>Loại phim</label>
            <select 
            value={payload.movieSingleOrSeries} 
            name='movieSingleOrSeries' 
            onChange={(el) => setPayload(prev => ({...prev,[el.target.name]: el.target.value}))} 
            className='p-1'
            type='text'>
              <option>Chọn loại phim...</option>
              <option>Phim Lẻ</option>
              <option>Phim Bộ</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-bold text-xl'>Ngày khởi chiếu</label>
            <input 
            value={payload.date} 
            name='date' 
            onChange={(el) => setPayload(prev => ({...prev,[el.target.name]: el.target.value}))} 
            style={{ caretColor: 'black' }}
            className='p-1'
            type='date'/>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <label className='font-bold text-xl'>Mô tả</label>
          <input 
            value={payload.description} 
            name='description' 
            onChange={(el) => setPayload(prev => ({...prev,[el.target.name]: el.target.value}))} 
            style={{ caretColor: 'black' }}
            className='p-1'
            type='text'/>
        </div>
        <div className='flex flex-col w-full'>
          <label className='font-bold text-xl'>Thể loại phim</label>
          <input 
            value={payload.category} 
            name='category' 
            onChange={(el) => setPayload(prev => ({...prev,[el.target.name]: el.target.value}))} 
            style={{ caretColor: 'black' }}
            className='p-1'
            type='text'/>
        </div>
        <div className='flex w-full gap-3'>
          <div className='flex flex-col w-full'>
            <label className='font-bold text-xl'>File video</label>
            <input 
            type='file' 
            name='video'
            onChange={handleVideoFileChange}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-bold text-xl'>Ảnh thumbnail</label>
            <input 
            type='file'
            name='imageThumbnail'
            onChange={(el) => setPayload(prev => ({...prev, [el.target.name]: el.target.files[0]}))}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-bold text-xl'>Ảnh khác</label>
            <input 
            type='file'
            name='imageOther'
            onChange={(el) => setPayload(prev => ({...prev, [el.target.name]: el.target.files[0]}))}
            />
          </div>
        </div>
      </div>
      <div onClick={() => handleAddMovie()} className='w-full flex justify-end mt-3'>
        <button className='p-3 bg-red-500 border'>Thêm</button>
      </div>
    </div>
  )
}

export default AddMovie