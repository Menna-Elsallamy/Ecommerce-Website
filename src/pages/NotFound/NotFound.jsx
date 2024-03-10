import React from 'react'
import './NotFound.module.css'
import notFound from '../../Assets/Photos/error.svg'
export default function NotFound() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <img src={notFound} className='w-100'/>
    </div>
  )
}
