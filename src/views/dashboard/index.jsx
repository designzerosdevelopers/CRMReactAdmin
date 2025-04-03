import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Card, Col, Row } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashDefault = () => {
  const role = localStorage.getItem('role');
  const roleMessages = {
    'super-admin': 'Super Admin Dashboard 🚀',
    organization: 'Organization Dashboard 📊',
    user: 'User Dashboard 🎯'
  };
  const welcomeMessage = roleMessages[role] || 'Welcome to the Dashboard! 🚀';

  const jobData = [30, 40, 35, 50, 45, 60];
  const employeeData = [10, 12, 8, 15, 10, 14];
  const orgDoughnutData = [60, 40];

  return (
    <div className="container-fluid py-4">
      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h1 className="fw-bold">{welcomeMessage}</h1>
              <p className="text-muted">Manage jobs, employees, and organizations efficiently.</p>
            </Card.Body>
          </Card>
          <Row className="mt-3 g-3">
            {[
              { title: 'Total Jobs', value: '120', color: 'text-primary' },
              { title: 'Total Employees', value: '450', color: 'text-success' },
              { title: 'Total Organizations', value: '35', color: 'text-info' }
            ].map((stat, index) => (
              <Col md={4} key={index}>
                <Card className="shadow-sm border-0 text-center">
                  <Card.Body>
                    <h6 className="fw-semibold">{stat.title}</h6>
                    <h2 className={`${stat.color} fw-bold`}>{stat.value}</h2>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <h5 className="fw-semibold">Organizations Distribution</h5>
              <Doughnut
                data={{
                  labels: ['Active', 'Inactive'],
                  datasets: [{ data: orgDoughnutData, backgroundColor: ['#198754', '#e2e3e5'] }]
                }}
                options={{ cutout: '70%' }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashDefault;
