import React, { useState } from 'react';
import Registration from './Registration';
import { Link } from 'react-router-dom';

const Home = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className="text-center mt-5">
      {!showRegistration ? (
        <>
          <h1>Welcome to Khoj</h1>
          <h2>Reuniting lost items with owners</h2>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/login" className="btn btn-primary">Log In</Link>
            <button 
              className="btn btn-success" 
              onClick={() => setShowRegistration(true)}
            >
              Registration
            </button>
          </div>
        </>
      ) : (
        <Registration onBack={() => setShowRegistration(false)} />
      )}
    </div>
  );
};

export default Home;
