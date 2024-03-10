import React from 'react';
import { useFormik } from 'formik';
import { cartContext } from '../../components/Context/CartContext';
import { useContext } from 'react'

export default function CheckOut() {
    const {payment} = useContext(cartContext)

   async function checkOutPayment(values) {
    const {data}  =await  payment(values)
    console.log(data.session.url)
    window.location.href=data.session.url
    }

    let formik = useFormik({
        initialValues: {
            details: '',
            city: '',
            phone: '',
        },
        onSubmit: checkOutPayment,
    });

  
    return (

        <div className="container bg-main-light p-5 vh-100">
            <h2>CheckOut:</h2>
            <form onSubmit={formik.handleSubmit}>
                <div class="mb-3">
                    <label for="" class="form-label">Details</label>
                    <input
                        type="text"
                        name="details"
                        id="Details"
                        class="form-control"
                        placeholder=""
                        value={formik.values.details}
                        onChange={formik.handleChange}
                    />
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        id="Phone"
                        class="form-control"
                        placeholder=""
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                    />
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">City</label>
                    <input
                        type="text"
                        name="city"
                        id="City"
                        class="form-control"
                        placeholder=""
                        value={formik.values.city}
                        onChange={formik.handleChange}
                    />
                </div>
                <button type='submit' className='btn btn-success'>Pay now</button>
            </form>
        </div>
    )
        
}
