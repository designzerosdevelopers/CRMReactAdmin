import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryCreate = ({ catId, csrfToken, initialErrors = [], initialSuccess = '' }) => {
  const [catName, setCatName] = useState('');
  const [loading, setLoading] = useState(false);

  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message, { position: 'top-right', autoClose: 3000 });
    } else if (type === 'error') {
      toast.error(message, { position: 'top-right', autoClose: 5000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fetch CSRF token
      await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include'
      });

      const url = `${import.meta.env.VITE_API_URL}/categories`;
      const token = localStorage.getItem('auth_token');

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ cat_name: catName })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          errorMessages.forEach((err) => showToast(err, 'error'));
        } else if (data.message) {
          showToast(data.message, 'error');
        } else {
          showToast('An error occurred', 'error');
        }
      } else {
        setCatName('');
        showToast('Category created successfully! 🎉', 'success');
      }
    } catch (error) {
      console.error('Submission error:', error);
      showToast('Failed to connect to the server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <ToastContainer />

      <div className="row">
        <div className="col-8">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Create Category</h5>
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
                      {loading ? 'Saving...' : 'Save'}
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
