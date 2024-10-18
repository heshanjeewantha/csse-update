import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="bg-success text-white text-center py-3">
      <div className="container">
        {/* Main Navigation Links */}
        <div className="d-flex justify-content-center mb-2">
          <NavLink to="/" className="text-white mx-2">Home</NavLink>
          <NavLink to="/about" className="text-white mx-2">About</NavLink>
          <NavLink to="/services" className="text-white mx-2">Services</NavLink>
          <NavLink to="/blog" className="text-white mx-2">Blog</NavLink>
          <NavLink to="/contact" className="text-white mx-2">Contact Us</NavLink>
          <NavLink to="/login" className="text-white mx-2">Login</NavLink>
          <NavLink to="/register" className="text-white mx-2">Register</NavLink>
        </div>

        {/* Brand Section */}
        <div className="mb-2">
          <span>GreenEn</span>
          <span className="icon ms-2">
            <i className="fas fa-code"></i>
          </span>
        </div>

        {/* Legal Links */}
        <div className="d-flex justify-content-center">
          <NavLink to="/privacy-policy" className="text-white mx-2">Privacy Policy</NavLink>
          <NavLink to="/terms-of-service" className="text-white mx-2">Terms of Service</NavLink>
          <NavLink to="/faq" className="text-white mx-2">FAQ</NavLink>
          <NavLink to="/support" className="text-white mx-2">Support</NavLink>
        </div>

        {/* Copyright Section */}
        <p className="mt-2">© 2024 GreenEn. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
