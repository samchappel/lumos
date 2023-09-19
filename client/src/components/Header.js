import React from "react";
import Search from './Search';
import lumosheader from '../assets/chase-the-light.png';

function Header({ handleSearch }) {
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: `url("/header9.jpeg")` }}>
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md flex flex-col items-center">
          <img src={lumosheader} alt="lumosheader" className="w-2/3" />
          <Search handleSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}

export default Header;





