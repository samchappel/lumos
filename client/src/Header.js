import React from "react";
import Search from './Search';

function Header({ handleSearch }) {
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: `url("/header9.jpeg")` }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-secondary">LUMOS</h1>
          <p className="mb-5 text-secondary">CHASE THE LIGHT</p>
          <Search handleSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}

export default Header;