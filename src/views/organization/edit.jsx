import React, { useState } from 'react';
import PageTitle from '../components/PageTitle'; // Adjust the import path as needed

const OrganizationEditForm = ({ org, errors = [], onSubmit }) => {
  // Initialize state with organization properties
  const [email, setEmail] = useState(org.email || '');
  const [organizationName, setOrganizationName] = useState(org.organization_name || '');
  const [website, setWebsite] = useState(org.website || '');
  const [address, setAddress] = useState(org.address || '');
  const [description, setDescription] = useState(org.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      organization_name: organizationName,
      website,
      address,
      description,
      // Include the organization's unique id if needed (e.g., org.user_id)
      user_id: org.user_id,
    };

    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Form submitted:', formData);
      // Optionally, perform an API call here using fetch or axios.
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <PageTitle menu="Organization" page="Edit" />

      {errors.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Edit Form</h5>
              <small className="text-muted float-end">Edit all the fields</small>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="email">
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                {/* Organization Name */}
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="organizationName">
                    Organization Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      value={organizationName}
                      name="organization_name"
                      id="organizationName"
                      onChange={(e) => setOrganizationName(e.target.value)}
                    />
                  </div>
                </div>
                {/* Website */}
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="website">
                    Website
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      value={website}
                      name="website"
                      id="website"
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>
                {/* Address */}
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="address">
                    Address
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                {/* Description */}
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="description">
                    Description
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      id="description"
                      className="form-control"
                      name="description"
                      placeholder="Tell us about the organization!"
                      aria-label="Tell us about the organization!"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">
                      Update
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

export default OrganizationEditForm;
