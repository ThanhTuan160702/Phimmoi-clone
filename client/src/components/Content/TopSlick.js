import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import { formatSlug } from '../../utils/helper';

const settings = {
  arrows: false,
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2
};

const TopSlick = ({data}) => {

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
    <Slider className='custom-slider' {...settings} >
      {data?.map(el=>{
        const date = new Date(el.date)
        const year = date.getFullYear()
        return(
          <div onMouseDown={() => handleOnMouseDown(el)} className='relative hover-effect'>
            <img className='px-3 cursor-pointer' src={el.imageOther} alt='img'/>      
            <span className='text-white absolute bottom-5 left-5 font-semibold'>{el.name}</span>
            <span className='text-white absolute bottom-2 left-5 text-xs'>{year}</span>
            <span className='text-white absolute bottom-0 right-3 text-xs bg-blue-500 py-1 px-2'>HD VIETSUB</span>
          </div>
      )})}
    </Slider>
  );
}

export default memo(TopSlick)