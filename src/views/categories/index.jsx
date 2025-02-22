import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/MainCard';

const CategoriesPage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Categories List" isOption>
            <button className="btn btn-primary mb-3">Create Category</button>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample data */}
                <tr>
                  <td>Web development</td>
                  <td>laravel</td>
                  <td>
                    <button className="btn btn-warning btn-sm">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Fashion</td>
                  <td>Clothing and accessories</td>
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

export default CategoriesPage;
