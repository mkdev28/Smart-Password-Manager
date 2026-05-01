import React from 'react';

export default function PasswordGenerator({ onGenerate }) {
  const generatePassword = (length = 16) => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const all = upper + lower + digits + symbols;
    
    // Guarantee at least one of each category
    let pwd = [
      upper[Math.floor(Math.random() * upper.length)],
      lower[Math.floor(Math.random() * lower.length)],
      digits[Math.floor(Math.random() * digits.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];
    
    for (let i = 4; i < length; i++) {
      pwd.push(all[Math.floor(Math.random() * all.length)]);
    }
    
    // Shuffle
    const finalPwd = pwd.sort(() => Math.random() - 0.5).join('');
    onGenerate(finalPwd);
  };

  return (
    <button 
      type="button" 
      className="btn btn-outline-info btn-sm" 
      onClick={() => generatePassword(16)}
    >
      <i className="bi bi-magic me-1"></i> Generate Strong Password
    </button>
  );
}
