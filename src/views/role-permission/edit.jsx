import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'; // Ensure bootstrap is installed
import Card from '../../components/Card/MainCard';

const UpdatePermissions = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');

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
    navigate('/role-permission/select-role');
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Role and Permissions" isOption>
            <table className="table">
              <thead>
                <tr>
                  <th>ROLE</th>

                  <th>PERMISSIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{role || 'Test role'}</strong>
                  </td>

                  <td>
                    {Object.keys(permissions).map((key) => (
                      <div key={key}>
                        <input type="checkbox" name={key} checked={permissions[key]} onChange={handleChange} /> {key.replace('-', ' ')}
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
