import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="passop-footer text-center py-4">
      <div className="container">
        <p className="mb-0 text-secondary">
          PassOP &copy; 2025. Made with <i className="bi bi-heart-fill text-danger"></i> using React + MongoDB.
        </p>
      </div>
    </footer>
  );
}
