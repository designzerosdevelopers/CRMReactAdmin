import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/MainCard';

const EmployeePage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Employee List" isOption>
            <button className="btn btn-primary mb-3">Create</button>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>User ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample data */}
                <tr>
                  <td>John Doe</td>
                  <td>johndoe@example.com</td>
                  <td>123</td>
                  <td>
                    <button className="btn btn-warning btn-sm">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EmployeePage;
