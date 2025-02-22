import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Icon } from 'lucide-react'; // Remove if not needed

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

// Simple Avatar (just an emoji here)
const Avatar = ({ style }) => (
  <div
    style={{
      width: 40,
      height: 40,
      backgroundColor: '#e2e3e5',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }}
  >
    <span role="img" aria-label="avatar">
      👤
    </span>
  </div>
);

const DashDefault = () => {
  // Compute welcome message based on role
  const role = localStorage.getItem('role');
  let welcomeMessage = '';
  if (role === 'super-admin') {
    welcomeMessage = 'Super Admin Dashboard! 🚀';
  } else if (role === 'organization') {
    welcomeMessage = 'Organization Dashboard! 🚀';
  } else {
    welcomeMessage = 'Dashboard! 🚀';
  }

  // Chart Components defined locally within DashDefault
  const LineChart = ({ data }) => (
    <div style={{ height: 200 }}>
      <Line
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              data,
              label: 'Sales',
              borderColor: 'rgba(13,110,253,0.7)', // .text-primary
              fill: false,
              tension: 0.3
            }
          ]
        }}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );

  const BarChart = ({ data }) => (
    <div style={{ height: 200 }}>
      <Bar
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              data,
              label: 'Revenue',
              backgroundColor: 'rgba(25,135,84,0.7)' // .text-success
            }
          ]
        }}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );

  const DoughnutChart = ({ data, labels }) => (
    <div style={{ width: 200, margin: '0 auto' }}>
      <Doughnut
        data={{
          labels: labels || ['A', 'B', 'C', 'D', 'E'],
          datasets: [
            {
              data,
              backgroundColor: ['#0d6efd', '#6f42c1', '#d63384', '#fd7e14', '#198754']
            }
          ]
        }}
        options={{ cutout: '70%' }}
      />
    </div>
  );

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <Row className="mb-4">
        {/* LEFT COLUMN: Dashboard Header + Total Revenue */}
        <Col md={8}>
          {/* Dashboard Header Card */}
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h1 className="h4 fw-bold">{welcomeMessage}</h1>
                  <p className="text-muted mb-0">
                    You have done <span className="text-primary fw-semibold">72%</span> more sales today. Check your new badge in your profile.
                  </p>
                </div>
                <Avatar style={{ width: '48px', height: '48px' }} />
              </div>
            </Card.Body>
          </Card>

          {/* Total Revenue Card */}
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-semibold mb-0">Total Revenue</h5>
                  <div>
                    <Button variant="outline-primary" size="sm" className="me-1">
                      2021
                    </Button>
                    <Button variant="outline-secondary" size="sm" className="me-1">
                      2022
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      2023
                    </Button>
                  </div>
                  <BarChart data={[12, 19, 3, 5, 2, 3]} />
                </div>
                <div>
                  <h5 className="fw-semibold">Growth</h5>
                  <div className="my-3 text-center">
                    <DoughnutChart data={[76, 24]} labels={['Growth', 'Remaining']} />
                    <div className="mt-2">
                      <span className="fw-bold text-success fs-4">76%</span>
                      <p className="text-muted mb-0">Company Growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* RIGHT COLUMN: Counts (Profit, Sales, Payments, Transactions) */}
        <Col md={4}>
          <Row className="g-3">
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="fw-semibold">Profit</h5>
                  <h2 className="text-success">$12,628</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="fw-semibold">Sales</h5>
                  <h2 className="text-primary">$4,679</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="fw-semibold">Payments</h5>
                  <h2 className="text-info">$2,456</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="fw-semibold">Transactions</h5>
                  <h2 className="text-warning">$14,857</h2>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Other rows for charts, statistics, transactions, etc. */}
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-semibold">Order Statistics</h5>
              <h2>8,258</h2>
              <p className="text-muted">38% Returning</p>
              <DoughnutChart data={[38, 22, 16, 10, 14]} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-semibold">Profile Report</h5>
              <h2 className="text-warning">$84,686K</h2>
              <LineChart data={[50, 60, 70, 80, 60, 50]} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-semibold mb-0">Income vs Expenses</h5>
                <div>
                  <Button variant="outline-primary" size="sm" className="me-1">
                    Income
                  </Button>
                  <Button variant="outline-secondary" size="sm" className="me-1">
                    Expenses
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    Profit
                  </Button>
                </div>
              </div>
              <LineChart data={[45, 50, 40, 55, 60, 48]} />
              <p className="text-muted mt-2 mb-0">
                Expenses This Week: <span className="fw-semibold">$46.8k</span>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-semibold">Transactions</h5>
              <ul className="list-unstyled mt-3">
                <li className="d-flex justify-content-between border-bottom py-2">
                  <span>Send Money</span>
                  <span className="text-danger">-492.6 USD</span>
                </li>
                <li className="d-flex justify-content-between border-bottom py-2">
                  <span>Wallet</span>
                  <span className="text-danger">-678.9 USD</span>
                </li>
                <li className="d-flex justify-content-between border-bottom py-2">
                  <span>Starbucks</span>
                  <span className="text-danger">-426.3 USD</span>
                </li>
                <li className="d-flex justify-content-between border-bottom py-2">
                  <span>Amazon</span>
                  <span className="text-success">+320.0 USD</span>
                </li>
                <li className="d-flex justify-content-between py-2">
                  <span>Received Payment</span>
                  <span className="text-success">+512.4 USD</span>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashDefault;
