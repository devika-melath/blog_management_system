import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function PostDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');

  const fetchPost = () => API.get(`/posts/${id}/`).then(res => setPost(res.data));

  useEffect(() => { fetchPost(); }, [id]);

  const deletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await API.delete(`/posts/${id}/`);
      navigate('/');
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    await API.post(`/posts/${id}/comments/`, { content: comment });
    setComment('');
    fetchPost();
  };

  const deleteComment = async (commentId) => {
    await API.delete(`/posts/${id}/comments/${commentId}/`);
    fetchPost();
  };

  const updateComment = async (commentId) => {
    await API.put(`/posts/${id}/comments/${commentId}/`, { content: editContent });
    setEditingComment(null);
    fetchPost();
  };

  if (!post) return <div className="card" style={{ textAlign: 'center', marginTop: 30 }}>⏳ Loading...</div>;

  const isOwner = user && user.id === post.author;

  return (
    <div style={{ marginTop: 10 }}>
      <div className="card">
        <h1>{post.title}</h1>
        <p className="meta">
          ✏️ {post.author_username} • {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <p className="post-content" style={{ whiteSpace: 'pre-wrap', marginTop: 18 }}>{post.content}</p>
        {isOwner && (
          <div className="actions" style={{ marginTop: 20 }}>
            <Link to={`/posts/${id}/edit`} className="btn btn-primary btn-sm">✏️ Edit</Link>
            <button className="btn btn-danger btn-sm" onClick={deletePost}>🗑️ Delete</button>
          </div>
        )}
      </div>

      <div className="card">
        <h3>💬 Comments ({post.comments.length})</h3>
        {post.comments.length === 0 && <p style={{ color: '#718096', marginTop: 10 }}>No comments yet. Start the conversation!</p>}
        {post.comments.map(c => (
          <div key={c.id} className="comment">
            {editingComment === c.id ? (
              <>
                <textarea value={editContent} onChange={e => setEditContent(e.target.value)} />
                <button className="btn btn-success btn-sm" onClick={() => updateComment(c.id)}>Save</button>
                <button className="btn btn-sm" style={{ background: '#edf2f7' }} onClick={() => setEditingComment(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p><strong>{c.author_username}</strong> • <span style={{ color: '#a0aec0', fontSize: '0.85em' }}>{new Date(c.created_at).toLocaleDateString()}</span></p>
                <p style={{ marginTop: 6, color: '#4a5568' }}>{c.content}</p>
                {user && user.id === c.author && (
                  <div className="actions">
                    <button className="btn btn-primary btn-sm" onClick={() => { setEditingComment(c.id); setEditContent(c.content); }}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteComment(c.id)}>Delete</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {user ? (
          <form onSubmit={addComment} style={{ marginTop: 20 }}>
            <textarea placeholder="Write a comment..." value={comment} onChange={e => setComment(e.target.value)} required />
            <button className="btn btn-success" type="submit">💬 Post Comment</button>
          </form>
        ) : (
          <p style={{ marginTop: 20, color: '#718096' }}>
            <Link to="/login" style={{ color: '#667eea', fontWeight: 600 }}>Login</Link> to join the conversation.
          </p>
        )}
      </div>
    </div>
  );
}
