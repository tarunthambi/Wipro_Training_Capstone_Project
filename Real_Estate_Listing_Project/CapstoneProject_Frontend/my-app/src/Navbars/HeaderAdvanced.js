import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { FaHeart, FaUser, FaHome, FaBars } from 'react-icons/fa'; 
import '../styles/headerAdvanced.css';

const HeaderAdvanced = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        navigate('/');
    };

  return (
    <header className="header-advanced">
      <div className="container1">
        <h1 className="logo">
          <Link to="/home"><FaHome className="home-icon" /> Luxury Space</Link>
        </h1>

        <div className="hamburger-icon" onClick={toggleMenu}>
          <FaBars />
        </div>

        <nav className={`nav-links1 ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/properties" className="nav-link">Properties</Link>
          <Link to="/comparison" className="nav-link">Comparison</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/favorites" className="nav-link">Favorites  <FaHeart size={24} /></Link>
          <Link to="/profile" className="nav-link"><FaUser size={24} /></Link>
          <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
        </nav>
      </div>
    </header>
  );
};

export default HeaderAdvanced;
