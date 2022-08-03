import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './component/Home'
import Dashboard from './component/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li>
              Demo
            </li>
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                Dashboard 
              </Link>
            </li>
          </div>
        </nav>
        </div>
        <div className="container mt-3">      
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
</div>
      </Router>
    </div>
  );
}
export default App;  