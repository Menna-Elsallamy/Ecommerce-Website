import React, { useContext } from 'react'
import '../../App.css';
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/CartContext';
import { toast } from 'react-hot-toast';
import { wishListContext } from '../Context/WishListContext';
import { useState, useEffect } from 'react';

export default function ProductItem({ product }) {

  const [isWished, setIsWished] = useState(localStorage.getItem(`wishlist_${product.id}`) === 'true');
  const { addProducttoCart, setnumOfCartItems } = useContext(cartContext)
  const { addProducttoWishList, removeProductFromWishList } = useContext(wishListContext)
  async function addProduct(id) {
    let { data } = await addProducttoCart(id);
    // console.log(data)
    if (data.status === 'success') {
      toast.success(data.message, {
        duration: 4000,
        position: 'bottom-right'
      })
      setnumOfCartItems(data.numOfCartItems)

    }
  }
  useEffect(() => {
    // Update local storage whenever isWished changes
    localStorage.setItem(`wishlist_${product.id}`, isWished.toString());
  }, [isWished, product.id]);
  async function addProducttowishlist(id) {
    // If the item is already in the wishlist, attempt to remove it.
    if (isWished) {

      const response = await removeProductFromWishList(id);
      if (response && response.data) {
        // Assuming you want to update some state here to reflect the change
        setIsWished(false);
        toast.success('Product removed from wishlist', {
          duration: 4000,
          position: 'bottom-right',
        });
      }

    } else {

      let { data } = await addProducttoWishList(id);
      if (data && data.status === 'success') {
        setIsWished(true);
        toast.success(data.message, {
          duration: 4000,
          position: 'bottom-right',
        });
        // Handle any additional state updates or actions needed after adding to wishlist
      }

    }
  }

  // async function addProducttowishlist(id){
  //   if(isWished){
  //     async function getdelete(id) {
  //       const response = await removeProductFromWishList(id);
  //       if (response && response.data) {
  //           const updatedProducts = products.filter(product => product._id !== id);
  //           setproducts(updatedProducts);
  //       }
  //   }
  //   }
  //   let {data}=await addProducttoWishList(id);
  //   console.log(data)
  //   if(data.status==='success'){
  //     setIsWished(true)
  //     toast.success(data.message, {
  //       duration: 4000,
  //       position: 'bottom-right'})
  //   }
  // }
  return (
    <div className='col-md-2 product'>
      <Link to={`/productdetails/${product.id}`} key={product.id}>
        <img src={product.imageCover} className='w-100' alt="" />
        <h5 className='text-main'>{product.category.name}</h5>
        <h2 className='h6'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
        <div className='d-flex justify-content-between'>
          <span>{product.price}</span>
          <span><i className='fa-solid fa-star rating-color'></i>{product.ratingsAverage}
          </span>

        </div>
      </Link>
      <i onClick={() => addProducttowishlist(product.id)} className={`fa-solid fa-heart d-flex justify-content-end cursor-pointer ${isWished ? 'red-heart' : ''}`}></i>

      <div className='d-flex justify-content-center align-items-center'>
        <button className='btn bg-main' onClick={() => addProduct(product.id)}>Add to cart</button>
      </div>
    </div>
  )
}
