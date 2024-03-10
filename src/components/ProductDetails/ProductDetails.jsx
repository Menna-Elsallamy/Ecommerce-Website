import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';
import Slider from 'react-slick';
import {Helmet} from "react-helmet";
import React, { useContext } from 'react'
import '../../App.css';
import { cartContext } from '../Context/CartContext';
import { toast } from 'react-hot-toast';

export default function ProductDetails() {
  const [details, setDetails] = useState({})
    const {addProducttoCart,setnumOfCartItems}=useContext(cartContext)
  
    async function addProduct(id){
      let {data}=await addProducttoCart(id);
      // console.log(data)
      if(data.status==='success'){
        toast.success(data.message, {
          duration: 4000,
          position: 'bottom-right'});
          setnumOfCartItems(data.numOfCartItems)

      }
    }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
  };
  let { id } = useParams();
  console.log(id)
  async function getProductDetails() {
   
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    console.log(data)
    setDetails(data.data)
  }
  useEffect(() => {
    getProductDetails()
  }, [])

  return <>
    <div className="container">
      <div className="row align-items-center mt-5 fw-bold">
        <div className="col-md-3">
          <Slider {...settings}>
          {details?.images?.map((element) => (
  <img className='w-100' src={element} alt="" />
))}

          </Slider>
        </div>
        <div className="col-md-9">
          <h2>{details.title}</h2>
          <p>{details.description}</p>
          <p className='fw-bold'>{details?.category?.name}</p>
          <div className="d-flex justify-content-between">
            <span>{details.price} EPG</span>
            <span> <i className='fa-solid fa-star rating-color justify-content-between'></i>{details.ratingsAverage}</span>
          </div>
          <button className='btn bg-main w-100 my-3' onClick={() => addProduct(details.id)} >Add to cart</button>
        </div>
      </div>
    </div>
    <Helmet>
<title>{details.title}</title>
</Helmet>
  </>
}
