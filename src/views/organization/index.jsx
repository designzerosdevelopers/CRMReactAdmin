import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../../components/Card/MainCard';

const OrganizationPage = () => {
  const [org, setOrg] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Delete organization endpoint
  const handleDelete = async (organization) => {
    if (!window.confirm('Are you sure you want to delete this organization?')) return;

    try {
      const endpoint = `/organization/${organization.user_id}`;
      const url = `${import.meta.env.VITE_API_URL}${endpoint}`;

      const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        toast.error(data.message || 'Failed to delete organization');
        return;
      }

      // Success
      setOrg((prevOrg) => prevOrg.filter((o) => o.id !== organization.id));
      toast.success(data.message || 'Organization deleted successfully');
    } catch (err) {
      console.error('Error deleting organization:', err);
      toast.error('An unexpected error occurred');
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/organization`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
      .then((response) => {
        const fetchedOrganizations = response.data.data || [];
        setOrg(fetchedOrganizations);
        setError('');
      })
      .catch((err) => {
        const msg = err.response?.data?.message || 'Error fetching organizations';
        setError(msg);
        toast.error(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="d-flex justify-content-end align-items-center mb-4">
        <Link to="/organization/create">
          <button type="button" className="btn rounded-pill btn-primary">
            Create
          </button>
        </Link>
      </div>

      <Row>
        <Col>
          <Card title="Organization List" isOption>
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
                {org.map((organization) => (
                  <tr key={organization.id}>
                    <td>{organization.organization_name}</td>
                    <td>{organization.employee_count}</td>
                    <td>{organization.job_count}</td>
                    <td>
                      <div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                          <i className="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to={`/organization/show/${organization.user_id}`}>
                              <i className="fas fa-eye me-2"></i> View
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to={`/org-employee/index/${organization.user_id}`}>
                              <i className="fas fa-users me-2"></i> Employee Index
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to={`/org-job/index/${organization.user_id}`}>
                              <i className="fas fa-briefcase me-2"></i> Job Index
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to={`/organization/edit/${organization.user_id}`}
                              state={{ org: organization, orgId: organization.id }}
                            >
                              <i className="fas fa-edit me-2"></i> Edit
                            </Link>
                          </li>
                          <li>
                            <button className="dropdown-item text-danger" onClick={() => handleDelete(organization)}>
                              <i className="fas fa-trash me-2"></i> Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OrganizationPage;
