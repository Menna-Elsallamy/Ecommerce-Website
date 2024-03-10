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
  async function submitForm(values) {
  
    setloader(true);
    values.resetCode = values.resetCode.toString();
    let {data} = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode", values)
      .catch((err) => { setloader(false); setError(err.response.data.message) });
    console.log(data);
    if (data.status === "Success") {
      console.log("hello")
      localStorage.setItem('userToken',data.token);
      setUserToken(data.token);
      setloader(false);
      console.log("Navigating to /reset-password");
      navigate('/reset-password');
      
    }
    console.log(data)
  }
  let validationSchema = Yup.object({
    resetCode: Yup.string() // Change the validation type to string
    .required('Code is required')
    .matches(/^\d{6}$/, 'Code must be a 6-digit number') // Adjust validation for a 6-digit number
    
  });
  
  
  let formik = useFormik({
    initialValues: {
      resetCode: '', // Initialize as a string
    },
    validationSchema: validationSchema,
    onSubmit: submitForm
  });
  return (
    <div className="container">
      {error && <div className='alert alert-danger'>{error}</div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="resetCode" className="form-label">resetCode</label>
          <input
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
            name="resetCode"
            id="resetCode"
            className="form-control"
            placeholder="resetCode"
          />
          {formik.errors.resetCode && formik.touched.resetCode &&
            <div className='alert alert-danger'>{formik.errors.resetCode}</div>}
        </div>
       
        <button type='submit' disabled={!formik.isValid} className='btn btn-sm btn-success'>Verify</button>
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
