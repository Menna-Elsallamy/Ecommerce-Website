import React from 'react'
import './Home.module.css'
import FeaturedProduct from '../../components/FeaturedProduct/FeaturedProduct';
import CateogerySlider from '../../components/CateogerySlider/CateogerySlider';
import MainSlider from '../../components/MainSlider/MainSlider';

export default function Home() {
  return (
    <div className='container'>
      <MainSlider/>
      <CateogerySlider/>
      <FeaturedProduct/>
    </div>

  )
}
