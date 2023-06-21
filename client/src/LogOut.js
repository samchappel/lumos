import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn } from './redux/actions';

const Logout = ({ updateUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    dispatch(setUserLoggedIn(false)); 
    updateUser(null);
    navigate('/login');
  };

  const dispatch = useDispatch();

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;