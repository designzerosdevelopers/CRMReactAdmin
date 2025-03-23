import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const SelectUser = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleSelectUser = () => {
    if (selectedUser && email) {
      navigate(`/user-permission/edit?user=${selectedUser}&email=${email}`);
    } else {
      alert('Please select a user and enter an email.');
    }
  };
  return (
    <div className="container mt-4">
      <h3>Permission Form</h3>
      <Card>
        <Card.Header>Select User</Card.Header>
        <Card.Body>
          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Select User:</Form.Label>
                <Form.Select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                  <option value="">-- Select User --</option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Input User Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Find Email to Set Permission"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button className="mt-3" onClick={handleSelectUser}>
            Select User
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SelectUser;
