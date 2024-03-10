import React, { useContext } from 'react'
import { cartContext } from '../Context/CartContext'
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from "react-helmet";

import emptyCart from '../.././Assets/Photos/empty-cart-2130356-1800917.webp'
import { Link } from 'react-router-dom';

export default function Cart() {

  const { getLoggedCart, removeProductFromCart, updateProductQuantity, setnumOfCartItems } = useContext(cartContext);
  const [products, setproducts] = useState([])
  const [price, setprice] = useState([0])
  const [totalCartItems, settotalCartItems] = useState([0])

  async function updateCount(id, count) {
    const { data } = await updateProductQuantity(id, count)
    setproducts(data.data.products)
    setprice(data.data.totalCartPrice)
    settotalCartItems(data.numOfCartItems)
  }
  async function getCart() {
    const { data } = await getLoggedCart();
    setprice(data.data.totalCartPrice); 
    setproducts(data.data.products);     
    settotalCartItems(data.numOfCartItems); 
}

  async function getdelete(id) {
    const { data } = await removeProductFromCart(id);
    setprice(data.data.totalCartPrice); 
    setproducts(data.data.products);   
    setnumOfCartItems(data.numOfCartItems); 
    settotalCartItems(data.numOfCartItems);
}


  useEffect(() => {
    getCart();
  }, [])


  return (

    <div className='container bg-main-light p-4'>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="d-flex justify-content-between align-items-center"> <h1>Shop Cart:</h1>
      <Link to="/checkout" className='btn btn-success'>Check Out</Link>
</div>

      <div className="d-flex justify-content-between align-items-center">
        <span className='text-main'>Total price:{price}EPG</span>
        <span className='text-main'>Total Cart items:{totalCartItems}</span>
      </div>
      {products.length == 0 ? <div className='d-flex justify-content-center align-items-center'><img className='w-75' src={emptyCart} /></div> :
        products.map((product, index) => (
          <div key={index} className="row border-bottom p-3 m-4">
            <div className="col-md-2">
              <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
            </div>
            <div className="col-md-10">
              <div className="d-flex justify-content-end align-items-center">
                <div className="col-md-9">
                  <h4>Product Title:{product.product.title}</h4>
                  <h6>Product Price:{product.price}</h6>
                  <h6 onClick={() => { getdelete(product.product._id) }} className='text-main cursor-pointer'><i className='fa-solid fa-trash-can mx-2'></i>Remove</h6>
                </div>
                <div className="col-md-3 text-end">
                  <button onClick={() => { updateCount(product.product._id, product.count + 1) }} className='btn btn-outline-success'>+</button>
                  <span className='mx-1'>{product.count}</span>
                  <button disabled={product.count == 1 ? "disabled" : false} onClick={() => { updateCount(product.product._id, product.count - 1) }} className='btn btn-outline-success'>-</button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}