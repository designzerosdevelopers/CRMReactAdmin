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

        let fetchedJobs = [];

        // 1) Check if the API returns an array at response.data.jobs
        if (Array.isArray(response.data.jobs)) {
          fetchedJobs = response.data.jobs;
        }
        // 2) Or if your API returns data in a "data" field
        else if (Array.isArray(response.data.data)) {
          fetchedJobs = response.data.data;
        }
        // 3) Or if the entire response is already an array
        else if (Array.isArray(response.data)) {
          fetchedJobs = response.data;
        } else {
          // Handle unexpected structure
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
          <h5 className="d-inline-block me-3">Jobs / Index</h5>
          <button className="btn btn-primary float-end">Create</button>
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
                    <th>Organization</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.job_title}</td>
                      <td>{job.budget}</td>
                      <td>{job.bid_close}</td>
                      <td>{job.organization_name || 'N/A'}</td>
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
