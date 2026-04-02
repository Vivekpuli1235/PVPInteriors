import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://pvpinteriors.onrender.com/api/admin';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [reviews, setReviews] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const newToken = await userCredential.user.getIdToken();
      setToken(newToken);
      localStorage.setItem('adminToken', newToken);
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
    setToken('');
    localStorage.removeItem('adminToken');
    setReviews([]);
    setContacts([]);
  };

  const fetchDashboardData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const revRes = await axios.get(`${API_BASE}/reviews`, config);
      setReviews(revRes.data);

      const conRes = await axios.get(`${API_BASE}/contacts`, config);
      setContacts(conRes.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
        alert('Session expired. Please login again.');
      }
    }
  };

  if (!token) {
    return (
      <div className="admin-container">
        <h1 className="admin-title text-center" style={{ color: 'var(--accent)' }}>Admin Dashboard</h1>
        <div className="admin-login-box">
          <h2 style={{ marginBottom: '20px', color: '#000' }}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Admin Email"
              className="admin-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="admin-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="admin-btn">Login</button>
          </form>
          <p style={{ marginTop: '10px', fontSize: '0.8rem', color: '#666' }}>Authenticate using your Firebase credentials.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1 className="admin-title" style={{ color: 'var(--accent)' }}>Admin Dashboard</h1>
      <button onClick={handleLogout} className="admin-btn-danger">Logout</button>

      <h2 className="admin-subtitle">Reviews</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map(r => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.message}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No reviews found</td></tr>
          )}
        </tbody>
      </table>

      <h2 className="admin-subtitle">Contacts</h2>
      <table className="admin-table" style={{ marginBottom: '40px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.message}</td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No contacts found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
