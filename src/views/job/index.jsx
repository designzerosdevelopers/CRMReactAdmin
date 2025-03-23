import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Card from '../../components/Card/MainCard';

const JobIndexPage = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/jobs`)
      .then((response) => {
        console.log('Response data:', response.data);
        // Determine if response.data is directly an array or nested within an object
        let fetchedJobs = [];
        if (Array.isArray(response.data)) {
          fetchedJobs = response.data;
        } else if (Array.isArray(response.data.data)) {
          fetchedJobs = response.data.data;
        } else {
          // Optionally handle or log unexpected structure
          console.warn('Unexpected response structure:', response.data);
        }
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
          <h5 className="d-inline-block me-3">Job / Index</h5>
          <button className="btn btn-primary float-end">Create</button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card title="jobs list" isOption>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Project Title</th>
                    <th>Budget</th>
                    <th>Bid Closing</th>
                    <th>Candidates</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.project_title}</td>
                      <td>{job.budget}</td>
                      <td>{job.bid_closing}</td>
                      <td>{job.candidates_count || 0}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-2">Edit</button>
                        <button className="btn btn-danger btn-sm">Delete</button>
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
