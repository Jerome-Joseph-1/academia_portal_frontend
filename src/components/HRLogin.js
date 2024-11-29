// src/components/HRLogin.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

function HRLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9987/api/v1/dev/login', {
        username,
        password,
      });

      const token = response.data.data;

      const userData = { role: 'hr', token };
      setAuthTokens(userData);
      navigate('/hr-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials for HR');
    }
  };

  return (
    <div style={{ margin: '50px' }}>
      <h2>HR Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ marginLeft: '22px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginLeft: '24px' }}
          />
        </div>
        <button type="submit">Login as HR</button>
      </form>
    </div>
  );
}

export default HRLogin;
