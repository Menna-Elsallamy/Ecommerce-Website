import React from 'react'
import './MainSlider.module.css'
import Slider from "react-slick";
import sliderone from "../../Assets/Slider/slider-2.jpeg";
import sliderTwo from "../../Assets/Slider/slider-image-1.jpeg"
import sliderThree from "../../Assets/Slider/slider-image-2.jpeg"
import sliderFour from "../../Assets/Slider/slider-image-3.jpeg"
import sliderFive from "../../Assets/Slider/blog-img-1.jpeg"
import sliderSix from "../../Assets/Slider/blog-img-2.jpeg"
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows:false
  };
  return (
    <div className='my-4 container'>
      <div className="row g-0">
        <div className="col-md-8 my-4">
          <Slider {...settings}>
            <img className='w-100' height={450} src={sliderTwo} alt='' />
            <img className='w-100' height={450} src={sliderThree} alt='' />
            <img className='w-100' height={450} src={sliderFour} alt='' />
          </Slider>
        </div>
        <div className="col-md-4 my-4">
          <img className='w-100' height={225} src={sliderThree} alt="" />
          <img className='w-100' height={225} src={sliderTwo} alt="" />
        </div>
      </div>
    </div>
  );


}
