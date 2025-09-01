import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from '../css/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <Link to="/">Khoj</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/report" className={({ isActive }) => isActive ? styles.active : ''}>
            Report
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => isActive ? styles.active : ''}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
