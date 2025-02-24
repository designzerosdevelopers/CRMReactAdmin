import React, { useState } from 'react';
import PageTitle from '../components/PageTitle'; // Adjust import path as needed

const CategoryCreate = () => {
  const [catName, setCatName] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      // Adjust the endpoint URL to match your backend route
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Include CSRF token here if needed
        },
        body: JSON.stringify({ cat_name: catName })
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors(data.errors || ['An error occurred']);
      } else {
        // Optionally, handle success (e.g., redirect or clear form)
        setCatName('');
        console.log('Category created successfully');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors(['An unexpected error occurred']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <PageTitle menu="Category" page="Create" />
      <div className="row">
        <div className="col-8">
          <div className="card mb-4">
            {/* Error Alert */}
            {errors.length > 0 && (
              <div className="alert alert-danger">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Create Form</h5>
              <small className="text-muted float-end">Fill the name field</small>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label htmlFor="basic-default-name" className="col-sm-2 col-form-label">
                    Category Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="cat_name"
                      id="basic-default-name"
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
