import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h1 className="mb-3">Welcome to Khoj</h1>
      <h2 className="text-muted">Reuniting lost items with owners</h2>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/login" className="btn btn-primary">
          Log In
        </Link>
        <button
          className="btn btn-success"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
        
      </div>
    </div>
  );
};

export default Home;
