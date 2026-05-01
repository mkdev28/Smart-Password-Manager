import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StrengthMeter from '../components/StrengthMeter';
import { api } from '../utils/api';
import '../styles/auth.css';

export default function Auth() {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [error, setError] = useState('');
  
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  
  const [showPassword, setShowPassword] = useState(false);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError('');
  };

  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleSignupChange = (e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await api.post('/api/auth/login', loginForm);
      login(data.user, data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Manual validation
    if (!signupForm.username || signupForm.username.length < 3 || signupForm.username.length > 20 || !/^[a-zA-Z0-9]+$/.test(signupForm.username)) {
      return setError('Username must be 3-20 alphanumeric characters.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signupForm.email || !emailRegex.test(signupForm.email)) {
      return setError('Invalid email format.');
    }
    if (!signupForm.password || signupForm.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      return setError('Passwords do not match.');
    }

    try {
      await api.post('/api/auth/register', {
        username: signupForm.username,
        email: signupForm.email,
        password: signupForm.password
      });
      // Registration success, switch to login
      switchTab('login');
      setLoginForm({ email: signupForm.email, password: '' });
      setError('Account created successfully! Please login.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page d-flex flex-column align-items-center justify-content-center">
      <div className="text-center mb-4">
        <h1 className="fw-bold"><span className="text-primary">&lt;</span>Pass<span className="text-primary">OP/&gt;</span></h1>
        <p className="text-secondary">Your own Password Manager</p>
      </div>

      <div className="auth-card">
        <ul className="nav nav-tabs w-100 mb-4 auth-tabs" role="tablist">
          <li className="nav-item flex-grow-1 text-center" role="presentation">
            <button className={`nav-link w-100 ${activeTab === 'login' ? 'active' : ''}`} onClick={() => switchTab('login')}>Login</button>
          </li>
          <li className="nav-item flex-grow-1 text-center" role="presentation">
            <button className={`nav-link w-100 ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => switchTab('signup')}>Sign Up</button>
          </li>
        </ul>

        {error && <div className={`alert ${error.includes('successfully') ? 'alert-success' : 'alert-danger'} p-2 mb-3`} role="alert">{error}</div>}

        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" value={loginForm.email} onChange={handleLoginChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input type={showPassword ? 'text' : 'password'} name="password" className="form-control" value={loginForm.password} onChange={handleLoginChange} required />
                <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold">Login</button>
          </form>
        )}

        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" name="username" className="form-control" value={signupForm.username} onChange={handleSignupChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" value={signupForm.email} onChange={handleSignupChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input type={showPassword ? 'text' : 'password'} name="password" className="form-control" value={signupForm.password} onChange={handleSignupChange} required />
                <button className="btn btn-outline-secondary border-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                </button>
              </div>
              <StrengthMeter password={signupForm.password} />
            </div>
            <div className="mb-4">
              <label className="form-label">Confirm Password</label>
              <input type={showPassword ? 'text' : 'password'} name="confirmPassword" className="form-control" value={signupForm.confirmPassword} onChange={handleSignupChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
}
