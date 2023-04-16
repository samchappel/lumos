import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navigation({ isLoggedIn, handleLogout, setIsLoggedIn, handleSearch }) {
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <nav className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/Favorites">Favorites</Link>
        <Link to="/Gallery">Gallery</Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/logout" onClick={handleLogout}>Log Out</Link>
          </>
        ) : (
          <Link to="/login">Log In/Sign Up</Link>
        )}
      </nav>
    </div>
  );
}

export default Navigation;