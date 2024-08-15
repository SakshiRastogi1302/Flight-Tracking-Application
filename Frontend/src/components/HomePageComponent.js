import React from 'react'
import { Link } from 'react-router-dom'
import '../css/HomePageComponent.css'


const HomePageComponent = () => {
  return (
    <div className='homepage'>
          <div className='main-heading'>
            <p className='homepage-heading'>Welcome To Sky Vista</p>
            <p className='tagline'>Your Gateway to the Skies: Easy Booking, Endless Destinations</p>            
          </div>
          <div className='button'>
            <Link to='/bookYourFlight'><button className='book-flight'>Book Your Flight</button></Link>
            <Link to='/checkFlightStatus'><button className='check-status'>Check Flight Status</button></Link>
          </div>
          <div className='background-image'></div>
    </div>
  )
}

export default HomePageComponent