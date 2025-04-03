import { useState } from 'react';

const UpdatePasswordForm = ({ csrfToken, errors = {}, status }) => {
  const [formData, setFormData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your password update API call here
    console.log('Updating password with:', formData);
  };

  return (
    <section>
      <h5 className="card-header">Update Password</h5>
      <div className="card-body">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="mt-6 space-y-6"
        >
          <input type="hidden" name="_csrf" value={csrfToken} />
          <input type="hidden" name="_method" value="put" />

          <div>
            <label htmlFor="current_password">Current Password</label>
            <input
              id="current_password"
              name="current_password"
              type="password"
              className="form-control"
              autoComplete="current-password"
              onChange={handleChange}
              value={formData.current_password}
            />
            {errors.current_password && (
              <div className="mt-2 text-danger">{errors.current_password}</div>
            )}
          </div>

          <div className="mt-2">
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              autoComplete="new-password"
              onChange={handleChange}
              value={formData.password}
            />
            {errors.password && (
              <div className="mt-2 text-danger">{errors.password}</div>
            )}
          </div>

          <div className="mt-2">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              className="form-control"
              autoComplete="new-password"
              onChange={handleChange}
              value={formData.password_confirmation}
            />
            {errors.password_confirmation && (
              <div className="mt-2 text-danger">
                {errors.password_confirmation}
              </div>
            )}
          </div>

          <div className="mt-2">
            <button type="submit" className="btn btn-primary">
              Save
            </button>

            {status === 'password-updated' && (
              <p
                className="alert alert-success"
                // Optionally, add transitions with a library or CSS animations
              >
                Saved.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdatePasswordForm;
