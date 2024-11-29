// src/components/ModifyFaculty.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';

function ModifyFaculty({ departments, faculties, fetchFaculties }) {
  const { authTokens } = useContext(AuthContext);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

  // User details
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('ROLE_FACULTY');

  // Employee details
  const [employeeId, setEmployeeId] = useState('');
  const [title, setTitle] = useState('');
  const [photographPath, setPhotographPath] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  // Old employee ID to handle changes
  const [oldEmployeeId, setOldEmployeeId] = useState('');

  // Messages
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateError, setUpdateError] = useState('');

  const handleSelectFaculty = async (e) => {
    const employeeId = e.target.value;
    setSelectedEmployeeId(employeeId);
    if (employeeId) {
      try {
        // Fetch faculty details using employeeId
        const facultyResponse = await axios.get(
          `http://localhost:9987/api/v1/employees/employeeId/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${authTokens.token}`,
            },
          }
        );
        const facultyData = facultyResponse.data.data;

        // Set user and employee details
        setUserId(facultyData.user.id);
        setUsername(facultyData.user.username);
        setEmail(facultyData.user.email);
        setFirstName(facultyData.user.firstName);
        setLastName(facultyData.user.lastName);
        setRole(facultyData.user.roles);

        setEmployeeId(facultyData.employeeId);
        setTitle(facultyData.title);
        setPhotographPath(facultyData.photograph_path);
        setDepartmentId(facultyData.department.departmentId.toString());

        // Store the old employee ID
        setOldEmployeeId(facultyData.employeeId);

        setUpdateError('');
        setUpdateMessage('');
      } catch (err) {
        console.error('Error fetching faculty details:', err);
        setUpdateError('Failed to fetch faculty details');
        clearForm();
      }
    } else {
      // Clear the form
      clearForm();
    }
  };

  const clearForm = () => {
    setUserId('');
    setUsername('');
    setEmail('');
    setFirstName('');
    setLastName('');
    setRole('ROLE_FACULTY');
    setEmployeeId('');
    setTitle('');
    setPhotographPath('');
    setDepartmentId('');
    setOldEmployeeId('');
  };

  const handleUpdateFaculty = async (e) => {
    e.preventDefault();
    try {
      // Update user details
      await axios.patch(
        `http://localhost:9987/api/v1/dev/updateUser/${userId}`,
        {
          username,
          email,
          firstName,
          lastName,
          roles: role,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.token}`,
          },
        }
      );

      // Prepare the update object for employee details
      const updateData = {
        empid: oldEmployeeId, // Old employee ID
        update: {
          employeeId, // New employee ID from the form
          title,
          photograph_path: photographPath,
          departmentId: parseInt(departmentId),
        },
      };

      // Update employee details
      await axios.patch(
        'http://localhost:9987/api/v1/employees/update',
        updateData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.token}`,
          },
        }
      );

      setUpdateMessage('Faculty details updated successfully');
      setUpdateError('');

      // Update the selectedEmployeeId to the new employeeId
      setSelectedEmployeeId(employeeId);

      // Update oldEmployeeId to the new employeeId for future updates
      setOldEmployeeId(employeeId);

      // Refresh faculties list
      fetchFaculties();
    } catch (err) {
      console.error('Error updating faculty details:', err);
      setUpdateError('Failed to update faculty details');
      setUpdateMessage('');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Modify Faculty Details</Card.Title>
        {updateMessage && <Alert variant="success">{updateMessage}</Alert>}
        {updateError && <Alert variant="danger">{updateError}</Alert>}
        {/* Select Faculty */}
        <Form.Group controlId="formSelectFaculty" className="mb-3">
          <Form.Label>Select Faculty</Form.Label>
          <Form.Control
            as="select"
            value={selectedEmployeeId}
            onChange={handleSelectFaculty}
          >
            <option value="">--Select Faculty--</option>
            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.employeeId}>
                {faculty.user.firstName} {faculty.user.lastName} (Employee ID: {faculty.employeeId})
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        {/* Update Form */}
        {userId && (
          <Form onSubmit={handleUpdateFaculty}>
            <Row>
              {/* User Details */}
              <Col md={6}>
                <h5>User Details</h5>
                {/* Username */}
                <Form.Group controlId="formUpdateUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                {/* Email */}
                <Form.Group controlId="formUpdateEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                {/* First Name */}
                <Form.Group controlId="formUpdateFirstName" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Group>
                {/* Last Name */}
                <Form.Group controlId="formUpdateLastName" className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Group>
                {/* Role */}
                <Form.Group controlId="formUpdateRole" className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="ROLE_FACULTY">ROLE_FACULTY</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              {/* Employee Details */}
              <Col md={6}>
                <h5>Employee Details</h5>
                {/* Employee ID */}
                <Form.Group controlId="formUpdateEmployeeId" className="mb-3">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                  />
                </Form.Group>
                {/* Department */}
                <Form.Group controlId="formUpdateDepartment" className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    as="select"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    required
                  >
                    <option value="">--Select Department--</option>
                    {departments.map((dept) => (
                      <option key={dept.departmentId} value={dept.departmentId}>
                        {dept.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                {/* Title */}
                <Form.Group controlId="formUpdateTitle" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>
                {/* Photograph Path */}
                <Form.Group controlId="formUpdatePhotographPath" className="mb-3">
                  <Form.Label>Photograph Path</Form.Label>
                  <Form.Control
                    type="text"
                    value={photographPath}
                    onChange={(e) => setPhotographPath(e.target.value)}
                    required
                    placeholder="e.g., /images/photo.jpg"
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* Submit Button */}
            <Button variant="primary" type="submit">
              Update Faculty
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

export default ModifyFaculty;
