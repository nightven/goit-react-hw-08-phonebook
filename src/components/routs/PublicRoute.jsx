import { useAuth } from 'hooks/useAuth';
import React from 'react'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({children}) => {
  const { isLoggedIn, } = useAuth();
  
  return  isLoggedIn ?  <Navigate to='/'/>  : children
}

export default PublicRoute