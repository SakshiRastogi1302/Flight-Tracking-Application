import React from 'react'
import '../css/BodyComponent.css'
import arrowIcon from '../images/arrow-icon.png'
import { Link } from 'react-router-dom'

const BodyComponent = () => {
  return (
    <div className='mainBody'>
        {/* Added a background image */}
        <div className='backgroundImage'></div>
        <div className='status'>
            {/* Added a heading */}
            <h1 className='mainHeading'>Check Flight Status</h1>
            {/* Created a button with an icon. When we click on the button, it will take us to check flight status page without reloading the page.*/}
            <Link to='/checkFlightStatus' className='link'><button className='statusCheckBtn'>Check Status<img src={arrowIcon} alt='Arrow' className='arrowImage'></img></button></Link>
        </div>
    </div>
  )
}

export default BodyComponent