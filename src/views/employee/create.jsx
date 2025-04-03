import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeCreate = ({ orgId, csrfToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showToast = (message, type) => {
    toast[type](message, { position: "top-right", autoClose: 3000 });
  };

  const validateForm = () => {
    let errors = [];

    if (!name.trim()) errors.push("Name is required.");
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.push("Invalid email format.");
    if (password.length < 8) errors.push("Password must be at least 8 characters long.");
    if (password !== passwordConfirmation) errors.push("Passwords do not match.");

    if (errors.length > 0) {
      errors.forEach((err) => showToast(err, "error"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, { credentials: "include" });

    const endpoint = orgId ? "/org-employee-store" : "/employee";
    const url = `${import.meta.env.VITE_API_URL}${endpoint}`;
    const token = localStorage.getItem("auth_token");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          ...(orgId ? { creator: orgId } : {}),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessages = data.errors ? Object.values(data.errors).flat() : ["An error occurred"];
        errorMessages.forEach((err) => showToast(err, "error"));
      } else {
        showToast(data.message || "Employee created successfully!", "success");
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setTimeout(() => navigate("/employee/index"), 2000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("An unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <ToastContainer />
      <Row>
        <Col sm={12}>
          <Card className="mb-4">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <Card.Title as="h5">Create Employee</Card.Title>
              <small className="text-muted float-end">Fill all fields</small>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formName">
                  <Form.Label column sm={2}>Name</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formEmail">
                  <Form.Label column sm={2}>Email</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPassword">
                  <Form.Label column sm={2}>Password</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      required
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPasswordConfirm">
                  <Form.Label column sm={2}>Confirm Password</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      required
                      autoComplete="new-password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                {orgId && <input type="hidden" name="creator" value={orgId} />}

                <Form.Group as={Row}>
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? "Saving..." : "Save"}
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeCreate;
