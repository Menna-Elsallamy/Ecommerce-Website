import React, { useContext } from 'react';
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner"
import { userContext } from '../../components/Context/UserContext';
export default function Login() {
  let {setUserToken}=useContext(userContext)
  const [error, setError] = useState(null)
  const [loader, setloader] = useState(false)
  let navigate = useNavigate();
  function navigatetoforgetpassword(){
    navigate('/forgetpassword');
  }
  async function submitForm(values) {
    setloader(true);
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => { setloader(false); setError(err.response.data.message) });
    console.log(data);
    if (data.message === "success") {
      localStorage.setItem('userToken',data.token);
      setUserToken(data.token);
      setloader(false);
      navigate('/');
    }
    console.log(data)

  }
  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email(),
    password: Yup.string().required().matches(/[A-Z][a-z]{3,}/, 'Password must contain at least one uppercase letter and be at least 4 characters long'),
  });
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: submitForm
  });
  return (
    <div className="container">
      {error && <div className='alert alert-danger'>{error}</div>}
      <form onSubmit={formik.handleSubmit}>
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
      <h6 onClick={()=>navigatetoforgetpassword()} className='h6 text-danger my-2 cursor-pointer'>Forgot your password?</h6>
    </div>
  )
}