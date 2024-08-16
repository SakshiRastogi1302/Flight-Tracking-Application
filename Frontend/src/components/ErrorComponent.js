import React from 'react'
import errorImage from '../images/error-image.png'
import '../css/ErrorComponent.css'
import {Link} from 'react-router-dom'

const ErrorComponent = () => {
  return (
    <div className='error-section'>
      <img src={errorImage} alt='Error' className='error-logo'></img>
      <div className='error-content'>
        <h1 className='error-heading'>Error 404</h1>
        <p className='error-text'>Oops! Page Not Found</p>
        <div className='error-solution'>Sorry, the page you are looking for does not exist.</div>
        <Link to='/'><button className='go-to-home-btn'><i className="fa-solid fa-house house-icon"></i> GO TO HOME</button></Link>
      </div>
    </div>
  )
}

export default ErrorComponent