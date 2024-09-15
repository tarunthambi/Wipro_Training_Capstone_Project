import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Learn more about our mission and values.</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com" aria-label="Facebook"><FaFacebookF size={20} /></a>
            <a href="https://www.twitter.com" aria-label="Twitter"><FaTwitter size={20} /></a>
            <a href="https://www.instagram.com" aria-label="Instagram"><FaInstagram size={20} /></a>
            <a href="https://www.linkedin.com" aria-label="LinkedIn"><FaLinkedinIn size={20} /></a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>luxuryspace0309@gmail.com</p>
          <p>Phone: +91 9875673521</p>
          <p></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Luxury Space. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
