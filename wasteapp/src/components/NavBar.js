// src/components/NavBar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './NavBar.css'; // Optional: You can style it with a CSS file

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink exact to="/" className="navbar-brand">
          <span>GreenEn</span>
        </NavLink>

        {/* Hamburger icon for smaller screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible menu */}
        <div className={`collapse navbar-collapse ${click ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                exact
                to="/Homepage"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/blog"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/trashbins"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                TrashBins
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/pickups"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Pickups
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/drivers"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Drivers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Routes"  // New Route link
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Routes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/profile"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
