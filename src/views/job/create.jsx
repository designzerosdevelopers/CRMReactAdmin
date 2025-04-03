import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../contexts/UserContext';

const JobCreateForm = ({ csrfToken, orgId }) => {
  const { user, role, updateUser, updateRole } = useContext(UserContext);

  const [jobTitle, setJobTitle] = useState('Learning Menagment System (LMS)');
  const [address, setAddress] = useState('TRC Enterprice,Avanue Road, 3rd Block, Lahore');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [degreeId, setDegreeId] = useState('');
  const [degrees, setDegrees] = useState([]);
  const [zipcode, setZipcode] = useState('98766');
  const [isRemote, setIsRemote] = useState('');
  const [skill, setSkill] = useState('HTML, CSS, JS, Vue, Laravel, Php');
  const [experience, setExperience] = useState('5');
  const [budget, setBudget] = useState('8743');
  const [bidClose, setBidClose] = useState('2023-03-09');
  const [deadline, setDeadline] = useState('2023-03-09');
  const [description, setDescription] = useState('The Learning System Application is For a University.');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]); // Local error state
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Navigation hook
  const token = localStorage.getItem('auth_token');

  const showToast = (message, type) => {
    toast[type](message, { position: 'top-right', autoClose: 3000 });
  };

  // Fetch CSRF cookie on mount
  useEffect(() => {
    const getCsrfCookie = async () => {
      await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include'
      });
    };
    getCsrfCookie();
  }, []);

  // Fetch categories and degrees
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/data`, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setCategories(response.data.categories || []);
        setDegrees(response.data.degrees || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [csrfToken]); // Added csrfToken dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setErrors([]);
    // setSuccess('');

    console.log('User:', user);

    // Prepare form data
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
      user,
      user_role: role,
      ...(orgId && { creator: orgId }) // Conditional object property
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessages = data.errors ? Object.values(data.errors).flat() : ['An error occurred'];
        errorMessages.forEach((err) => showToast(err, 'error'));
      } else {
        showToast(data.message || 'Job created successfully!', 'success');

        // Reset form fields using a single state update (if using an object for form state)
        // resetFormFields();

        // Redirect after 2 seconds
        setTimeout(() => navigate('/job/index'), 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast('An unexpected error occurred.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to reset form fields
  const resetFormFields = () => {
    setJobTitle('');
    setAddress('');
    setCategoryId('');
    setDegreeId('');
    setZipcode('');
    setIsRemote(false); // Ensure proper default value
    setSkill('');
    setExperience('');
    setBudget('');
    setBidClose('');
    setDeadline('');
    setDescription('');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <ToastContainer />
      {/* Rest of your form JSX remains the same */}
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Create Form</h5>
              <small className="text-muted float-end">Fill all the fields</small>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Job Title */}
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
                {/* Category and Degree */}
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
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.cat_name}
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
                {/* Zip Code & Is Remote */}
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
                {/* Skill */}
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
                {/* Experience and Budget */}
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
                {/* Bid Close and Deadline */}
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
                      Save
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
