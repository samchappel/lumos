import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch('/authorized')
      .then(response => {
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(error => console.error('Error checking auth status:', error));
  }, []);

  const handleLogout = () => {
    fetch('/logout', { method: 'DELETE' })
      .then(() => {
        setIsLoggedIn(false);
        navigate('/login');
      })
      .catch(error => console.error('Error logging out:', error));
  };

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