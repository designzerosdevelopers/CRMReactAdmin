import { useState } from 'react';

const DeleteAccountForm = ({ csrfToken, errors = {} }) => {
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your account deletion API call here
    console.log('Deleting account with password:', password);
  };

  return (
    <section>
      <h5 className="card-header">Delete Account</h5>
      <div className="card-body">
        <div className="mb-3 col-12">
          <div className="alert alert-warning">
            <h6 className="alert-heading fw-bold mb-1">
              Are you sure you want to delete your account?
            </h6>
            <p className="mb-0">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
        </div>
        <form method="post" onSubmit={handleSubmit} className="p-6">
          <input type="hidden" name="_csrf" value={csrfToken} />
          <input type="hidden" name="_method" value="delete" />

          <div className="mt-6">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="mt-2 text-danger">{errors.password}</div>
            )}
          </div>

          <div>
            <button type="submit" className="btn btn-danger ml-3 mt-2">
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DeleteAccountForm;
