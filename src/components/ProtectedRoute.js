// src/components/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
// import jwt_decode from 'jwt-decode';

function ProtectedRoute({ children, role }) {
  const { authTokens } = useContext(AuthContext);

  if (!authTokens) {
    return <Navigate to={`/${role}-login`} />;
  }

//   const decodedToken = jwt_decode(authTokens.token);

//   if (decodedToken.role !== role) {
//     return <Navigate to="/" />;
//   }

  return children;
}

export default ProtectedRoute;
