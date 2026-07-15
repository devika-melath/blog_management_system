import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    API.get('/posts/').then(res => setPosts(res.data));
  }, []);

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.author_username.toLowerCase().includes(search.toLowerCase())
  );

  const totalComments = posts.reduce((sum, p) => sum + (p.comment_count || 0), 0);
  const uniqueAuthors = [...new Set(posts.map(p => p.author_username))].length;

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h1>✍️ Welcome to the Blog</h1>
        <p>Discover stories, ideas, and insights from our community of writers.</p>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{posts.length}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{uniqueAuthors}</span>
            <span className="stat-label">Authors</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{totalComments}</span>
            <span className="stat-label">Comments</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          placeholder="🔍 Search posts by title or author..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 0 }}
        />
      </div>

      {/* Featured Post */}
      {posts.length > 0 && !search && (
        <div className="featured-card">
          <span className="featured-badge">⭐ Latest Post</span>
          <Link to={`/posts/${posts[0].id}`}><h2>{posts[0].title}</h2></Link>
          <p className="meta">
            By {posts[0].author_username} • {new Date(posts[0].created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="featured-content">{posts[0].content.substring(0, 300)}{posts[0].content.length > 300 ? '...' : ''}</p>
          <Link to={`/posts/${posts[0].id}`} className="btn btn-primary" style={{ marginTop: 15 }}>Read More →</Link>
        </div>
      )}

      {/* Posts Grid */}
      <div className="section-header">
        <h2>📚 {search ? 'Search Results' : 'All Posts'}</h2>
        <span className="post-count">{filtered.length} {filtered.length === 1 ? 'post' : 'posts'}</span>
      </div>

      {filtered.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <p style={{ fontSize: '2em', marginBottom: 10 }}>📭</p>
          <p style={{ color: '#718096' }}>{search ? 'No posts match your search.' : 'No posts yet. Be the first to write one!'}</p>
        </div>
      )}

      <div className="posts-grid">
        {(search ? filtered : posts.slice(1)).map(post => (
          <div key={post.id} className="card post-card">
            <div className="post-card-header">
              <div className="author-avatar">{post.author_username.charAt(0).toUpperCase()}</div>
              <div>
                <span className="author-name">{post.author_username}</span>
                <span className="post-date">{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
            <Link to={`/posts/${post.id}`}><h3 className="post-title">{post.title}</h3></Link>
            <p className="post-excerpt">{post.content.substring(0, 120)}{post.content.length > 120 ? '...' : ''}</p>
            <div className="post-card-footer">
              <span className="comment-badge">💬 {post.comment_count}</span>
              <Link to={`/posts/${post.id}`} className="read-more">Read →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
