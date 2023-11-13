import React from 'react'
import image from '../components/images/404=NotFound.jpg'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className='notFound'>
      <img src={image} alt="Resource not found" />
      <h1>Resource Not Found</h1>
    </div>
  )
}