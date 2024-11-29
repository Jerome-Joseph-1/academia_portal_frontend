import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { Card, Form, Button, Alert } from 'react-bootstrap';

function AssignCourse({ faculties, courses }) {
  const { authTokens } = useContext(AuthContext);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAssignCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:9987/api/v1/facultyCourses/assign?facultyId=${selectedFaculty}&courseId=${selectedCourse}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${authTokens.token}`,
          },
        }
      );
      setMessage('Course assigned successfully');
      setError('');
      // Reset form fields
      setSelectedFaculty('');
      setSelectedCourse('');
    } catch (err) {
      console.error('Error assigning course:', err);
      setError('Failed to assign course');
      setMessage('');
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Assign Course to Faculty</Card.Title>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleAssignCourse}>
          {/* Select Faculty */}
          <Form.Group controlId="formSelectFaculty" className="mb-3">
            <Form.Label>Select Faculty to Assign</Form.Label>
            <Form.Control
              as="select"
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              required
            >
              <option value="">--Select Faculty--</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.user.firstName} {faculty.user.lastName} (ID: {faculty.id})
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* Select Course */}
          <Form.Group controlId="formSelectCourse" className="mb-3">
            <Form.Label>Select Course to Assign</Form.Label>
            <Form.Control
              as="select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
            >
              <option value="">--Select Course--</option>
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.name} ({course.courseCode})
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Assign Course
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AssignCourse;
