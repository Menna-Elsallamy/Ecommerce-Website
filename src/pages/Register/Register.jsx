import React from 'react'
import './Register.module.css'
import { useFormik } from "formik";
export default function Register() {
  function submitForm(values){
    // console.log('hjj');
    console.log(values)
  }
  function validateForm(values){
    let errors={};
    let emailRegex=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    let phoneNumberRegex = /^\d{11}$/;
    let passwordRegex=/[A-Z][a-z]{3,}/
    if(!values.name){
      errors.name="name is required";
    }
    else if(values.name.length<3){
      errors.name="Name must be at least 3 Characters";
    }
    if(!values.email){
      errors.email="email is required";
    }
    else if(!emailRegex.test(values.email)){
      errors.email="email is invalid";
    }
    if(!values.phone){
      errors.phone="phone is required";
    }
    else if(!phoneNumberRegex.test(values.phone)){
      errors.phone="Phone is invalid"
    }
    if(!values.password){
      errors.password="password is required";
    }
    else if(!passwordRegex.test(values.password)){
      errors.password="password is invalid"
    }
    if(!values.repassword){
      errors.repassword="repassword is required";
    }
    else if(values.password!=values.repassword){
      errors.repassword="password donot match"
    }
    
    return errors;
  }
  let formik=useFormik(
    {
      initialValues:{
        name:'',
        email:'',
        phone:'',
        password:'',
        repassword:''
      },
      onSubmit:submitForm,
      validate:validateForm
    }
  )
  return (
    <div className="container">
<form onSubmit={formik.handleSubmit}>
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input
    value={formik.values.name}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
      type="text"
      name="name"
      id="name"
      class="form-control"
      placeholder="name"
    />
    {formik.errors.name&&formik.touched.name&&<div>
    <div className='alert alert-danger'>{formik.errors.name}</div>
    </div>}
  </div>
 
  <div class="mb-3">
    <label for="email" class="form-label">E-mail</label>
    <input
     value={formik.values.email}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
      type="email"
      name="email"
      id="email"
      class="form-control"
      placeholder="email"
    />
    {formik.errors.email&&formik.touched.email&&<div>
    <div className='alert alert-danger'>{formik.errors.email}</div>
    </div>}
  </div>
  <div class="mb-3">
    <label for="phone" class="form-label">Phone</label>
    <input
     value={formik.values.phone}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
      type="tel"
      name="phone"
      id="phone"
      class="form-control"
      placeholder="phone"
    />
     {formik.errors.phone&&formik.touched.phone&&<div>
    <div className='alert alert-danger'>{formik.errors.phone}</div>
    </div>}
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input
     value={formik.values.password}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
      type="password"
      name="password"
      id="password"
      class="form-control"
      placeholder="password"
    />
     {formik.errors.password&&formik.touched.password&&<div>
    <div className='alert alert-danger'>{formik.errors.password}</div>
    </div>}
  </div>
  <div class="mb-3">
    <label for="repassword" class="form-label">repassword</label>
    <input
     value={formik.values.repassword}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
      type="password"
      name="repassword"
      id="repassword"
      class="form-control"
      placeholder="repassword"
    />
     {formik.errors.repassword&&formik.touched.repassword&&<div>
    <div className='alert alert-danger'>{formik.errors.repassword}</div>
    </div>}
  </div>
  <button type='submit' className='btn btn-sm btn-success'>Submit</button>
</form>
</div>
    )
}
