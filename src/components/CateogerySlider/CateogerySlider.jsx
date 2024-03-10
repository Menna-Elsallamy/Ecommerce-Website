import React from 'react'
import './CateogerySlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
import { useQuery } from 'react-query';
export default function CateogerySlider() {
  async function getCateogery(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }
  const{data}=useQuery('CateogerySlider',getCateogery);
  console.log(data);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };
  return (
    <div className='my-4'>
    <Slider {...settings}>
      {data?.data.data.map((category) => (
        <>
        <img key={category.id} height={200} className='w-100' src={category.image} alt={category.name} />
        <h4 className='text-center'>{category.name}</h4>
        </>
      ))}
    </Slider>
    </div>
  );
  
}
