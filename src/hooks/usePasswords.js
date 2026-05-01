import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export function usePasswords() {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPasswords = async () => {
    setLoading(true);
    try {
      const data = await api.get('/api/passwords');
      setPasswords(data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPasswords(); }, []);

  const addPassword = async (payload) => {
    const newPwd = await api.post('/api/passwords', payload);
    setPasswords(prev => [newPwd, ...prev]);
    return newPwd;
  };

  const updatePassword = async (id, payload) => {
    const updated = await api.put(`/api/passwords/${id}`, payload);
    setPasswords(prev => prev.map(p => p._id === id ? updated : p));
    return updated;
  };

  const deletePassword = async (id) => {
    await api.delete(`/api/passwords/${id}`);
    setPasswords(prev => prev.filter(p => p._id !== id));
  };

  return { passwords, loading, error, fetchPasswords, addPassword, updatePassword, deletePassword };
}
