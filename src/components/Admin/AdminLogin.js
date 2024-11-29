import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Form,
  Button,
  Alert,
  Navbar,
  Nav,
} from 'react-bootstrap';

function AdminLogin() {
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

      const userData = { role: 'admin', token };
      setAuthTokens(userData);
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials for Admin');
    }
  };

  return (
    <>
      {/* Optional Navbar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Admin Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* Add navigation links if needed */}
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-5" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Admin Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* Username */}
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </Form.Group>
          {/* Password */}
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </Form.Group>
          {/* Submit Button */}
          <Button variant="primary" type="submit" className="w-100">
            Login as Admin
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default AdminLogin;
