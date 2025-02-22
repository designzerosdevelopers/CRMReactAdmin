import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const SelectRole = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const navigate = useNavigate();
  const handleSelectRole = () => {
    if (selectedRole) {
      navigate(`/role-permission/edit?role=${selectedRole}`);
    } else {
      alert('Please select a Role.');
    }
  };
  return (
    <div className="container mt-4">
      <h3>Permission Form</h3>
      <Card>
        <Card.Header>Select Role</Card.Header>
        <Card.Body>
          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Select Role:</Form.Label>
                <Form.Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                  <option value="">-- Select Role --</option>
                  <option value="role1">Role 1</option>
                  <option value="role2">Role 2</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button className="mt-3" onClick={handleSelectRole}>
            check Permission
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SelectRole;
