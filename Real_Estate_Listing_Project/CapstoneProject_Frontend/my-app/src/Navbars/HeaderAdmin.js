import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBars } from 'react-icons/fa'; 
import '../styles/headeradmin.css'; // Updated to reflect the CSS file change

const HeaderAdmin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For controlling the dashboard dropdown
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Remove specific keys from localStorage
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Redirect to the home page after logout
    navigate('/');
  };

  return (
    <header className="header-admin">
      <div className="container1">
        <h1 className="logo">
          <Link to="/admindashboard"><FaHome className="home-icon" /> Luxury Space</Link>
        </h1>

        <div className="hamburger-icon" onClick={toggleMenu}>
          <FaBars />
        </div>

        <nav className={`nav-links1 ${isMenuOpen ? 'open' : ''}`}>
          <div className="dropdown">
            <span onClick={toggleDropdown} className="nav-link" style={{ cursor: 'pointer' }}>
              Dashboard
            </span>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <Link to="/admindashboard" className="dropdown-item">Your Dashboard</Link>
                <Link to="/manage-properties" className="dropdown-item">Manage Properties</Link>
                <Link to="/reports" className="dropdown-item">Reports</Link>
                <Link to="/user-inquires" className="dropdown-item">User Inquiries</Link>
              </div>
            )}
          </div>

          {/* Logout link */}
          <span onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }}>
            Logout
          </span>
        </nav>
      </div>
    </header>
  );
};

export default HeaderAdmin;
