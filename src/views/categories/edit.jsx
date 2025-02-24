import React, { useState } from 'react';
import PageTitle from '../components/PageTitle'; // Adjust this import as needed

const CategoryEdit = ({ cat, csrfToken }) => {
  const [catName, setCatName] = useState(cat.cat_name);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      // Adjust the API URL to match your backend route
      const response = await fetch(`/api/categories/${cat.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Include CSRF token if your backend requires it
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({ cat_name: catName }),
      });

      if (!response.ok) {
        const data = await response.json();
        // Assuming your backend returns errors as an object or array
        setErrors(data.errors || ['An error occurred']);
      } else {
        // Handle success, for example by redirecting or showing a success message
        console.log('Category updated successfully');
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
      <PageTitle menu="Category" page="Edit" />
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            {errors.length > 0 && (
              <div className="alert alert-danger">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <h5 className="card-header">Edit Category</h5>
            <hr className="my-0" />
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="cat_name"
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                    {loading ? 'Saving...' : 'Save changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEdit;
