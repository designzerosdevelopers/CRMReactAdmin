import React, { useState } from 'react';
import PageTitle from '../components/PageTitle'; // Adjust the import path as needed

const JobCreateForm = ({ errors = [], categories = [], degrees = [], orgId, onSubmit }) => {
  // Set up state for each form field
  const [jobTitle, setJobTitle] = useState("Learning Menagment System (LMS)");
  const [address, setAddress] = useState("TRC Enterprice,Avanue Road, 3rd Block, Lahore");
  const [categoryId, setCategoryId] = useState("");
  const [degreeId, setDegreeId] = useState("");
  const [zipcode, setZipcode] = useState("98766");
  const [isRemote, setIsRemote] = useState("");
  const [skill, setSkill] = useState("HTML, CSS, JS, Vue, Laravel, Php");
  const [experience, setExperience] = useState("5");
  const [budget, setBudget] = useState("8743");
  const [bidClose, setBidClose] = useState("2023-03-09");
  const [deadline, setDeadline] = useState("2023-03-09");
  const [description, setDescription] = useState("The Learning System Application is For a University.");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the form data object
    const formData = {
      job_title: jobTitle,
      address,
      category_id: categoryId,
      degree_id: degreeId,
      zipcode,
      is_remote: isRemote,
      skill,
      experience,
      budget,
      bid_close: bidClose,
      deadline,
      description,
      ...(orgId ? { creator: orgId } : {})
    };

    // Call the onSubmit prop callback if provided; otherwise, log the data.
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Form submitted:", formData);
      // You can use fetch or axios here to post formData to your API.
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <PageTitle menu="Job" page="Create" />
      
      {/* Display errors if any */}
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Create Form</h5>
              <small className="text-muted float-end">Fill all the fields</small>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="jobTitle">
                    Job Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      name="job_title"
                      id="jobTitle"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                </div>
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
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="category">
                    Job category
                  </label>
                  <div className="col-sm-4">
                    <select
                      name="category_id"
                      id="category"
                      className="form-select"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option value="" disabled>
                        -- Select an option --
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.cat_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="col-sm-2 col-form-label" htmlFor="degree">
                    Degree
                  </label>
                  <div className="col-sm-4">
                    <select
                      name="degree_id"
                      id="degree"
                      className="form-select"
                      value={degreeId}
                      onChange={(e) => setDegreeId(e.target.value)}
                    >
                      <option value="" disabled>
                        -- Select an option --
                      </option>
                      {degrees.map((degree) => (
                        <option key={degree.id} value={degree.id}>
                          {degree.degree_title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="zipcode">
                    Zip Code
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="number"
                      name="zipcode"
                      className="form-control"
                      id="zipcode"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-2">
                    <label className="col-form-label" htmlFor="isRemote">
                      Is Remote
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <select
                      name="is_remote"
                      className="form-select"
                      id="isRemote"
                      value={isRemote}
                      onChange={(e) => setIsRemote(e.target.value)}
                    >
                      <option value="" disabled>
                        -- Select an option --
                      </option>
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="skill">
                    Required Skill
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      name="skill"
                      id="skill"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="experience">
                    Experience Years
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="number"
                      className="form-control"
                      name="experience"
                      id="experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                  <label className="col-sm-2 col-form-label" htmlFor="budget">
                    Budget
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      name="budget"
                      id="budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="bidClose">
                    Bid Closing
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="date"
                      name="bid_close"
                      className="form-control"
                      id="bidClose"
                      value={bidClose}
                      onChange={(e) => setBidClose(e.target.value)}
                    />
                  </div>
                  <label className="col-sm-2 col-form-label" htmlFor="deadline">
                    Deadline
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="date"
                      name="deadline"
                      className="form-control"
                      id="deadline"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="description">
                    Description
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      id="description"
                      className="form-control"
                      name="description"
                      placeholder="Tell us about the project!"
                      aria-label="Tell us about the project!"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                {orgId && <input type="hidden" name="creator" value={orgId} />}
                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">
                      Send
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

export default JobCreateForm;
