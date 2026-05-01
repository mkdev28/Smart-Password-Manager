import React, { useState } from 'react';

export default function PasswordCard({ item, onEdit, onDelete, showToast }) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null); // 'username' | 'password' | null

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Social': return 'bg-info text-dark';
      case 'Work': return 'bg-primary';
      case 'Banking': return 'bg-success';
      case 'Shopping': return 'bg-warning text-dark';
      default: return 'bg-secondary';
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    showToast(`Copied ${field}!`, 'success');
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="card h-100 bg-card border-secondary password-card text-light">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title fw-bold text-truncate mb-0 me-2" title={item.site}>{item.site}</h5>
          <span className={`badge ${getCategoryColor(item.category)}`}>{item.category}</span>
        </div>
        
        <div className="mb-2 d-flex align-items-center justify-content-between">
          <div className="text-secondary small">Username</div>
          <div className="d-flex align-items-center">
            <span className="text-truncate" style={{maxWidth: '150px'}} title={item.username}>{item.username}</span>
            <button 
              className="btn btn-sm btn-link text-secondary p-0 ms-2"
              onClick={() => copyToClipboard(item.username, 'username')}
            >
              <i className={`bi ${copiedField === 'username' ? 'bi-check-lg text-success' : 'bi-clipboard'}`}></i>
            </button>
          </div>
        </div>

        <div className="mb-3 d-flex align-items-center justify-content-between">
          <div className="text-secondary small">Password</div>
          <div className="d-flex align-items-center">
            <span className="text-truncate" style={{maxWidth: '120px', fontFamily: 'monospace'}}>
              {showPassword ? item.password : '••••••••'}
            </span>
            <button 
              className="btn btn-sm btn-link text-secondary p-0 ms-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
            </button>
            <button 
              className="btn btn-sm btn-link text-secondary p-0 ms-2"
              onClick={() => copyToClipboard(item.password, 'password')}
            >
              <i className={`bi ${copiedField === 'password' ? 'bi-check-lg text-success' : 'bi-clipboard'}`}></i>
            </button>
          </div>
        </div>

        <div className="mt-auto d-flex justify-content-end gap-2 border-top border-secondary pt-3">
          <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(item)}>
            <i className="bi bi-pencil me-1"></i> Edit
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(item)}>
            <i className="bi bi-trash me-1"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
