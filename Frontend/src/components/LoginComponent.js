import React, { useState } from 'react'
import '../css/LoginComponent.css'

const LoginComponent = () => {
  const [signInOrSignOut, setSignInOrSignOut] = useState(true);

  const toggleToSignInSignOut = () => {
    setSignInOrSignOut(!signInOrSignOut);
  }

  return (
    <div className='login-container'>
      <div className='login-section'>
        <h1 className='login-heading'>{signInOrSignOut ? "SIGN IN" : "SIGN UP"}</h1>
        <div>
          {signInOrSignOut ? null : (<div className='name-container'>
            <label className='name-text'>Full Name</label>
            <input type='text' className='name-input-field'></input>
          </div>)}
          <div className='email-container'>
            <label className='email-text'>Email Address</label>
            <input type='email' className='email-input-field'></input>
          </div>
          <div className='password-container'>
            <label className='password-text'>Password</label>
            <input type='password' className='password-input-field'></input>
          </div>
          <button className='signIn-btn'>Sign In</button>
          <div className='create-account'>
            <p className='create-account-text'>{signInOrSignOut ? "Don't have an account?" : "Already have an account"}</p>
            <p className='register' onClick={toggleToSignInSignOut}>{signInOrSignOut ? "Sign Up" : "Sign In"}</p>
          </div>
          <hr className='horizontal-line'></hr>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent