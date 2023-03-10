import React from 'react'
import logo from "../images/mainlogo.png"
import "./Navbar.css"

function Navbar() {
  return (
    <div>
      <ul className="navbar" id="navbar">
     
        <img src={logo} height="45" width="150" alt="LOGO"/>
        <div className="menu">
            <li><a href="#">HOME</a></li>
            <li><a href="#">LOGIN</a></li>
            <li><a href="#">REGISTER</a></li>
            <li><a href="#">CONTACT US</a></li>
        </div>
    </ul>
    </div>
  )
}

export default Navbar
