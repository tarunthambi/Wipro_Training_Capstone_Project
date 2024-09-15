import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import { Button, Container } from 'react-bootstrap';
import HeaderAdmin from '../Navbars/HeaderAdmin';
import '../styles/admindashboard.css'; 

const AdminDashboard = () => {
  const { auth } = React.useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if no token is found
  if (!auth.token) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <HeaderAdmin />
      <div className="admin-dashboard-bg">
        <Container className="text-center d-flex flex-column justify-content-between align-items-center vh-100 py-4">
          <h1 className="mb-4 welcome-text">
            Welcome Kishan, to your Admin Dashboard...
            <h3 className='h3text'>Here you can manage properties, agents and more to ensure everything runs smoothly</h3>
          </h1>
          
          <div className="button-group">
            <Link to="/manage-properties">
              <Button variant="primary" className="dashboard-button">Manage Properties</Button>
            </Link>
            <Link to="/reports">
              <Button variant="primary" className="dashboard-button">View Reports</Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AdminDashboard;
