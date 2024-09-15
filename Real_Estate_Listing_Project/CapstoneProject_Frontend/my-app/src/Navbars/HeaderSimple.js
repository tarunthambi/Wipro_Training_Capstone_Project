import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBars } from 'react-icons/fa';
import '../styles/headerSimple.css';

const HeaderSimple = () => {
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <FaHome className="home-icon" /> Luxury Space
          </Link>
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          <FaBars />
        </div>

        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to="/login" className="nav-link login">Login</Link>
          <Link to="/register" className="nav-link signup-btn">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
};

export default HeaderSimple;
