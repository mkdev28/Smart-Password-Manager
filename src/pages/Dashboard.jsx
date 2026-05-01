import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import PasswordCard from '../components/PasswordCard';
import PasswordForm from '../components/PasswordForm';
import { usePasswords } from '../hooks/usePasswords';
import '../styles/dashboard.css';
import '../styles/modal.css'; // For the backdrop custom class

export default function Dashboard() {
  const { passwords, loading, error, addPassword, updatePassword, deletePassword } = usePasswords();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  
  const [showForm, setShowForm] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);
  
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [passwordToDelete, setPasswordToDelete] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 2500);
  };

  const handleSave = async (pwdData) => {
    try {
      if (editingPassword) {
        await updatePassword(editingPassword._id, pwdData);
        showToast('Password updated!');
      } else {
        await addPassword(pwdData);
        showToast('Password saved!');
      }
      setShowForm(false);
      setEditingPassword(null);
    } catch (err) {
      alert(err.message || 'Error saving password'); // Simple fallback error
    }
  };

  const handleEditClick = (pwd) => {
    setEditingPassword(pwd);
    setShowForm(true);
  };

  const handleDeleteClick = (pwd) => {
    setPasswordToDelete(pwd);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (passwordToDelete) {
      try {
        await deletePassword(passwordToDelete._id);
        showToast('Deleted!');
      } catch (err) {
        alert(err.message || 'Error deleting password');
      }
    }
    setShowDeleteConfirm(false);
    setPasswordToDelete(null);
  };

  const filteredPasswords = useMemo(() => {
    return passwords.filter(p => {
      const matchesSearch = p.site.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [passwords, searchTerm, filterCategory]);

  return (
    <div className="dashboard-page d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-grow-1 container mt-5 pt-5 pb-5">
        <div className="controls-bar bg-card p-3 rounded mb-4 shadow-sm border border-secondary d-flex flex-column flex-md-row gap-3 align-items-center">
          <div className="search-box flex-grow-1 position-relative w-100 w-md-auto">
            <i className="bi bi-search position-absolute top-50 translate-middle-y ms-3 text-secondary"></i>
            <input 
              type="text" 
              className="form-control ps-5" 
              placeholder="Search site or username..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="form-select w-auto" 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Social">Social</option>
            <option value="Work">Work</option>
            <option value="Banking">Banking</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>

          <button className="btn btn-primary text-nowrap fw-bold" onClick={() => { setEditingPassword(null); setShowForm(true); }}>
            <i className="bi bi-plus-lg me-1"></i> Add Password
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : filteredPasswords.length === 0 ? (
          <div className="empty-state text-center py-5">
            <i className="bi bi-folder-x text-secondary d-block mb-3" style={{ fontSize: '4rem' }}></i>
            <h4 className="fw-bold">No passwords found</h4>
            <p className="text-secondary">
              {passwords.length === 0 ? "You haven't added any passwords yet." : "No passwords match your filters."}
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredPasswords.map(pwd => (
              <div key={pwd._id} className="col-12 col-md-6 col-lg-4">
                <PasswordCard 
                  item={pwd} 
                  onEdit={handleEditClick} 
                  onDelete={handleDeleteClick} 
                  showToast={showToast} 
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <PasswordForm 
        show={showForm} 
        onClose={() => setShowForm(false)} 
        onSave={handleSave} 
        editingPassword={editingPassword} 
      />

      {showDeleteConfirm && (
        <div className="modal-backdrop-custom d-flex justify-content-center align-items-center">
          <div className="bg-card border border-secondary p-4 rounded shadow-lg text-center" style={{maxWidth: '400px'}}>
            <h5 className="fw-bold mb-3">Delete Password?</h5>
            <p className="text-secondary mb-4">Are you sure you want to delete the password for <strong>{passwordToDelete?.site}</strong>? This action cannot be undone.</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-secondary px-4" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="btn btn-danger px-4" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {toast.show && (
        <div className={`custom-toast slide-in ${toast.type === 'success' ? 'bg-success' : 'bg-danger'} text-white`}>
          <i className={`bi ${toast.type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'} me-2`}></i>
          {toast.message}
        </div>
      )}
    </div>
  );
}
