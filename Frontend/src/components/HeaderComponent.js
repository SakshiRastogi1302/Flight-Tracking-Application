import React from 'react'
import '../css/HeaderComponent.css'
import airlineLogo from '../images/airline-logo.png'
import { Link } from 'react-router-dom'

const HeaderComponent = () => {

  return (
    <div className='header'>
      <img src={airlineLogo} alt='Airline Logo' className='airline-logo'></img>
      <ul className='navItems'>
        <Link to='/' className='link'><li><i className="fa-solid fa-house"></i> Home</li></Link>
        <Link to='/about' className='link'><li><i className="fa-solid fa-address-card"></i> About Us</li></Link>
        <Link to='/bookingTerms' className='link'><li><i className="fa-solid fa-book-open-reader"></i> Booking Terms</li></Link>
        <Link to='/contact' className='link'><li><i className="fa-solid fa-phone"></i> Get In Touch</li></Link>
        <Link to='appNotifications'><i className="fa-solid fa-bell"></i></Link>
      </ul>
      <Link to='/login' className='button-link'><button className='signInBtn'><p className='signInBtnText'><i className="fa-solid fa-lock"></i> Sign In</p></button></Link>
    </div>
  )
}

export default HeaderComponent