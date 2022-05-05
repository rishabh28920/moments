import React from 'react'
import { Link } from 'react-router-dom'
import "./footer.css"
function Footer() {
  function handleRedirect(){
    window.location.href="https://github.com/rishabh28920";
  }
  return (
    <div>
      <footer>
        <p>Made With ♥ By <span className='redirect' onClick={handleRedirect}>Rishabh</span></p>
      </footer>
    </div>

  )
}

export default Footer