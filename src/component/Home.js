import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Home.module.css';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.homeBox}>
        <h1 className={styles.title}>Welcome to Khoj</h1>
        <h2 className={styles.subtitle}>Reuniting lost items with their rightful owners</h2>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/login" className="btn btn-primary">Log In</Link>
          <Link to="/register" className="btn btn-success">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
