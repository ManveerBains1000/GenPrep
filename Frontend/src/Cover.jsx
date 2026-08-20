import React from 'react'
import {Outlet} from "react-router"
import Header from './components/Header/Header.jsx'
const Cover = () => {
  return (
    <>  
      <Header />
      <Outlet />
    </>

  )
}

export default Cover
