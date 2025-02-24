import React from 'react';
import PageTitle from '../components/PageTitle'; // Adjust the import path as needed

const EmployeeDetail = ({ emp }) => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <PageTitle menu="Employee" page="View" />
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Detail Form</h5>
              <small className="text-muted float-end">View all the fields</small>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label" htmlFor="email">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={emp.email}
                    id="email"
                    readOnly
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label" htmlFor="name">
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={emp.name}
                    id="name"
                    readOnly
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label" htmlFor="gender">
                  Gender
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={emp.gender}
                    id="gender"
                    readOnly
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
                    value={emp.address}
                    readOnly
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label" htmlFor="position">
                  Position
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="position"
                    className="form-control"
                    id="position"
                    value={emp.current_position}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
