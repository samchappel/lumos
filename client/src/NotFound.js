import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-cover bg-center h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl text-white font-bold mb-4 mt-8">404 Error: Oops! It seems the sun has set on this page.</h1>
      <h2 className="text-xl text-white mb-8">We promise not to leave you in the dark!</h2>
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-ghost" onClick={handleGoBack}>
        Return to the Light
      </button>
    </div>
  );
}

export default NotFound;