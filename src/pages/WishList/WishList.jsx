import React, { useContext } from 'react'
import { wishListContext } from '../../components/Context/WishListContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from "react-helmet";
import emptywishList from '../../Assets/Photos/empty_wishlist.png'
import { cartContext } from '../../components/Context/CartContext';
import { Toaster,toast } from 'react-hot-toast';
export default function Cart() {
    const {addProducttoCart,setnumOfCartItems}=useContext(cartContext)
    async function addProduct(id){
      let {data}=await addProducttoCart(id);
      // console.log(data)
      if(data.status==='success'){
        toast.success(data.message, {
          duration: 4000,
          position: 'bottom-right'});
          setnumOfCartItems(data.numOfCartItems)
          getdelete(id);

      }
    }
    const { removeProductFromWishList, getLoggedWishList} = useContext(wishListContext);
    const [products, setproducts] = useState([])

    async function getWishList() {
        const { data } = await getLoggedWishList()
        console.log(data.data)
        setproducts(data.data)
    }
    async function getdelete(id) {
            const response = await removeProductFromWishList(id);
            if (response && response.data) {
                const updatedProducts = products.filter(product => product._id !== id);
                
                setproducts(updatedProducts);
                toast.success('Product removed from wishlist', {
                    duration: 4000,
                    position: 'bottom-right',
                  });
                }
            }
    useEffect(() => {
        getWishList();
    }, [])


    return (
        <div className='container bg-main-light p-4'>
            <Helmet>
                <title>WishList</title>
            </Helmet>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Wish List<span><i className='fa-solid fa-heart text-danger'></i></span></h1>
            </div>

            {products.length === 0 ? (
                <div className='d-flex justify-content-center align-items-center'>
                    <img className='w-75' src={emptywishList} alt="Empty Wishlist" />
                </div>
            ) : (
                products.map((product, index) => (
                    <div key={index} className="row border-bottom p-3 m-4">
                        <div className="col-md-2">
                            <img className='w-100' src={product.imageCover} alt={product.title} />
                        </div>
                        <div className="col-md-10">
                            <div className="d-flex justify-content-end align-items-center">
                                <div className="col-md-9">
                                    <h4>Product Title: {product.title}</h4>
                                    <button className=' cursor-pointer btn btn-outline-success mx-2' onClick={() => getdelete(product._id)}>
                                        <i className='fa-solid fa-trash-can mx-2'></i>Remove
                                    </button>
                                    <button className=' cursor-pointer btn btn-outline-success' onClick={() => addProduct(product._id)}>
                                        <i className='fa-solid fa-cart-shopping mx-2'></i>Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}