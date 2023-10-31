import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navigation({ isLoggedIn, handleLogout, setIsLoggedIn }) {
  useEffect(() => {
    console.log('Navigation re-rendered. isLoggedIn:', isLoggedIn);
    if (isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, setIsLoggedIn]);

  return (
    <div className="nav-container">
      <div className="navbar">
        <div className="flex-1">
          <Link to="/home">
            <img src="/lumos_logo.png" alt="Logo" style={{ width: "100px", height: "50px" }} />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link to="/logout" onClick={handleLogout}>Log Out</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Log In/Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navigation;