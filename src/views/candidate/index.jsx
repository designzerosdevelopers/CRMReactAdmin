import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Card from '../../components/Card/MainCard';

const CandidateList = () => {
  const { id } = useParams();
  const [cand, setCand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/applier_candidates/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
      .then((response) => {
        console.log('API Response:', response);
        setCand(response.data?.data || []);
        setError('');
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Error fetching candidates');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async (candidateId) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/delete_candidate/${candidateId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
      });
      setCand((prevCand) => prevCand.filter((cand) => cand.id !== candidateId));
      console.log('Deleted candidate with ID:', candidateId);
    } catch (error) {
      console.error('Error deleting candidate:', error);
      setError('Failed to delete candidate');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Row>
        <Col>
          <Card title="Candidate List" isOption>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="table-responsive text-nowrap">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {cand.length > 0 ? (
                    cand.map((application) => (
                      <tr key={application.id}>
                        <td>
                          <strong>{application.name}</strong>
                        </td>
                        <td>{application.email}</td>
                        <td>{application.position || 'N/A'}</td>
                        <td>
                          <span
                            className={`badge ${
                              application.status === 'Selected'
                                ? 'badge bg-success'
                                : application.status === 'Rejected'
                                  ? 'badge bg-danger'
                                  : 'badge bg-info'
                            }`}
                          >
                            {application.status}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div className="dropdown-menu">
                              <Link className="dropdown-item" to={`/candidates/view//${application.id}`}>
                                <i className="fas fa-file me-2"></i> View
                              </Link>
                              <button type="button" className="dropdown-item" onClick={() => handleDelete(application.id)}>
                                <i className="fas fa-trash me-2"></i> Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No candidates found.
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
  );
};

export default CandidateList;
