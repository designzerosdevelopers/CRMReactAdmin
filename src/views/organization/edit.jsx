import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrganizationEditForm = () => {
  const { id } = useParams();
  const [orgData, setOrgData] = useState({
    email: '',
    organization_name: '',
    website: '',
    address: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/organization/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
      .then((response) => {
        const org = response.data.data;
        setOrgData({
          email: org.email || '',
          organization_name: org.organization_name || '',
          website: org.website || '',
          address: org.address || '',
          description: org.description || ''
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching organization data:', error);
        toast.error('Failed to load organization data.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setOrgData({ ...orgData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(orgData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    if (selectedFile) formData.append('logo', selectedFile);
    formData.append('_method', 'PUT');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/organization/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      setOrgData({ ...orgData, ...response.data.data });
      toast.success('Organization updated successfully!');
      setTimeout(() => navigate('/organization/index'), 2000);
    } catch (error) {
      console.error('Error updating organization:', error.response?.data);
      const errs = error.response?.data?.errors;

      if (errs) {
        Object.values(errs)
          .flat()
          .forEach((errMsg) => toast.error(errMsg));
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="mb-4">Edit Organization</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" name="email" value={orgData.email} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Organization Name:</label>
          <input type="text" name="organization_name" value={orgData.organization_name} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Website:</label>
          <input type="text" name="website" value={orgData.website} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Address:</label>
          <input type="text" name="address" value={orgData.address} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea name="description" value={orgData.description} onChange={handleChange} className="form-control"></textarea>
        </div>
        <div className="mb-3">
          <label>Organization Logo:</label>
          <input type="file" onChange={handleFileChange} className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Organization
        </button>
      </form>
    </div>
  );
};

export default OrganizationEditForm;
