import React from 'react';
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ColorRing} from "react-loader-spinner"
export default  function Register() {
const [error, setError] = useState(null)
const [loader, setloader] = useState(false)
  let navigate=useNavigate();
  async function submitForm(values) {
    // console.log(values);
    setloader(true);
    let {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
    .catch((err)=>{setloader(false); setError(err.response.data.message)});
    console.log(data);
    if(data.message==="success"){
      setloader(false);
      navigate('/login');
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3),
    email: Yup.string().required('Email is required').email(),
    phone: Yup.string().required().matches(/^\d{11}$/, 'Phone number must be 11 digits'),
    password: Yup.string().required().matches(/[A-Z][a-z]{3,}/, 'Password must contain at least one uppercase letter and be at least 4 characters long'),
    rePassword: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords must match')
  });
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: submitForm
  });
  return (
    <div className="container">
      {error&&<div className='alert alert-danger'>{error}</div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="name"
          />
          {formik.errors.name && formik.touched.name &&
            <div className='alert alert-danger'>{formik.errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="email"
          />
          {formik.errors.email && formik.touched.email &&
            <div className='alert alert-danger'>{formik.errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            className="form-control"
            placeholder="phone"
          />
          {formik.errors.phone && formik.touched.phone &&
            <div className='alert alert-danger'>{formik.errors.phone}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="password"
          />
          {formik.errors.password && formik.touched.password &&
            <div className='alert alert-danger'>{formik.errors.password}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="rePassword" className="form-label">rePassword</label>
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control"
            placeholder="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword &&
            <div className='alert alert-danger'>{formik.errors.rePassword}</div>}
        </div>
        <button type='submit' disabled={!formik.isValid} className='btn btn-sm btn-success'>Submit</button>
        <div className='d-flex justify-content-between align-items-center'>
  {loader && (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
  )}
</div>

      </form>
    </div>
  )
}




// import React from 'react';
// import axios from "axios";
// import './Register.module.css';
// import { useFormik } from "formik";
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// export default function Register() {
//   function submitForm(values){
//     console.log(values);
//   }
  
//   let validationSchema= Yup.object({
//     name: Yup.string().required('Name is required').min(3),
//     email: Yup.string().required('Email is required').email(),
//     phone: Yup.string().required().matches(/^\d{11}$/, 'Phone number must be 11 digits'),
//     password: Yup.string().required().matches(/[A-Z][a-z]{3,}/, 'Password must contain at least one uppercase letter and be at least 4 characters long'),
//     rePassword: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords must match')
//   });
  
//   let formik=useFormik(
//     {
//       initialValues:{
//         name:'',
//         email:'',
//         phone:'',
//         password:'',
//         rePassword:''
//       },
//       validationSchema:validationSchema,
//       onSubmit:submitForm
//     }
//   )
//   return (
//     <div className="container">
// <form onSubmit={formik.handleSubmit}>
//   <div className="mb-3">
//     <label htmlFor="name" className="form-label">Name</label>
//     <input
//     value={formik.values.name}
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//       type="text"
//       name="name"
//       id="name"
//       className="form-control"
//       placeholder="name"
//     />
//     {formik.errors.name&&formik.touched.name&&<div>
//     <div className='alert alert-danger'>{formik.errors.name}</div>
//     </div>}
//   </div>
 
//   <div className="mb-3">
//     <label htmlFor="email" className="form-label">E-mail</label>
//     <input
//      value={formik.values.email}
//      onChange={formik.handleChange}
//      onBlur={formik.handleBlur}
//       type="email"
//       name="email"
//       id="email"
//       className="form-control"
//       placeholder="email"
//     />
//     {formik.errors.email&&formik.touched.email&&<div>
//     <div className='alert alert-danger'>{formik.errors.email}</div>
//     </div>}
//   </div>
//   <div className="mb-3">
//     <label htmlFor="phone" className="form-label">Phone</label>
//     <input
//      value={formik.values.phone}
//      onChange={formik.handleChange}
//      onBlur={formik.handleBlur}
//       type="tel"
//       name="phone"
//       id="phone"
//       className="form-control"
//       placeholder="phone"
//     />
//      {formik.errors.phone&&formik.touched.phone&&<div>
//     <div className='alert alert-danger'>{formik.errors.phone}</div>
//     </div>}
//   </div>
//   <div className="mb-3">
//     <label htmlFor="password" className="form-label">Password</label>
//     <input
//      value={formik.values.password}
//      onChange={formik.handleChange}
//      onBlur={formik.handleBlur}
//       type="password"
//       name="password"
//       id="password"
//       className="form-control"
//       placeholder="password"
//     />
//      {formik.errors.password&&formik.touched.password&&<div>
//     <div className='alert alert-danger'>{formik.errors.password}</div>
//     </div>}
//   </div>
//   <div className="mb-3">
//     <label htmlFor="rePassword" className="form-label">rePassword</label>
//     <input
//      value={formik.values.rePassword}
//      onChange={formik.handleChange}
//      onBlur={formik.handleBlur}
//       type="password"
//       name="rePassword"
//       id="rePassword"
//       className="form-control"
//       placeholder="rePassword"
//     />
//      {formik.errors.rePassword&&formik.touched.rePassword&&<div>
//     <div className='alert alert-danger'>{formik.errors.rePassword}</div>
//     </div>}
//   </div>
//   <button type='submit' className='btn btn-sm btn-success'>Submit</button>
// </form>
// </div>
//     )
// }


// N A T I V E V A L I D A T I O N
//  function validateForm(values){
//     let errors={};
//     let emailRegex=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     let phoneNumberRegex = /^\d{11}$/;
//     let passwordRegex=/[A-Z][a-z]{3,}/
//     if(!values.name){
//       errors.name="name is required";
//     }
//     else if(values.name.length<3){
//       errors.name="Name must be at least 3 Characters";
//     }
//     if(!values.email){
//       errors.email="email is required";
//     }
//     else if(!emailRegex.test(values.email)){
//       errors.email="email is invalid";
//     }
//     if(!values.phone){
//       errors.phone="phone is required";
//     }
//     else if(!phoneNumberRegex.test(values.phone)){
//       errors.phone="Phone is invalid"
//     }
//     if(!values.password){
//       errors.password="password is required";
//     }
//     else if(!passwordRegex.test(values.password)){
//       errors.password="password is invalid"
//     }
//     if(!values.rePassword){
//       errors.rePassword="rePassword is required";
//     }
//     else if(values.password!=values.rePassword){
//       errors.rePassword="password donot match"
//     }
    
//     return errors;
//   }