// src/components/AdminDashboard/AdminDashboard.js

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import {
  Navbar,
  Nav,
  Container,
  Alert,
} from 'react-bootstrap';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import AssignCourse from './AssignCourse';
import ViewAssignedCourses from './ViewAssignedCourses';

function AdminDashboard() {
  const { logout, authTokens } = useContext(AuthContext);
  const [faculties, setFaculties] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    window.location.href = '/admin-login';
  };

  useEffect(() => {
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

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:9987/api/v1/courses', {
          headers: {
            Authorization: `Bearer ${authTokens.token}`,
          },
        });
        setCourses(response.data.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses');
      }
    };

    fetchFaculties();
    fetchCourses();
  }, [authTokens]);

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin-dashboard/assign-course">
                Assign Course
              </Nav.Link>
              <Nav.Link as={Link} to="/admin-dashboard/view-assigned-courses">
                View Assigned Courses
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
            element={<Navigate to="/admin-dashboard/assign-course" replace />}
          />
          <Route
            path="assign-course"
            element={
              <AssignCourse
                faculties={faculties}
                courses={courses}
              />
            }
          />
          <Route
            path="view-assigned-courses"
            element={
              <ViewAssignedCourses
                faculties={faculties}
              />
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default AdminDashboard;
