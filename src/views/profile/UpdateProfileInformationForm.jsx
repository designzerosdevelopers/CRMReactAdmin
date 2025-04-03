import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import femaleAvatar from '../../assets/images/user/avatar-1.jpg';
import maleAvatar from '../../assets/images/user/avatar-2.jpg';

const ProfileDetails = () => {
  // Retrieve user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem('UserData') || '{}');
  const defaultAvatar = storedUser?.gender === 'Female' ? femaleAvatar : maleAvatar;

  // State Management
  const [user, setUser] = useState(storedUser);
  const [userData, setUserData] = useState({ ...storedUser });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(storedUser?.image ? `${import.meta.env.VITE_API_URL}/uploads/${storedUser.image}` : defaultAvatar);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Update preview when user image changes
  useEffect(() => {
    if (user?.image) {
      setPreview(`${import.meta.env.VITE_APP_URL}/uploads/${user.image}`);
    }
  }, [user]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle Image Upload
  const handleUploadSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!selectedFile) {
        alert('Please select a file first.');
        return;
      }

      setLoading(true);
      setErrors([]);
      setSuccess('');

      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, { withCredentials: true });

        const token = localStorage.getItem('auth_token');
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/profile/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });

        setSuccess(response.data.success || 'Profile updated successfully');

        if (response.data) {
          const newImageUrl = `${import.meta.env.VITE_API_URL}/uploads/${response.data.image}`;
          setPreview(newImageUrl);

          // Update user data
          const updatedUser = response.data.user;
          setUser(updatedUser);
          setUserData(updatedUser);
          localStorage.setItem('UserData', JSON.stringify(updatedUser));

          window.dispatchEvent(new Event('storage'));
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setErrors(error.response?.data?.errors || ['An error occurred while uploading']);
      } finally {
        setLoading(false);
      }
    },
    [selectedFile]
  );

  // Handle Profile Update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setErrors([]);

    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    // Append method override
    formData.append('_method', 'PUT');

    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      setSuccess('Profile updated successfully!');
      console.log('updates', response.data);
      //   setUser(response.data);
      //   setUserData(response.data);
      //   localStorage.setItem('UserData', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors(error.response?.data?.errors || ['An unexpected error occurred']);
    }
  };

  return (
    <section>
      <h5 className="card-header">Profile Details</h5>
      <div className="card-body">
        {/* Image Upload Form */}
        <form onSubmit={handleUploadSubmit} encType="multipart/form-data">
          <div className="d-flex align-items-start align-items-sm-center gap-4">
            <img src={preview} alt="user-avatar" className="d-block rounded" height="100" width="100" id="uploadedAvatar" />
            <div className="button-wrapper">
              <label htmlFor="upload" className="btn btn-primary me-2 mb-4">
                <span className="d-none d-sm-block">Select new photo</span>
                <input
                  type="file"
                  name="image"
                  id="upload"
                  className="account-file-input"
                  hidden
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                />
              </label>
              <button type="submit" className="btn btn-outline-secondary mb-4" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
              </button>
              <p className="text-muted mb-0">Allowed JPG or PNG. Max size of 1000KB</p>
            </div>
          </div>
        </form>

        {/* Display Errors or Success Messages */}
        {errors.length > 0 && (
          <div className="alert alert-danger mt-2">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        {success && <div className="alert alert-success mt-2">{success}</div>}

        <hr className="my-0" />
        <div className="card-body">
          {/* Profile Update Form */}
          <form onSubmit={handleUpdateSubmit} className="mt-4">
            <div className="row">
              {/* Name Field */}
              <div className="mb-3 col-md-6">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  value={userData.name || ''}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-3 col-md-6">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  value={userData.email || ''}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  required
                />
              </div>

              {/* Gender Selection */}
              <div className="mb-3 col-md-6">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  className="form-control"
                  value={userData.gender || ''}
                  onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                >
                  <option value="" disabled>
                    -- Select Gender --
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-3 col-md-6">
                <label htmlFor="birth_date">Birth Date</label>
                <input id="birth_date" name="birth_date" type="date" className="form-control" defaultValue={user.birth_date || ''} />
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-2">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfileDetails;
