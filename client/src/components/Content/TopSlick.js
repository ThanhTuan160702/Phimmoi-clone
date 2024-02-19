import React from 'react'
import Slider from "react-slick";
import { slideTest } from '../../utils/contants'; 

const settings = {
  arrows: false,
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2
};



const TopSlick = () => {
  return (
    <Slider className='custom-slider' {...settings} >
      {slideTest.map(el=>(
        <div className='relative hover-effect'>
          <img className='px-3 cursor-pointer' src={el.image} alt='img'/>      
          <span className='text-white absolute bottom-5 left-5 font-semibold'>{el.text}</span>
          <span className='text-white absolute bottom-2 left-5 text-xs'>{el.year}</span>
          <span className='text-white absolute bottom-0 right-3 text-xs bg-blue-500 py-1 px-2'>HD VIETSUB</span>
        </div>
      ))}
    </Slider>
  );
}

export default TopSlick