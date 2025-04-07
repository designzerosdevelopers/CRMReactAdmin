import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../../components/Card/MainCard';

const EmployeeIndexPage = ({ creator, successMessage }) => {
  const [emps, setEmps] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const { 'org-id': orgId } = useParams(); // Get org-id from URL params

  useEffect(() => {
    setLoading(true); // Set loading while fetching

    const endpoint = orgId
      ? `${import.meta.env.VITE_API_URL}/org-employees/${orgId}` // If org-id exists
      : `${import.meta.env.VITE_API_URL}/employee`; // If org-id is not passed

    axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
      .then((response) => {
        const fetchedEmployees = Array.isArray(response.data.data)
          ? response.data.data
          : Array.isArray(response.data)
          ? response.data
          : [];
        setEmps(fetchedEmployees);
        setError('');
      })
      .catch((err) => {
        const msg = err.response?.data?.message || 'Error fetching employees';
        setError(msg);
        toast.error(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orgId]); // Depend on orgId


  const handleDelete = async (emp) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
      credentials: 'include'
    });

    try {
      const endpoint = `/employee/${emp.user_id}`;
      const url = `${import.meta.env.VITE_API_URL}${endpoint}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      setEmps(emps.filter((e) => e.user_id !== emp.user_id));
      toast.success('Employee deleted successfully');
    } catch (err) {
      console.error('Error deleting employee:', err);
      toast.error('Failed to delete employee');
      setError('An unexpected error occurred');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="d-flex justify-content-end align-items-center mb-4">
          {creator ? (
            <Link to={`/org-employee-create/${creator}`}>
              <button type="button" className="btn rounded-pill btn-primary">
                Create
              </button>
            </Link>
          ) : (
            <Link to="/employee/create">
              <button type="button" className="btn rounded-pill btn-primary">
                Create
              </button>
            </Link>
          )}
        </div>

        {successMessage && toast.success(successMessage)}
        {error && <div className="alert alert-danger">{error}</div>}

        <Row>
          <Col>
            <Card title="Employee List" isOption>
              <div className="table-responsive text-nowrap">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>User id</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0">
                    {emps.length > 0 ? (
                      emps.map((emp) => {
                        const user = emp.user;
                        return (
                          <tr key={emp.user_id}>
                            <td>
                              <i className="fab fa-angular fa-lg text-danger me-3"></i> {user ? user.name : 'N/A'}
                            </td>
                            <td>{user ? user.email : 'N/A'}</td>
                            <td>
                              <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                <span className="badge bg-label-primary me-1 text-dark">{emp.user_id}</span>
                              </ul>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                  <i className="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div className="dropdown-menu">
                                  <Link className="dropdown-item" to={`/employee/show/${emp.user_id}`} state={{ emp }}>
                                    <i className="fas fa-file me-2"></i> View
                                  </Link>

                                  {creator ? (
                                    <>
                                      <Link
                                        className="dropdown-item"
                                        to={`/employee/edit/${emp.user_id}`}
                                        state={{ user: emp.user, employee: emp, orgId: creator }}
                                      >
                                        <i className="fas fa-edit me-2"></i> Edit
                                      </Link>

                                      <button type="button" className="dropdown-item" onClick={() => handleDelete(emp)}>
                                        <i className="fas fa-trash me-2"></i> Delete
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <Link className="dropdown-item" to={`/employee/edit/${emp.user_id}`}>
                                        <i className="fas fa-edit me-2"></i> Edit
                                      </Link>
                                      <button type="button" className="dropdown-item" onClick={() => handleDelete(emp)}>
                                        <i className="fas fa-trash me-2"></i> Delete
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No employees found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default EmployeeIndexPage;
