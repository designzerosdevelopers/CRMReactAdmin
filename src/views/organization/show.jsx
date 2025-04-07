import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const OrganizationView = () => {
  const { id } = useParams();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/organization/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
      .then((res) => setOrg(res.data.data))
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to load organization'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!org) return <div className="text-center mt-5 text-danger">Organization not found</div>;

  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <ToastContainer />
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol lg="10" className="mb-4">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: '.5rem',
                    borderBottomLeftRadius: '.5rem',
                    background: '#4e73df'
                  }}
                >
                  <MDBCardImage
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(org.organization_name)}&background=4e73df&color=fff`}
                    alt="Organization Logo"
                    className="my-5"
                    style={{ width: '100px' }}
                    fluid
                  />
                  <MDBCardText tag="h3">{org.organization_name}</MDBCardText>
                  <MDBCardText tag="h5">{org.website || 'N/A'}</MDBCardText>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Organization Details</MDBTypography>
                    <hr className="mt-0 mb-4" />

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{org.email || 'N/A'}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Address</MDBTypography>
                        <MDBCardText className="text-muted">{org.address || 'N/A'}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Description</MDBTypography>
                    <MDBCardText className="text-muted">{org.description || 'N/A'}</MDBCardText>

                    <hr />
                    <div className="d-flex justify-content-start">
                      <Link to={`/organization/edit/${org.user_id}`} className="btn btn-sm btn-primary me-2">
                        <MDBIcon fas icon="edit" className="me-1" /> Edit
                      </Link>
                      <Link to="/organization" className="btn btn-sm btn-secondary">
                        Back to List
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default OrganizationView;
