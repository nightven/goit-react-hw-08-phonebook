import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
const AuthNav = () => {
  return (
    <Box component="div" sx={{display: 'flex',  gap: '16px'}}>
      <NavLink to="/register" style={{ textDecoration: 'none' }}>Registration</NavLink>
      <NavLink to="/login" style={{ textDecoration: 'none' }}>Login</NavLink>
    </Box>
  );
};

export default AuthNav;
