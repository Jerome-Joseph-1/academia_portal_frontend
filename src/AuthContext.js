import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const existingTokens = JSON.parse(localStorage.getItem('authTokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem('authTokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  const logout = () => {
    localStorage.removeItem('authTokens');
    setAuthTokens(null);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
