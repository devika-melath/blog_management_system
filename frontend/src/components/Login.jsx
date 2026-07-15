import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/accounts/login/', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('user_id', data.user_id);
      setUser({ token: data.token, username: data.username, id: data.user_id });
      navigate('/');
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="card" style={{ maxWidth: 420, margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 5 }}>🔐 Welcome Back</h2>
      <p style={{ textAlign: 'center', color: '#718096', marginBottom: 20 }}>Login to your account</p>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: 5 }}>Login</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 18, color: '#718096', fontSize: '0.9em' }}>
        Don't have an account? <Link to="/register" style={{ color: '#667eea', fontWeight: 600 }}>Register</Link>
      </p>
    </div>
  );
}
