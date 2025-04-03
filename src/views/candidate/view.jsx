import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const initialCandidate = location.state?.candidate;

  const [candidate, setCandidate] = useState(initialCandidate || null);
  const [loading, setLoading] = useState(initialCandidate ? false : true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!initialCandidate) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/view_candidates/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        })
        .then((response) => {
          setCandidate(response.data.data || response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.response?.data?.message || 'Error fetching candidate data');
          setLoading(false);
        });
    }
  }, [id, initialCandidate]);

  const handleCandidateAction = (status) => {
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/select_candidate/${id}`,
        { status, job_id: candidate.job_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        toast.success(`✅ Candidate has been ${status}`, { position: 'top-right', autoClose: 3000 });
        setTimeout(() => navigate(`/candidates/${candidate.job_id}`), 2000); // Fixed template literal
      })
      .catch((err) => {
        console.error(`Error updating candidate status:`, err);
        toast.error('❌ Error updating candidate status', { position: 'top-right', autoClose: 3000 });
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!candidate) return <div>No candidate data available for ID: {id}</div>;

  return (
    <div className="row">
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h5 className="mb-0">Candidate Detail</h5>
            <small className="text-muted float-end">View all the fields</small>
          </div>
          <div className="card-body">
            {[
              'name',
              'email',
              'phone_number',
              'gender',
              'birth_date',
              'address',
              'zipcode',
              'skill',
              'degree',
              'latest_university',
              'current_organization',
              'current_department',
              'current_position',
              'description'
            ].map((field) => (
              <div className="row mb-3" key={field}>
                <label className="col-sm-2 col-form-label text-capitalize">{field.replace('_', ' ')}</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" value={candidate[field] || 'N/A'} readOnly />
                </div>
              </div>
            ))}
            <div className="row justify-content-end">
              <div className="col-sm-10">
                <button type="button" className="btn btn-primary me-2" onClick={() => handleCandidateAction('Selected')}>
                  Select
                </button>
                <button type="button" className="btn btn-danger" onClick={() => handleCandidateAction('Rejected')}>
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default CandidateDetail;
