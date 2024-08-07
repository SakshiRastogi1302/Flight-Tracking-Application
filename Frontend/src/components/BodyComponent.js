import React from 'react'
import {Outlet } from 'react-router-dom'
import HeaderComponent from './HeaderComponent'

const BodyComponent = () => {
  return (
    <div>
      <HeaderComponent />
      <Outlet />
    </div>
  )
}

export default BodyComponent