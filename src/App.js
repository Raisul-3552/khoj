import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Login from './component/Login'; 
import Navbar from './component/Navbar';
import SidebarNavbar from './component/SidebarNavbar';
import Home from './component/Home';
import About from './component/About';
import Registration from './component/Registration'; 

const Layout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const useSidebar = currentPath === '/' || currentPath === '/login';

  return (
    <>
      {useSidebar ? <SidebarNavbar /> : <Navbar />}
      <div className={useSidebar ? '' : 'container mt-4'}>
        {children}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
