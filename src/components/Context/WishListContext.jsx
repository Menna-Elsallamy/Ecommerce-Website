import axios from "axios";
import { createContext } from "react";
import { useState } from 'react';
import {useEffect} from 'react';
export const wishListContext=createContext();
export default function WishListContextProvider(props) {
    const [cartId, setcartId] = useState('')

    async function sendCartId(){
        const{data}=await getLoggedWishList();
        setcartId(data.data._id)
    }
    useEffect(() => {
        sendCartId()
    }, [])
    let headers={token:localStorage.getItem('userToken')}
function addProducttoWishList(id){
 return axios.post("https://route-ecommerce.onrender.com/api/v1/wishlist",
    {productId:id},
    {
    headers,
    } )
    .then((response)=>response)
    .catch((err)=>err)
}


function getLoggedWishList(){
    return axios.get("https://route-ecommerce.onrender.com/api/v1/wishlist",{headers})
    .then((response)=>response)
    .catch((err)=>err)
}
function removeProductFromWishList(id){
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`,{headers})
    .then((response)=>response)
    .catch((err)=>err)
}
    return<wishListContext.Provider value={{
        removeProductFromWishList,
        getLoggedWishList,
        addProducttoWishList
        }}>
        {props.children}
    </wishListContext.Provider>
}