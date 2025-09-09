import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/Home.module.css";


const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <img
            src="/main_logo.png"
            alt="Khoj Logo"
            className={styles.logo}
          />
          <h1 className={styles.motto}></h1>
          <p className={styles.tagline}>
            Find lost items, return found ones, and make reconnections seamless.
          </p>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Welcome Back!</h2>
            <p className={styles.cardSubtitle}>
              Log in to access your dashboard or register if you're new.
            </p>

            <div className={styles.buttonGroup}>
              <button
                className={styles.loginBtn}
                onClick={() => navigate("/login")}
              >
                Log In
              </button>

              <Link to="/register" className={styles.registerBtn}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

    
    </>
  );
};

export default Home;
