import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navigation({ isLoggedIn, handleLogout, setIsLoggedIn, handleSearch }) {
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <div className="navbar" style={{ backgroundColor: '#54473e' }}>
        <div className="flex-1">
        <Link to="/">
          <img src="/lumos_logo.png" alt="Logo" style={{ width: "100px", height: "50px" }} />
        </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Favorites">Favorites</Link></li>
            <li><Link to="/Gallery">Gallery</Link></li>
            <li><Link to="/premium">Premium</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link to="/logout" onClick={handleLogout}>Log Out</Link></li>
              </>
            ) : (
              <li><Link to="/login">Log In/Sign Up</Link></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navigation;