import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register"
import Login from './pages/Login/Login';
import UserContextProvider from './components/Context/UserContext';
import CartContextProvider from './components/Context/CartContext';
import WishListContextProvider from './components/Context/WishListContext';
// import Products from './components/Products/Products';
import Cateogeries from './components/Cateogeries/Cateogeries';
import Cart from './components/Cart/Cart';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import ProductDetails from './components/ProductDetails/ProductDetails';
import toast, { Toaster } from 'react-hot-toast';
import { Offline} from "react-detect-offline";
// import allOrders from './pages/allOrders/allOrders.jsx';
import CheckOut from './pages/checkOut/checkOut.jsx';
import WishList from './pages/WishList/WishList';
import AllOrders from './pages/AllOrders/AllOrders';
import CodeReset from './components/CodeReset/CodeReset';
import ResetPassword from './components/ResetPassword/ResetPassword';
export default function App() {
  const routers = createBrowserRouter([
    { path: '', element: <Layout/>,
  children:[
    {index:true,element:<Home/>},
    {path:'/register',element:<Register/>},
    {path:'/login',element:<Login/>},
    {path:'/code',element: <CodeReset/>},
    {path:'/forgetpassword',element: <ForgotPassword/>},
    {path:'/reset-password',element: <ResetPassword/>},

    {path:'/checkout',element: <ProtectedRoute><CheckOut/></ProtectedRoute>},
    // {path:'/products',element: <ProtectedRoute><Products /></ProtectedRoute>},
    {path:'/cateogeries',element: <ProtectedRoute>< Cateogeries/></ProtectedRoute>}    ,
    { path: '/wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: '/allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },

    { path:'/productdetails/:id', element: <ProtectedRoute><ProductDetails/></ProtectedRoute> }
,    {path:'/cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'*',element:<NotFound/>}
  ]
  }
  ]);
  const queryClient=new QueryClient();
  
    return (
      <QueryClientProvider client={queryClient}>
    <Offline>
      <div className='offlinemsg'>
      <i className='fa-solid fa-wifi'></i>Sorry you are offline now</div></Offline>
      <WishListContextProvider>
      <CartContextProvider>

        <UserContextProvider>      
        <RouterProvider router={routers}/>
      </UserContextProvider>
      </CartContextProvider>
      </WishListContextProvider>


      <ReactQueryDevtools/>
      <Toaster/>
      </QueryClientProvider>
      
    );
  
  
}