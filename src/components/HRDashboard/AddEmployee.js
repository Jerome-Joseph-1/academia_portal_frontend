// src/components/AddEmployee.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { Form, Button, Card, Alert } from 'react-bootstrap';

function AddEmployee({ departments, fetchFaculties }) {
  const { authTokens } = useContext(AuthContext);

  // Form input state variables
  const [addUsername, setAddUsername] = useState('');
  const [addPassword, setAddPassword] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addRole, setAddRole] = useState('ROLE_FACULTY');
  const [addEmployeeId, setAddEmployeeId] = useState('');
  const [addDepartmentId, setAddDepartmentId] = useState('');
  const [addTitle, setAddTitle] = useState('');
  const [addPhotographPath, setAddPhotographPath] = useState('');
  const [addFirstName, setAddFirstName] = useState('');
  const [addLastName, setAddLastName] = useState('');

  // Messages
  const [addMessage, setAddMessage] = useState('');
  const [addError, setAddError] = useState('');

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:9987/api/v1/employees/add',
        {
          username: addUsername,
          password: addPassword,
          email: addEmail,
          roles: addRole,
          employeeId: addEmployeeId,
          departmentId: parseInt(addDepartmentId),
          title: addTitle,
          photograph_path: addPhotographPath,
          firstName: addFirstName,
          lastName: addLastName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.token}`,
          },
        }
      );
      setAddMessage('Employee added successfully');
      setAddError('');
      // Reset form fields
      setAddUsername('');
      setAddPassword('');
      setAddEmail('');
      setAddRole('ROLE_FACULTY');
      setAddEmployeeId('');
      setAddDepartmentId('');
      setAddTitle('');
      setAddPhotographPath('');
      setAddFirstName('');
      setAddLastName('');
      // Refresh faculties list
      fetchFaculties();
    } catch (err) {
      console.error('Error adding employee:', err);
      setAddError('Failed to add employee');
      setAddMessage('');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Add Employee</Card.Title>
        {addMessage && <Alert variant="success">{addMessage}</Alert>}
        {addError && <Alert variant="danger">{addError}</Alert>}
        <Form onSubmit={handleAddEmployee}>
          {/* Username */}
          <Form.Group controlId="formAddUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={addUsername}
              onChange={(e) => setAddUsername(e.target.value)}
              required
            />
          </Form.Group>
          {/* Password */}
          <Form.Group controlId="formAddPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={addPassword}
              onChange={(e) => setAddPassword(e.target.value)}
              required
            />
          </Form.Group>
          {/* Email */}
          <Form.Group controlId="formAddEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={addEmail}
              onChange={(e) => setAddEmail(e.target.value)}
              required
            />
          </Form.Group>
          {/* Role */}
          <Form.Group controlId="formAddRole" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={addRole}
              onChange={(e) => setAddRole(e.target.value)}
              required
            >
              <option value="ROLE_FACULTY">ROLE_FACULTY</option>
            </Form.Control>
          </Form.Group>
          {/* Employee ID */}
          <Form.Group controlId="formAddEmployeeId" className="mb-3">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="text"
              value={addEmployeeId}
              onChange={(e) => setAddEmployeeId(e.target.value)}
              required
            />
          </Form.Group>
          {/* Department */}
          <Form.Group controlId="formAddDepartment" className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              as="select"
              value={addDepartmentId}
              onChange={(e) => setAddDepartmentId(e.target.value)}
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
          <Form.Group controlId="formAddTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={addTitle}
              onChange={(e) => setAddTitle(e.target.value)}
              required
            />
          </Form.Group>
          {/* Photograph Path */}
          <Form.Group controlId="formAddPhotographPath" className="mb-3">
            <Form.Label>Photograph Path</Form.Label>
            <Form.Control
              type="text"
              value={addPhotographPath}
              onChange={(e) => setAddPhotographPath(e.target.value)}
              required
              placeholder="e.g., /images/photo.jpg"
            />
          </Form.Group>
          {/* First Name */}
          <Form.Group controlId="formAddFirstName" className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={addFirstName}
              onChange={(e) => setAddFirstName(e.target.value)}
              required
            />
          </Form.Group>
          {/* Last Name */}
          <Form.Group controlId="formAddLastName" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={addLastName}
              onChange={(e) => setAddLastName(e.target.value)}
              required
            />
          </Form.Group>
          {/* Submit Button */}
          <Button variant="primary" type="submit">
            Add Employee
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddEmployee;
