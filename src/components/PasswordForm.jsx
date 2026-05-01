import React, { useState, useEffect } from 'react';
import PasswordGenerator from './PasswordGenerator';
import StrengthMeter from './StrengthMeter';

export default function PasswordForm({ show, onClose, onSave, editingPassword }) {
  const defaultForm = { site: '', username: '', password: '', category: 'Other' };
  const [form, setForm] = useState(defaultForm);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (editingPassword) {
      setForm(editingPassword);
    } else {
      setForm(defaultForm);
    }
    setShowPassword(false);
  }, [editingPassword, show]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop-custom d-flex justify-content-center align-items-center">
      <div className="custom-modal bg-card border border-secondary rounded shadow-lg p-4">
        <h4 className="fw-bold mb-4">{editingPassword ? 'Edit Password' : 'Add Password'}</h4>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Website or App Name</label>
            <input type="text" name="site" className="form-control" value={form.site} onChange={handleChange} required placeholder="e.g. Google, Netflix" />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Username / Email</label>
            <input type="text" name="username" className="form-control" value={form.username} onChange={handleChange} required placeholder="user@example.com" />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input type={showPassword ? 'text' : 'password'} name="password" className="form-control" value={form.password} onChange={handleChange} required />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
            <StrengthMeter password={form.password} />
            <div className="mt-2 text-end">
              <PasswordGenerator onGenerate={(pwd) => setForm({ ...form, password: pwd })} />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Category</label>
            <select name="category" className="form-select" value={form.category} onChange={handleChange}>
              <option value="Social">Social</option>
              <option value="Work">Work</option>
              <option value="Banking">Banking</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary px-4">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
