import { useAuth } from 'hooks/useAuth';
import React from 'react'

import { Navigate, } from 'react-router-dom'

const PrivateRoute = ({children}) => {
  const { isLoggedIn, } = useAuth();
  return  (
  <>
  {isLoggedIn &&  children}
  {!isLoggedIn && <Navigate to='/login'/> }
  </>  
   )
  
}

export default PrivateRoute