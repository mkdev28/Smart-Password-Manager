import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero d-flex flex-column justify-content-center align-items-center text-center">
        <div className="hero-glow"></div>
        <div className="lock-icon-container mb-4">
          <i className="bi bi-shield-lock-fill text-primary" style={{ fontSize: '4rem' }}></i>
        </div>
        <h1 className="hero-title fw-bold mb-3">
          <span className="text-primary">&lt;</span>Pass<span className="text-primary">OP/&gt;</span>
        </h1>
        <p className="hero-subtitle mb-5 text-secondary">
          Your secure, private, and powerful password manager.
        </p>
        <div className="d-flex gap-3 flex-column flex-sm-row">
          <Link to="/auth" className="btn btn-primary btn-lg fw-bold px-4">Get Started Free</Link>
          <a href="#features" className="btn btn-outline-light btn-lg fw-bold px-4">See How It Works</a>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar bg-card border-top border-bottom border-secondary py-4">
        <div className="container">
          <div className="row text-center text-md-start align-items-center">
            <div className="col-sm-6 col-md-3 mb-3 mb-md-0 fw-bold text-accent">256-bit Encryption Approach</div>
            <div className="col-sm-6 col-md-3 mb-3 mb-md-0 fw-bold text-accent">Zero Plain-text Exposure</div>
            <div className="col-sm-6 col-md-3 mb-3 mb-md-0 fw-bold text-accent">Multi-user Isolated Vaults</div>
            <div className="col-sm-6 col-md-3 fw-bold text-accent">Open Source</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section py-5 container">
        <h2 className="text-center fw-bold mb-5">Why choose PassOP?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card text-center p-4 h-100">
              <i className="bi bi-shield-check text-success mb-3 d-block" style={{ fontSize: '3rem' }}></i>
              <h4 className="fw-bold">Military-grade Security</h4>
              <p className="text-secondary">Your passwords are tied exclusively to your account. No one else can access them.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card text-center p-4 h-100">
              <i className="bi bi-key-fill text-warning mb-3 d-block" style={{ fontSize: '3rem' }}></i>
              <h4 className="fw-bold">One Master Password</h4>
              <p className="text-secondary">Remember just one password. We handle the rest.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card text-center p-4 h-100">
              <i className="bi bi-lightning-charge-fill text-info mb-3 d-block" style={{ fontSize: '3rem' }}></i>
              <h4 className="fw-bold">Instant Access</h4>
              <p className="text-secondary">Find any credential in seconds with search and category filters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works py-5 bg-card border-top border-secondary">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">How It Works</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="step-number">1</div>
              <h5 className="fw-bold mt-3">Create your account</h5>
            </div>
            <div className="col-md-4 mb-4">
              <div className="step-number">2</div>
              <h5 className="fw-bold mt-3">Add your passwords</h5>
            </div>
            <div className="col-md-4 mb-4">
              <div className="step-number">3</div>
              <h5 className="fw-bold mt-3">Access anywhere, anytime</h5>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 text-center">
        <h2 className="fw-bold mb-4">Ready to take control of your digital security?</h2>
        <Link to="/auth" className="btn btn-primary btn-lg fw-bold px-5 py-3">Create Free Account</Link>
      </section>

      <Footer />
    </div>
  );
}
