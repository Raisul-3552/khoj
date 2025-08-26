import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/SidebarNavbar.module.css';
import logo from '../assets/logo/logo_khoj2.png'; // <-- your logo path

const SidebarNavbar = () => {
  return (
    <>
      {/* Offcanvas Sidebar */}
      <div
        className={`offcanvas offcanvas-start ${styles.sidebar}`}
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
      >
        <div className={`offcanvas-header ${styles.sidebarHeader}`}>
          <div className={styles.logoWrapper}>
            <img src={logo} alt="Khoj Logo" className={styles.logo} />
          </div>
          <button
            type="button"
            className="btn-close btn-close-white text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <nav className="nav flex-column">
            <Link className="nav-link" to="/">🏠 Home</Link>
            <Link className="nav-link" to="/about">ℹ️ About</Link>
            <Link className="nav-link" to="/help">📞 Support</Link>
            <hr />
            <Link className="nav-link" to="/register">📝 Register</Link>
            <Link className="nav-link" to="/login">🔑 Login</Link>
          </nav>
        </div>
      </div>

      {/* Button to toggle sidebar */}
      <button
        className={`btn btn-dark ${styles.toggleBtn}`}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasSidebar"
        aria-controls="offcanvasSidebar"
      >
        ☰
      </button>
    </>
  );
};

export default SidebarNavbar;
