import React from "react";

function Header() {
  return (
  <div className="hero min-h-screen" style={{ backgroundImage: `url("/header9.jpeg")` }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">LUMOS</h1>
      <p className="mb-5">chase the light</p>
      <button className="btn btn-primary" style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>Search</button>
    </div>
  </div>
</div>
  );
}

export default Header;