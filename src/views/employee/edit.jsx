import React, { useState } from 'react';
import PageTitle from '../components/PageTitle'; // Adjust the import path as needed

const EmployeeEdit = ({ user, employee, orgId, csrfToken }) => {
  // Initialize state using values from the passed objects
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [gender, setGender] = useState(employee.gender || '');
  const [phoneNumber, setPhoneNumber] = useState(employee.phone_number || '');
  const [address, setAddress] = useState(employee.address || '');
  const [birthDate, setBirthDate] = useState(employee.birth_date || '');
  const [zipcode, setZipcode] = useState(employee.zipcode || '');
  const [latestDegree, setLatestDegree] = useState(employee.latest_degree || '');
  const [latestUniversity, setLatestUniversity] = useState(employee.latest_university || '');
  const [currentOrganization, setCurrentOrganization] = useState(employee.current_organization || '');
  const [currentDepartment, setCurrentDepartment] = useState(employee.current_department || '');
  const [currentPosition, setCurrentPosition] = useState(employee.current_position || '');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
  // For image upload
  const defaultAvatar = "../assets/img/avatars/1.png";
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // For messages
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleResetImage = () => {
    setSelectedFile(null);
    setAvatar(defaultAvatar);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccess('');

    // Determine the endpoint based on orgId
    const endpoint = orgId
      ? `/api/org-employee-update/${user.id}`
      : `/api/employee-update/${user.id}`;

    // Use FormData for sending form data along with potential file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('phone_number', phoneNumber);
    formData.append('address', address);
    formData.append('birth_date', birthDate);
    formData.append('zipcode', zipcode);
    formData.append('latest_degree', latestDegree);
    formData.append('latest_university', latestUniversity);
    formData.append('current_organization', currentOrganization);
    formData.append('current_department', currentDepartment);
    formData.append('current_position', currentPosition);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);
    if (orgId) {
      formData.append('creator', orgId);
    }
    if (selectedFile) {
      formData.append('avatar', selectedFile);
    }
    if (csrfToken) {
      formData.append('_csrf', csrfToken);
    }

    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors(data.errors || ['An error occurred']);
      } else {
        const data = await response.json();
        setSuccess(data.message || 'Profile updated successfully');
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
      <PageTitle menu="Employee" page="Edit" />
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      {success && (
        <div className="alert alert-success">{success}</div>
      )}
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <h5 className="card-header">Profile Details</h5>
            {/* Image Upload Section */}
            <div className="card-body">
              <div className="d-flex align-items-start align-items-sm-center gap-4">
                <img
                  src={avatar}
                  alt="user-avatar"
                  className="d-block rounded"
                  height="100"
                  width="100"
                  id="uploadedAvatar"
                />
                <div className="button-wrapper">
                  <label
                    htmlFor="upload"
                    className="btn btn-primary me-2 mb-4"
                    tabIndex="0"
                  >
                    <span className="d-none d-sm-block">Upload new photo</span>
                    <i className="bx bx-upload d-block d-sm-none"></i>
                    <input
                      type="file"
                      id="upload"
                      className="account-file-input"
                      hidden
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-secondary account-image-reset mb-4"
                    onClick={handleResetImage}
                  >
                    <i className="bx bx-reset d-block d-sm-none"></i>
                    <span className="d-none d-sm-block">Reset</span>
                  </button>
                  <p className="text-muted mb-0">
                    Allowed JPG, GIF or PNG. Max size of 800K
                  </p>
                </div>
              </div>
            </div>
            <hr className="my-0" />
            {/* Form Section */}
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
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="gender"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <div className="input-group input-group-merge">
                      <span className="input-group-text"></span>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phone_number"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="birthDate" className="form-label">
                      Birth Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="birthDate"
                      name="birth_date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="zipCode" className="form-label">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zipCode"
                      name="zipcode"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                      maxLength="6"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="latestDegree" className="form-label">
                      Latest Degree
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="latestDegree"
                      name="latest_degree"
                      value={latestDegree}
                      onChange={(e) => setLatestDegree(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="latestUniversity" className="form-label">
                      Latest University
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="latestUniversity"
                      name="latest_university"
                      value={latestUniversity}
                      onChange={(e) => setLatestUniversity(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="currentOrganization" className="form-label">
                      Current Organization
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="currentOrganization"
                      name="current_organization"
                      value={currentOrganization}
                      onChange={(e) => setCurrentOrganization(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="currentDepartment" className="form-label">
                      Current Department
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="currentDepartment"
                      name="current_department"
                      value={currentDepartment}
                      onChange={(e) => setCurrentDepartment(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="currentPosition" className="form-label">
                      Current Position
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="currentPosition"
                      name="current_position"
                      value={currentPosition}
                      onChange={(e) => setCurrentPosition(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="pass" className="form-label">
                      Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="pass"
                      name="password"
                      placeholder="Change Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="cpass" className="form-label">
                      Password Confirmation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cpass"
                      name="password_confirmation"
                      placeholder="Confirm Your Password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </div>
                </div>
                {orgId && <input type="hidden" name="creator" value={orgId} />}
                <div className="mt-2">
                  <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                    {loading ? 'Saving...' : 'Save changes'}
                  </button>
                </div>
              </form>
            </div>
            {/* /Account */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;
