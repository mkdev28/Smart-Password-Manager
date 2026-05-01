import React from 'react';
import './../styles/strength.css';

export default function StrengthMeter({ password }) {
  const getStrength = (pwd) => {
    let score = 0;
    if (!pwd) return { score: 0, label: '', color: 'transparent' };
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score, label: 'Very Weak', color: 'var(--danger)' };
    if (score === 2) return { score, label: 'Weak', color: 'var(--warning)' };
    if (score === 3) return { score, label: 'Fair', color: '#eab308' }; // Yellow
    if (score === 4) return { score, label: 'Good', color: '#84cc16' }; // Lime
    return { score, label: 'Strong', color: 'var(--success)' };
  };

  const { score, label, color } = getStrength(password);

  return (
    <div className="strength-meter-container mt-2">
      <div className="d-flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((idx) => (
          <div
            key={idx}
            className="strength-segment flex-grow-1 rounded"
            style={{
              height: '4px',
              backgroundColor: idx <= score ? color : 'var(--bg-input)',
              transition: 'background-color 0.3s ease'
            }}
          />
        ))}
      </div>
      {label && <div className="text-end" style={{ fontSize: '0.75rem', color }}>{label}</div>}
    </div>
  );
}
