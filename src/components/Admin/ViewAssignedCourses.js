import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { Card, Form, Button, Alert, Table } from 'react-bootstrap';

function ViewAssignedCourses({ faculties }) {
  const { authTokens } = useContext(AuthContext);
  const [viewFacultyId, setViewFacultyId] = useState('');
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [viewMessage, setViewMessage] = useState('');
  const [viewError, setViewError] = useState('');

  // Function to fetch assigned courses
  const fetchAssignedCourses = async (facultyId) => {
    try {
      const response = await axios.get(
        `http://localhost:9987/api/v1/facultyCourses/${facultyId}/courses`,
        {
          headers: {
            Authorization: `Bearer ${authTokens.token}`,
          },
        }
      );
      setAssignedCourses(response.data.data);
      setViewError('');
    } catch (err) {
      console.error('Error fetching assigned courses:', err);
      setAssignedCourses([]);
      setViewError('Failed to fetch assigned courses');
    }
  };

  // Handle faculty selection for viewing assigned courses
  const handleViewFacultyChange = (e) => {
    const facultyId = e.target.value;
    setViewFacultyId(facultyId);
    if (facultyId) {
      fetchAssignedCourses(facultyId);
    } else {
      setAssignedCourses([]);
    }
  };

  // Function to handle course deletion
  const handleDeleteCourse = async (facultyCourseId) => {
    try {
      await axios.delete(
        `http://localhost:9987/api/v1/facultyCourses/remove/${facultyCourseId}`,
        {
          headers: {
            Authorization: `Bearer ${authTokens.token}`,
          },
        }
      );
      setViewMessage('Course assignment deleted successfully');
      setViewError('');
      // Refresh the list of assigned courses
      fetchAssignedCourses(viewFacultyId);
    } catch (err) {
      console.error('Error deleting course assignment:', err);
      setViewError('Failed to delete course assignment');
      setViewMessage('');
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>View and Remove Assigned Courses</Card.Title>
        {viewMessage && <Alert variant="success">{viewMessage}</Alert>}
        {viewError && <Alert variant="danger">{viewError}</Alert>}
        {/* Select Faculty */}
        <Form.Group controlId="formViewFaculty" className="mb-3">
          <Form.Label>Select Faculty to View Courses</Form.Label>
          <Form.Control
            as="select"
            value={viewFacultyId}
            onChange={handleViewFacultyChange}
          >
            <option value="">--Select Faculty--</option>
            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.user.firstName} {faculty.user.lastName} (ID: {faculty.id})
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        {/* Assigned Courses Table */}
        {assignedCourses.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>FacultyCourse ID</th>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignedCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.facultyCourseId}</td>
                  <td>{course.course.name}</td>
                  <td>{course.course.courseCode}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : viewFacultyId ? (
          <Alert variant="info">No courses assigned to this faculty.</Alert>
        ) : null}
      </Card.Body>
    </Card>
  );
}

export default ViewAssignedCourses;
