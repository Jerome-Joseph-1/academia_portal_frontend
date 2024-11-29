// src/components/HRDashboard.js

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { Navbar, Nav, Container, Alert } from 'react-bootstrap';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import AddEmployee from './AddEmployee';
import ModifyFaculty from './ModifyFaculty';

function HRDashboard() {
  const { logout, authTokens } = useContext(AuthContext);

  // Shared data
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    window.location.href = '/hr-login';
  };

  // Function to refresh faculties list
  const fetchFaculties = async () => {
    try {
      const response = await axios.get('http://localhost:9987/api/v1/employees/faculty', {
        headers: {
          Authorization: `Bearer ${authTokens.token}`,
        },
      });
      setFaculties(response.data.data);
    } catch (err) {
      console.error('Error fetching faculties:', err);
      setError('Failed to fetch faculties');
    }
  };

  useEffect(() => {
    fetchFaculties();

    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:9987/api/v1/departments/all', {
          headers: {
            Authorization: `Bearer ${authTokens.token}`,
          },
        });
        setDepartments(response.data.data);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setError('Failed to fetch departments');
      }
    };

    fetchDepartments();
  }, [authTokens]);

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>HR Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/hr-dashboard/add-employee">
                Add Employee
              </Nav.Link>
              <Nav.Link as={Link} to="/hr-dashboard/modify-faculty">
                Modify Faculty
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  
      {/* Main Content */}
      <Container className="mt-4">
        {error && <Alert variant="danger">{error}</Alert>}
  
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/hr-dashboard/add-employee" replace />}
          />
          <Route
            path="add-employee"
            element={
              <AddEmployee
                departments={departments}
                fetchFaculties={fetchFaculties}
              />
            }
          />
          <Route
            path="modify-faculty"
            element={
              <ModifyFaculty
                departments={departments}
                faculties={faculties}
                fetchFaculties={fetchFaculties}
              />
            }
          />
        </Routes>
      </Container>
    </>
  );
  
}

export default HRDashboard;
