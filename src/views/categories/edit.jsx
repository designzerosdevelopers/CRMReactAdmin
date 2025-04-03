import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryEdit = ({ cat, csrfToken }) => {
  const { id } = useParams();
  const [catName, setCatName] = useState(cat?.cat_name || '');
  const [loading, setLoading] = useState(false);

  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message, { position: 'top-right', autoClose: 3000 });
    } else if (type === 'error') {
      toast.error(message, { position: 'top-right', autoClose: 5000 });
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
      .then((response) => {
        setCatName(response.data.data.cat_name);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching category data:', error);
        showToast('Failed to fetch category data', 'error');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include'
      });

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
        method: 'PUT',
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
        } else {
          showToast(data.message || 'Failed to update category', 'error');
        }
      } else {
        showToast('Category updated successfully! 🎉', 'success');
      }
    } catch (error) {
      console.error('Submission error:', error);
      showToast('Network error. Please check your connection.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <ToastContainer />

      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <h5 className="card-header">Edit Category</h5>
            <hr className="my-0" />
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="categoryName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="categoryName"
                      name="cat_name"
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      autoFocus
                      required
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
