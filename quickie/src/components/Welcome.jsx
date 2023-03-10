import React from 'react'
import logo from "./images/mainlogo.png"
import scrollImage from "./images/scrolllogo.png"
import "./Welcome.css"

function Welcome() {
  return (
      <div className= "flex-container"> 
        <div className= "flex-container-left">
            <img   src={logo} height="100" width="300" alt="LOGO"/>
        </div>
        <a 
        className="scroll"
        >   
            <img src={scrollImage} height="30" width="30"/>
        </a>
        <div className= "flex-container-right">
           <h1>WELCOME.</h1>
           <p>Now get Orders Delivered right at your door steps , yes we mean your classes or anywhere in the campus.</p>
        </div>
        
    </div>
  )
}

export default Welcome
