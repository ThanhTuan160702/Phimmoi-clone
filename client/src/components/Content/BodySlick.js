import React from 'react'
import Slider from "react-slick";
import { slideBodyTest } from '../../utils/contants';
import { formatSlug, formatYear } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';


const BodySlick = ({data}) => {

    const settings = {
        arrows: true,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
      };


      const navigate = useNavigate()

  const handleOnMouseDown = (el) => {
    let isSwiping = false;

    const handleOnMouseUp = () => {
      if (!isSwiping) {
        navigate(`/${formatSlug(el.movieSingleOrSeries)}/${formatSlug(el.name)}`);
      }
    };

    const handleOnMouseMove = () => {
      isSwiping = true;
    };

    document.addEventListener('mouseup', handleOnMouseUp);
    document.addEventListener('mousemove', handleOnMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleOnMouseUp);
      document.removeEventListener('mousemove', handleOnMouseMove);
    };
  };

  return (
    <Slider {...settings}>
      {data?.map(el=>(
        <div onMouseDown={() => handleOnMouseDown(el)} key={el._id} className='hover-effect relative flex flex-col px-3'>
          <img className='cursor-pointer' src={el.imageThumbnail} alt='img'/>      
          <span className='text-white text-sm line-clamp-1 mt-2'>{el.name}</span>
          <span className='text-sm text-[#cbcbcb]'>{formatYear(el.date)}</span>
        </div>
      ))}
    </Slider>
  )
}

export default BodySlick