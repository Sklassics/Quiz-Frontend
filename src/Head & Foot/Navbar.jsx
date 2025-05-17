import React from 'react'
import '../cssfiles/Navbar.css'
export const Navbar = () => {
  return (
    <header>
        <div className="logo">
            <img src="https://sklassics.com/wp-content/uploads/2024/06/Sklassics.png"/>
        </div>
        
        <nav>
            <ul className="nav-links">
            
                <li><a href="/">Home</a></li>
                <li><a href="/aboutus">About Us</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Signup</a></li>
                
                
            </ul>
        </nav>
        
    </header>
    
  )
}
export default Navbar;