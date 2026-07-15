import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };
  return (
    <nav>
      <div>
        <Link to="/">✍️ Blog</Link>
        {user && <Link to="/posts/new">➕ New Post</Link>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {user ? (
          <>
            <span>👋 {user.username}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('user_id');
    if (token && username) setUser({ token, username, id: parseInt(userId) });
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <div className="container">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/:id/edit" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostDetail user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
