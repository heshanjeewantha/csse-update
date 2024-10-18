import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Sidebar = () => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  return (
    <div className="sidebar bg-light p-3" style={{ width: "250px" }}>
      <h4>WasteOut</h4>
      <Nav defaultActiveKey="/dashboard" className="flex-column">

              <NavLink
                exact
                to="/Homepage"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>

              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                About us
              </NavLink>

              <NavLink
                exact
                to="/blog"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Blog
              </NavLink>

              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Contact Us
              </NavLink>

              <NavLink
                exact
                to="/trashbins"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                TrashBins
              </NavLink>

              <NavLink
                exact
                to="/pickups"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Pickups
              </NavLink>

              <NavLink
                exact
                to="/drivers"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Drivers
              </NavLink>

              <NavLink
                exact
                to="/Routes"  // New Route link
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Routes
              </NavLink>
              <NavLink
                exact
                to="/payments"  // New Route link
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                payment
              </NavLink>

              <NavLink
                exact
                to="/profile"
                activeClassName="active"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Profile
              </NavLink>

      </Nav>
    </div>
  );
};

export default Sidebar;
