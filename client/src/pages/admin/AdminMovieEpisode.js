import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiAllMovieEpisode, apiDeleteMovieEpisode} from '../../apis';
import { Pagination } from '../../components';
import { useDebounce } from '@uidotdev/usehooks';
import queryString from 'query-string';
import { BeatLoader, FadeLoader } from 'react-spinners';
import { CiSearch } from 'react-icons/ci';
import { UpdateEpisode } from './index'
import Swal from 'sweetalert2';

const AdminMovieEpisode = () => {
  const { pageNumber} = useParams()
  const defaultPageNumber = pageNumber ? Number(pageNumber) : 1;
  const [totalPage, setTotalPage] = useState(null)
  const [update, setUpdate] = useState(false)
  const [inforEpisode, setInforEpisode] = useState(null)
  const [editEpisode, setEditEpisode] = useState(false)
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState(null)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [loading, setLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(search, 2000);
  const location = useLocation()
  const searchParams = queryString.parse(location.search);
  const navigate = useNavigate()

  const searchMovie = (el) => {
    if(el.length > 0){
      setLoadingSearch(true)
    }
    setSearch(el)
  }

  const handleChangePage = (text) => {
    if(text === '+'){
      navigate(`/admin/cac-tap-phim/page/${Number(defaultPageNumber)+1}`)
    }else{
      navigate(`/admin/cac-tap-phim/page/${Number(defaultPageNumber)-1}`)
    }
  }

  const fetchSearch = async(debouncedSearchTerm) => {
    navigate(`/admin/cac-tap-phim/page/1`)
    const response = await apiAllMovieEpisode({slug: debouncedSearchTerm})
    if(response.success){
        setMovies(response.mes)
        setTotalPage(Math.ceil(response.counts/5))
    }
    setLoadingSearch(false)
  }

  useEffect(()=>{
    if(debouncedSearchTerm?.length > 0){
      fetchSearch(debouncedSearchTerm)
      setLoadingSearch(false)
    }else{
      fetchData()
    }
},[debouncedSearchTerm])

const fetchData = async(search) => {
  if(search){
    setLoadingSearch(true)
    const response = await apiAllMovieEpisode({page: Number(defaultPageNumber), slug: search})
    setLoadingSearch(false)
    if(response.success){
      setMovies(response.mes)
      setTotalPage(Math.ceil(response.counts/5))
    }
  }else{
    setLoading(true)
    const response = await apiAllMovieEpisode({page: Number(defaultPageNumber)})
    setLoading(false)
    if(response.success){
      setMovies(response.mes)
      setTotalPage(Math.ceil(response.counts/5))
    }
  }
}

const handleDelete = async(eid,mid) => {
  Swal.fire({
    title: 'Delete Episode',
    text: 'Are you sure about that bro ?',
    showCancelButton: true
  }).then(async(result) => {
    if(result.isConfirmed){
      setLoading(true)
      await apiDeleteMovieEpisode(eid,mid)
      setLoading(false)
      setUpdate(prev => !prev)
    }
  })
}

const handleCancel = () => {
  setEditEpisode(false)
}

const handleUpdate = (el) => {
  setInforEpisode(el)
  setEditEpisode(true)
}

useEffect(() => {
  setSearch(searchParams.s)
},[searchParams.s])

useEffect(() => {
  if(search?.length > 0){
    fetchData(search)
  }else{
    fetchData()
  }
  window.scrollTo(0,0)
}, [defaultPageNumber, update])

  return (
    <>
      <div className='p-8 relative'>
      {loading && 
      <div className='absolute flex justify-center items-center inset-0 min-h-screen bg-opacityLoading'>
        <FadeLoader color='red'/>
      </div>}
      { editEpisode ? 
        <div className='absolute inset-0 min-h-screen bg-white'>
          {<UpdateEpisode cancel={handleCancel} data={inforEpisode}/>}
        </div>
        : ''}
        <div className='flex justify-between'>
          <h1 className='font-bold text-4xl mb-1'>Các Tập Phim</h1>
          <div className='flex'>
          <input
            value={search}
            onChange={(el) => searchMovie(el.target.value)}
            type='text' 
            className='bg-[#212020] p-4 h-[40px] w-[300px] outline-none rounded-lg rounded-r-none text-[#cbcbcb]' 
            placeholder='Tìm kiếm...'/>
            <button className='bg-[#212020] h-[40px] rounded-r-lg flex justify-center items-center p-2'>
              {loadingSearch ? <BeatLoader color="#36d7b7" size={5}/> :<CiSearch color='white' size={23}/>}
            </button>
          </div>
        </div>
        <div className='bg-white'>
          <div className='flex flex-col gap-2'>
            <div className='flex w-full gap-2 border-b border-gray-700 border-opacity-50'>
              <span className='w-[5%] flex items-center justify-center'>#</span>
              <span className='w-[5%]'>Image</span>
              <span className='w-[20%]'>Name</span>
              <span className='w-[20%]'>Episode</span>
              <span className='w-[20%]'>Actions</span>
            </div>
            {movies?.map((el, index)=>(
              <div key={el._id} className='flex gap-2 border-b border-gray-700 border-opacity-50 pb-2'>
                <span className='w-[5%] flex items-center justify-center'>{defaultPageNumber > 1 ? (defaultPageNumber-1)*5 + index + 1 : index + 1}</span>
                <span className='w-[5%]'>
                  <img src={el.mid?.imageThumbnail} alt='img'/>
                </span>
                <span className='w-[20%]'>{el.name}</span>
                <span className='w-[20%]'>{el.episode}</span>
                <div className='w-[20%] flex items-center gap-2'>
                  <span onClick={() => handleUpdate(el)} className='border border-black p-1 cursor-pointer bg-blue-500'>Update</span>
                  <span onClick={() => handleDelete(el._id, el.mid)} className='border border-black p-1 cursor-pointer bg-red-500'>Delete</span>
                </div>
              </div>
            ))}
          </div>
          {totalPage > 1 && <div className='p-3 flex items-center justify-end'>
            <Pagination currentNow={defaultPageNumber} handleChangePage={handleChangePage} TotalPage={totalPage} path={`/admin/cac-tap-phim/page/`} admin={'admin'}/>
          </div>}
        </div>
      </div>
    </>
  )
}

export default AdminMovieEpisode