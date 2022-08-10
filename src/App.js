import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './component/Dashboard';
import Home from './component/Home';
import MyStore from './component/MyStore';
import Logout from "./component/Logout";
import NewStream from "./component/NewStream";
import UpdateStream from "./component/UpdateStream";
import RegisterUser from "./component/RegisterUser";

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
              <li className="nav-item">
                <Link to={"/mystore"} className="nav-link">
                  My Store
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/logout"} className="nav-link">
                  Logout
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
            <Route path="/mystore" element={<MyStore />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/newstream" element={<NewStream />} />
            <Route path="/updatestream/:streamid" element={<UpdateStream />} />
            <Route path="/register" element={<RegisterUser />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;  