import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Home.module.css';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.overlay}></div> {/* Optional overlay for background effect */}
      <div className={styles.homeBox}>
        <h1 className={styles.title}>Welcome to Khoj</h1>
        <h2 className={styles.subtitle}>
          Helping you reunite lost items with their rightful owners
        </h2>

        <p className={styles.description}>
          Found something? Or lost something valuable? Join Khoj and make sure nothing stays lost forever.
        </p>

        <div className={styles.buttonGroup}>
          <Link to="/login" className={`btn btn-primary ${styles.btnCustom}`}>
            Log In
          </Link>
          <Link to="/register" className={`btn btn-success ${styles.btnCustom}`}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
