import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ updateUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    updateUser(null);
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;