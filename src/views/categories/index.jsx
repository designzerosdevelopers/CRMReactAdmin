import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle'; // Adjust the path as needed

const CategoryIndex = ({ cats: initialCats, successMessage }) => {
  const [cats, setCats] = useState(initialCats || []);
  const [error, setError] = useState('');

  // Handle deletion of a category
  const handleDelete = async (catId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      // Adjust the endpoint URL to match your backend route
      const response = await fetch(`/api/categories/${catId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
          // Include CSRF token if required
        }
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to delete category');
      } else {
        // Remove the deleted category from state
        setCats(cats.filter((cat) => cat.id !== catId));
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      setError('An error occurred while deleting the category');
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <PageTitle menu="Category" page="index" />
        <Link to="/categories/create">
          <button type="button" className="btn rounded-pill btn-primary">
            Create
          </button>
        </Link>
      </div>

      <div className="card">
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <h5 className="card-header">Employees list</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {cats.length > 0 ? (
                cats.map((cat) => (
                  <tr key={cat.id}>
                    <td>
                      <strong>{cat.cat_name}</strong>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                          <i className="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to={`/categories/edit/${cat.id}`}>
                            <i className="fas fa-edit me-2"></i> Edit
                          </Link>
                          <button type="button" className="dropdown-item" onClick={() => handleDelete(cat.id)}>
                            <i className="fas fa-trash me-2"></i> Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryIndex;
