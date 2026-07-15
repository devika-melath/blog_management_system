import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      API.get(`/posts/${id}/`).then(res => setForm({ title: res.data.title, content: res.data.content }));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/posts/${id}/`, form);
      } else {
        await API.post('/posts/', form);
      }
      navigate('/');
    } catch {
      setError('Failed to save post. Make sure you are logged in.');
    }
  };

  return (
    <div className="card" style={{ marginTop: 20, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
      <h2 style={{ marginBottom: 20 }}>{id ? '✏️ Edit Post' : '🆕 Create New Post'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Give your post a title..." value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <textarea placeholder="Write your content here..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required style={{ minHeight: 200 }} />
        <button className="btn btn-success" type="submit" style={{ marginTop: 5 }}>{id ? '💾 Update Post' : '🚀 Publish Post'}</button>
      </form>
    </div>
  );
}
