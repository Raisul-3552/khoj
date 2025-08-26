import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/SidebarNavbar.module.css';

const SidebarNavbar = () => {
  return (
    <>
      {/* Offcanvas Sidebar */}
      <div className={`offcanvas offcanvas-start ${styles.sidebar}`} tabIndex="-1" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">Khoj</h5>
          <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <nav className="nav flex-column">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/about">About</Link>
            <Link className="nav-link" to="/register">Register</Link>
            <Link className="nav-link" to="/login">Login</Link>
          </nav>
        </div>
      </div>

      {/* Button to toggle sidebar */}
      <button
        className={`btn btn-primary ${styles.toggleBtn}`}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasSidebar"
        aria-controls="offcanvasSidebar"
      >
        ☰ Menu
      </button>
    </>
  );
};

export default SidebarNavbar;
