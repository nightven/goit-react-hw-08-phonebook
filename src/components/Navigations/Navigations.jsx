
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn ? (
        <NavLink to="/phonebook" style={{ textDecoration: 'none' }}>
          Phonebook
        </NavLink>
      ) : (
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          Home
        </NavLink>
      )}
    </>
  );
};

export default Navigation;
