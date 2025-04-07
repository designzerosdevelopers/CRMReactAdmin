import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    gender: '',
    phone_number: '',
    address: '',
    birth_date: '',
    zipcode: '',
    latest_degree: '',
    latest_university: '',
    current_organization: '',
    current_department: '',
    current_position: '',
    password: '',
    password_confirmation: ''
  });

  const [loading, setLoading] = useState(true);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Show toast notification
  const showToast = (message, type) => {
    toast[type](message, { position: 'top-right', autoClose: 3000 });
  };

  // Fetch Employee Data
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/employee/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
      })
      .then((response) => {
        const emp = response.data.data;
        const usr = emp.user;

        setEmployeeData({
          name: usr.name || '',
          email: usr.email || '',
          gender: emp.gender || '',
          phone_number: emp.phone_number || '',
          address: emp.address || '',
          birth_date: emp.birth_date || '',
          zipcode: emp.zipcode || '',
          latest_degree: emp.latest_degree || '',
          latest_university: emp.latest_university || '',
          current_organization: emp.current_organization || '',
          current_department: emp.current_department || '',
          current_position: emp.current_position || '',
          password: '',
          password_confirmation: ''
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
        setLoading(false);
      });
  }, [id]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...employeeData, [name]: value };
    setEmployeeData(updatedData);

    // Check password mismatch in real-time
    if (name === 'password' || name === 'password_confirmation') {
      setPasswordMismatch(updatedData.password !== updatedData.password_confirmation);
    }
  };

  // Handle File Change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordMismatch) {
      showToast('❌ Passwords do not match!', 'error');
      return;
    }

    const formData = new FormData();
    Object.entries(employeeData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    if (selectedFile) {
      formData.append('avatar', selectedFile);
    }

    formData.append('_method', 'PUT');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/employee/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      showToast(response.data.message || '✅ Employee updated successfully!', 'success');

      setTimeout(() => navigate('/employee/index'), 2000);
    } catch (error) {
      console.error('Error updating employee:', error.response?.data);
      showToast(error.response?.data?.message || '❌ An unexpected error occurred.', 'error');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Edit Employee</h2>
      <ToastContainer />

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" name="name" value={employeeData.name} onChange={handleChange} className="form-control" />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" name="email" value={employeeData.email} onChange={handleChange} className="form-control" />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label>Gender:</label>
          <select name="gender" value={employeeData.gender} onChange={handleChange} className="form-control">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Other Fields */}
        {[
          'phone_number',
          'address',
          'birth_date',
          'zipcode',
          'latest_degree',
          'latest_university',
          'current_organization',
          'current_department',
          'current_position'
        ].map((field) => (
          <div className="mb-3" key={field}>
            <label>{field.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}:</label>
            <input
              type={field === 'birth_date' ? 'date' : 'text'}
              name={field}
              value={employeeData[field]}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        ))}

        {/* Password */}
        <div className="mb-3">
          <label>New Password:</label>
          <input type="password" name="password" onChange={handleChange} className="form-control" minLength="8" />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label>Confirm Password:</label>
          <input type="password" name="password_confirmation" onChange={handleChange} className="form-control" minLength="8" />
          {passwordMismatch && <small className="text-danger">❌ Passwords do not match</small>}
        </div>

        {/* Avatar Upload */}
        <div className="mb-3">
          <label>Profile Picture:</label>
          <input type="file" onChange={handleFileChange} className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
