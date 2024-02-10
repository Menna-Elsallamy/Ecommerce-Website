import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register"

export default function App() {
  const routers = createBrowserRouter([
    { path: '', element: <Layout/>,
  children:[
    {index:true,element:<Home/>},
    {path:'/register',element:<Register/>},
    {path:'*',element:<NotFound/>}
  ]
  }
  ]);
  
  
    return (
      <RouterProvider router={routers} />
    );
  
  
}