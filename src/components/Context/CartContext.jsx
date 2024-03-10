import axios from "axios";
import { createContext } from "react";
import { useState } from 'react';
import {useEffect} from 'react';
export const cartContext=createContext();
export default function CartContextProvider(props) {
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [cartId, setcartId] = useState('')

    async function startIntialCount(){
        const{data}=await getLoggedCart();
        setnumOfCartItems(data.numOfCartItems);
        setcartId(data.data._id)
    }
    useEffect(() => {
        startIntialCount()
    }, [])
    

    let headers={token:localStorage.getItem('userToken')}
function addProducttoCart(id){
 return axios.post("https://route-ecommerce.onrender.com/api/v1/cart",
    {productId:id},
    {
    headers,
    } )
    .then((response)=>response)
    .catch((err)=>err)
}

function payment(values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {shippingAddress:values},
       {
       headers,
       } )
       .then((response)=>response)
       .catch((err)=>err)
   }

function getLoggedCart(){
    return axios.get("https://route-ecommerce.onrender.com/api/v1/cart",{headers})
    .then((response)=>response)
    .catch((err)=>err)
}
function removeProductFromCart(id){
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{headers})
    .then((response)=>response)
    .catch((err)=>err)
}
function updateProductQuantity(id,count){
    return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{count:count},{headers})
    .then((response)=>response)
    .catch((err)=>err)
    
}
    return<cartContext.Provider value={{
        addProducttoCart,
        getLoggedCart,
        removeProductFromCart,
        updateProductQuantity
        ,numOfCartItems,
        setnumOfCartItems,
        payment}}>
        {props.children}
    </cartContext.Provider>
}