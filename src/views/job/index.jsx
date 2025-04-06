import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/MainCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useParams } from 'react-router-dom';

const JobIndexPage = () => {
  const { orgid } = useParams();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);



  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      const endpoint = `/job/${id}`;
      const url = `${import.meta.env.VITE_API_URL}${endpoint}`;

      const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include', // include cookies for authentication
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to delete job');
      } else {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      }
    } catch (err) {
      console.error('Error deleting job:', err);
      setError('An unexpected error occurred');
    }
  };

  useEffect(() => {
    // Fetch CSRF cookie
    const getCsrfCookie = async () => {
      await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include'
      });
    };
    getCsrfCookie();
  }, []);
  const [canManageCandidates, setCanManageCandidates] = useState(false); // ✅ Added state

  useEffect(() => {
    // Retrieve user role from local storage
    const userRole = localStorage.getItem('role');
    const hasPermission = userRole === 'super-admin' || userRole === 'organization';
    const isadmin = userRole === 'super-admin';

    setCanManageCandidates(hasPermission); // ✅ Store in state

    // Determine API endpoint based on role
    const jobApiUrl = isadmin ? `${import.meta.env.VITE_API_URL}/org-jobs/${orgid}` : `${import.meta.env.VITE_API_URL}/job`;

    axios
      .get(jobApiUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
      .then((response) => {
        let fetchedJobs = [];

        if (Array.isArray(response.data?.response)) {
          fetchedJobs = response.data.response;
        } else if (Array.isArray(response.data?.jobs)) {
          fetchedJobs = response.data.jobs;
        } else if (Array.isArray(response.data?.data)) {
          fetchedJobs = response.data.data;
        } else if (Array.isArray(response.data)) {
          fetchedJobs = response.data;
        }

        console.log('jobs', fetchedJobs);
        setJobs(fetchedJobs);
        setError('');
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Error fetching jobs');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Row className="mb-3">
        <Col>
          <Link to="/job/create">
            <button className="btn btn-primary float-end">Create</button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card title="Jobs List" isOption>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Budget</th>
                    <th>Bid Close</th>
                    <th>Candidates</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.job_title}</td>
                      <td>{job.budget}</td>
                      <td>{job.bid_close}</td>
                      <td>{job.application_form_count}</td>
                      <td>
                        <div className="dropdown">
                          <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i className="bx bx-dots-vertical-rounded"></i>
                          </button>

                          <div className="dropdown-menu">
                            {/* Show Candidates option only for super-admin & organization */}
                            {canManageCandidates && (
                              <Link className="dropdown-item" to={`/candidates/${job.id}`}>
                                <i className="fas fa-user me-2"></i> Candidates
                              </Link>
                            )}

                            {/* General actions for all users */}
                            <Link className="dropdown-item" to={`/job/view/${job.id}`}>
                              <i className="fas fa-file me-2"></i> View
                            </Link>

                            {/* Edit & Delete only for super-admin & organization */}
                            {/* {canManageCandidates && (
                              <> */}
                            <Link className="dropdown-item" to={`/job/edit/${job.id}`}>
                              <i className="fas fa-edit me-2"></i> Edit
                            </Link>
                            <button type="button" className="dropdown-item" onClick={() => handleDelete(job.id)}>
                              <i className="fas fa-trash me-2"></i> Delete
                            </button>
                            {/* </>
                            )} */}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default JobIndexPage;
