import React from 'react'
import '../css/ContactComponent.css'
import contactUsLogo from '../images/contact-us-logo.png'

const ContactComponent = () => {
  return (
    <div className='contact-form-container'>
      <img src={contactUsLogo} alt='Contact Us' className='contact-us-logo'></img>
      <form className='contact-form'>
        <div className='fullName'>
          <label className='full-name-heading'><i class="fa-solid fa-user"></i> Full Name</label>
          <input type='text' className='full-name-text' placeholder='Aman Bansal'></input>
        </div>
        <div className='emailAddress'>
          <label className='email-address-heading'><i class="fa-solid fa-envelope"></i> Email Address</label>
          <input type='email' className='email-address-text' placeholder='aman@gmail.com'></input>
        </div>
        <div className='phoneNumber'>
          <label className='phone-number-heading'><i class="fa-solid fa-phone"></i> Phone Number</label>
          <input type='number' className='phone-number-text' placeholder='0123456789'></input>
        </div>
        <div className='textMessage'>
          <label className='text-message-heading'><i class="fa-solid fa-message"></i> Your Query</label>
          <textarea className='text-message' placeholder='Hi, Please enter your query here.'></textarea>
        </div>
        <div>
          <button className='submit-form-button'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ContactComponent