import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function Register({ setUser }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/accounts/register/', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('user_id', data.user_id);
      setUser({ token: data.token, username: data.username, id: data.user_id });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.username?.[0] || 'Registration failed');
    }
  };

  return (
    <div className="card" style={{ maxWidth: 420, margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 5 }}>🚀 Create Account</h2>
      <p style={{ textAlign: 'center', color: '#718096', marginBottom: 20 }}>Join the community</p>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password (min 6 characters)" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: 5 }}>Register</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 18, color: '#718096', fontSize: '0.9em' }}>
        Already have an account? <Link to="/login" style={{ color: '#667eea', fontWeight: 600 }}>Login</Link>
      </p>
    </div>
  );
}
