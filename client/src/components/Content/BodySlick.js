import React from 'react'
import Slider from "react-slick";
import { slideBodyTest } from '../../utils/contants';
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";


const BodySlick = () => {

    const settings = {
        arrows: true,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
      };

  return (
    <Slider {...settings}>
      {slideBodyTest.map(el=>(
        <div key={el.id} className='hover-effect relative flex flex-col px-3'>
          <img className='cursor-pointer' src={el.image} alt='img'/>      
          <span className='text-white text-sm line-clamp-1 mt-2'>{el.text}</span>
          <span className='text-sm'>{el.year}</span>
        </div>
      ))}
    </Slider>
  )
}

export default BodySlick