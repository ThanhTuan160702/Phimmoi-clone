import React, { useState } from 'react'
import { apiCreateMovie, apiUpdateMovie } from '../../apis/movie'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { FadeLoader } from 'react-spinners'

const UpdateMovie = ({data, cancel}) => {

  const [loading, setLoading] = useState(false)

  const [payload, setPayload] = useState({
    name: data?.name,
    nameEng: data?.nameEng,
    nation: data?.nation,
    quality: data?.quality,
    star: data?.star,
    numberOfEpisode: data?.numberOfEpisode,
    movieSingleOrSeries: data?.movieSingleOrSeries,
    date: data?.date,
    description: data?.description,
    category: data?.category,
    video: null,
    imageThumbnail: null,
    imageOther: null
  })

  const handleUpdateMovie = async() => {
      const updateMovie = {...payload}
      const formData = new FormData()
      for(let i of Object.entries(updateMovie)){
        formData.append(i[0], i[1])
      }
      setLoading(true)
      await apiUpdateMovie(data._id,formData)
      setLoading(false)
      toast.success('Cập nhật thành công')
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
      <h1 className='font-bold text-4xl mb-1'>Cập nhật phim</h1>
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
            name='numberOfEpisode'
            style={{ caretColor: 'black' }}
            className='p-1 border'
            type='number'
            onChange={(el) => setPayload(prev => ({...prev,[el.target.name]: el.target.value}))}
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
      <div className='w-full flex justify-end mt-3'>
        <button  onClick={() => cancel()} className='p-3 bg-red-500 border'>Hủy</button>
        <button  onClick={() => handleUpdateMovie()} className='p-3 bg-blue-500 border'>Cập nhật</button>
      </div>
    </div>
  )
}

export default UpdateMovie