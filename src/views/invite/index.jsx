import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../components/Card/MainCard';

const InvitePage = () => {
  const [email, setEmail] = useState('');

  const handleInvite = (e) => {
    e.preventDefault();
    alert(`Invitation sent to: ${email}`);
    setEmail('');
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Send an Invitation">
            <Form onSubmit={handleInvite}>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Send
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default InvitePage;
