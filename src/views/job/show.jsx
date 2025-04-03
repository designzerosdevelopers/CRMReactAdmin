import axios from "axios";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobView = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/job/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((response) => {
        console.log("Job details:", response.data);
        setJob(response.data?.data || response.data); // Adjust based on API response
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setError(err.response?.data?.message || "Error fetching job data");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!job) return <div>No job data available for ID: {id}</div>;

  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol lg="10">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBCardBody className="p-4">
                <MDBTypography tag="h4" className="mb-3">
                  {job.job.job_title || "Untitled Job"}
                </MDBTypography>
                <hr />

                <MDBRow>
                  <MDBCol md="6">
                    <MDBTypography tag="h6">Address</MDBTypography>
                    <MDBCardText className="text-muted">{job.job.address || "N/A"}</MDBCardText>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBTypography tag="h6">Zip Code</MDBTypography>
                    <MDBCardText className="text-muted">{job.job.zipcode || "N/A"}</MDBCardText>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="pt-3">
                  <MDBCol md="6">
                    <MDBTypography tag="h6">Job Type</MDBTypography>
                    <MDBCardText className="text-muted">{job.job.is_remote || "On-Site"}</MDBCardText>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBTypography tag="h6">Budget</MDBTypography>
                    <MDBCardText className="text-muted">${job.job.budget || "N/A"}</MDBCardText>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="pt-3">
                  <MDBCol md="6">
                    <MDBTypography tag="h6">Required Skill</MDBTypography>
                    <MDBCardText className="text-muted">{job.job.skill || "Not specified"}</MDBCardText>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBTypography tag="h6">Experience</MDBTypography>
                    <MDBCardText className="text-muted">{job.job.experience || "Not specified"} years</MDBCardText>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="pt-3">
                  <MDBCol md="6">
                    <MDBTypography tag="h6">Education</MDBTypography>
                    <MDBCardText className="text-muted">{job.job.education || "Not specified"}</MDBCardText>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBTypography tag="h6">Deadline</MDBTypography>
                    <MDBCardText className="text-muted">
                      {job.job.deadline ? new Date(job.job.deadline).toLocaleDateString() : "N/A"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="pt-3">
                  <MDBCol md="12">
                    <MDBTypography tag="h6">Description</MDBTypography>
                    <MDBCardText className="text-muted">{job.job.description || "No description available"}</MDBCardText>
                  </MDBCol>
                </MDBRow>

                <hr />

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default JobView;
