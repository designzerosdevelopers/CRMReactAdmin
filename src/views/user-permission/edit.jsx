import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';  // Ensure bootstrap is installed
import Card from '../../components/Card/MainCard';

const UpdatePermissions = () => {
  const [searchParams] = useSearchParams();
  const user = searchParams.get('user');
  const email = searchParams.get('email');
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState({
    'job-create': false,
    'job-view': false,
    'job-edit': false,
    'job-delete': false
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setPermissions({ ...permissions, [name]: checked });
  };

  const handleUpdate = () => {
    console.log('Updated Permissions:', permissions);
    alert('Permissions updated successfully!');
    navigate('/user-select');
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="User and Permissions" isOption>
            <table className="table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PERMISSIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>{user || 'Test User'}</strong></td>
                  <td>{email || 'testuser@example.com'}</td>
                  <td>
                    {Object.keys(permissions).map((key) => (
                      <div key={key}>
                        <input
                          type="checkbox"
                          name={key}
                          checked={permissions[key]}
                          onChange={handleChange}
                        /> {key.replace('-', ' ')}
                      </div>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>

      <button onClick={handleUpdate} className="btn btn-primary mt-3">
        Update Permissions
      </button>
          </Card>

        </Col>

      </Row>
    </React.Fragment>
  );
};

export default UpdatePermissions;
