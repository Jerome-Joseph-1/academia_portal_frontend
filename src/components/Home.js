import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ margin: '50px' }}>
      <h2>Welcome to the App</h2>
      <p>Please select your login portal:</p>
      <ul>
        <li>
          <Link to="/admin-login">Admin Login</Link>
        </li>
        <li>
          <Link to="/hr-login">HR Login</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
