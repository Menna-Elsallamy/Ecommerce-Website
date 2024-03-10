import '../../App.css';
import React, { useEffect,useState} from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader';
import { useQuery } from "react-query";
import ProductItem from '../ProductItem/ProductItem';
export default function FeaturedProduct(){
  function getData(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  
  let {data,isLoading,isFetching,refetch}=useQuery('Featured Product',getData,{
    // enabled:false
  })
  console.log(data)
  return(
    <div className='row gy-4'>
      {/* <button className='btn bg-main' onClick={refetch}>refetch</button> */}
           {isLoading?<Loader/>:data?.data.data.map((product) => (
             <ProductItem product={product}/>
   ))}
  </div>
)
 }


// export default function FeaturedProduct() {
//     const [allProducts, setAllProducts] = useState([]);
//     const [isLoading, setisLoading] = useState(false)
//     useEffect(() => {
//         getAllProducts()
//     }, [])
    
//     async function getAllProducts(){
//       setisLoading(true);
//         const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products');
//         setAllProducts(data.data);
//         setisLoading(false);
//     }
  
    // return (
    //   <div className='row gy-4'>
    //     {isLoading?<Loader/>:allProducts.map((product) => (
    //       <div className='col-md-2 product' key={product.id}> {/* Added key prop for optimization */}
    //         <img src={product.imageCover} className='w-100' alt="" /> {/* Corrected image src */}
    //         <h5 className='text-main'>{product.category.name}</h5>
    //         <h2 className='h6'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
    //         <div className='d-flex justify-content-between'>
    //           <span>{product.price}</span>
    //           <span><i className='fa-solid fa-star'></i>{product.ratingsAverage}
    //           </span>
    //         </div>
    //         <div className='d-flex justify-content-center'>            
    //           <button className='btn bg-main'>Add to cart</button>
    //           </div>
    //       </div>
    //     ))}
    //   </div>
    // )
    
// }
