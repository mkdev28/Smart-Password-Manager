import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark passop-navbar fixed-top">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold fs-4" to="/dashboard">
          <i className="bi bi-shield-lock-fill text-primary me-2"></i>
          <span className="text-primary">&lt;</span>Pass<span className="text-primary">OP/&gt;</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item me-3 text-secondary">
              Welcome, <span className="fw-bold text-light">{user?.username}</span>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
