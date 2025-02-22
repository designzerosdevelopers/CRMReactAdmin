import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/MainCard';

const OrganizationPage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Organization List" isOption>
            <button className="btn btn-primary mb-3">Create Organization</button>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Employees</th>
                  <th>Jobs</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample data */}
                <tr>
                  <td>ABC Corp</td>
                  <td>2</td>
                  <td>0</td>
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

export default OrganizationPage;
