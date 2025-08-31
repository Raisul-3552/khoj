import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center mt-5">
      <h1>Welcome to Khoj</h1>
     <h2>Reuniting lost items with owners</h2>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/login" className="btn btn-primary">Log In</Link>
        <Link to="/register" className="btn btn-success">Registration</Link>
      </div>
    </div>
  );
};

export default Home;
