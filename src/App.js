  import React from 'react';
import Registration from './component/Registration';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  
  import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
  
  import Login from './component/Login'; 
  import Navbar from './component/Navbar';
  import Home from './component/Home';
  import About from './component/About';
<<<<<<< HEAD
  
=======
  import Registration from './component/Registration'; 
  import Report from './component/Report'; 
>>>>>>> f45736b30cc3925be99077c2c8b168849d8bd398

  function App() {
    return (
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/report" element={<Report />} />

          </Routes>
        </div>
      </Router>
    );
  }

  export default App;
