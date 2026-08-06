import '../../styles/components/BlogSection.scss';
import { ArrowUpRight, X, Edit2, Trash2, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  readingTime: number;
  image: string;
}

const DEFAULT_CATEGORIES = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Django',
  'Firebase',
  'CSS',
  'Web Development',
  'Performance',
  'Tutorial',
  'Docker'
];

const ADMIN_PASSWORD = import.meta.env.VITE_BLOG_ADMIN_PASSWORD || 'default-password';

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingPostId, setViewingPostId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: DEFAULT_CATEGORIES[0],
    image: '',
    readingTime: 5
  });
  const sectionRef = useRef<HTMLElement>(null);

  // Check admin status on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem('portfolioAdmin');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        setPosts(parsedPosts);
        setFilteredPosts(parsedPosts);
      } catch (e) {
        console.error('Error loading posts:', e);
      }
    }
  }, []);

  const handleAdminUnlock = () => {
    const password = prompt('Enter admin password:');
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('portfolioAdmin', 'true');
      alert('Admin mode unlocked!');
    } else if (password !== null) {
      alert('Incorrect password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('portfolioAdmin');
  };

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory]);

  // Add/Update scroll animation on initial load
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = sectionRef.current?.querySelectorAll('.blog-card');
            cards?.forEach((card) => {
              card.classList.add('animate');
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const current = sectionRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  // Re-animate cards when filtered posts change
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.blog-card');
    cards?.forEach((card) => {
      card.classList.remove('animate');
    });

    setTimeout(() => {
      cards?.forEach((card) => {
        card.classList.add('animate');
      });
    }, 0);
  }, [filteredPosts]);

  const handleSavePost = () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in title and content');
      return;
    }

    let updatedPosts: BlogPost[];

    if (editingId) {
      updatedPosts = posts.map(post =>
        post.id === editingId
          ? {
              ...post,
              title: formData.title,
              content: formData.content,
              category: formData.category,
              image: formData.image,
              readingTime: formData.readingTime
            }
          : post
      );
    } else {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        category: formData.category,
        date: new Date().toISOString().split('T')[0],
        readingTime: formData.readingTime,
        image: formData.image
      };
      updatedPosts = [newPost, ...posts];
    }

    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    resetForm();
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      category: post.category,
      image: post.image,
      readingTime: post.readingTime
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: DEFAULT_CATEGORIES[0],
      image: '',
      readingTime: 5
    });
    setEditingId(null);
    setShowForm(false);
  };

  const categories = ['All', ...DEFAULT_CATEGORIES];

  return (
    <section className="blog" data-section="blog" ref={sectionRef}>
      <div className="blog-container">
        <div className="blog-header">
          <h2>/BLOG</h2>
          <p className="blog-subtitle">My Learning Journey</p>
        </div>

        <div className="blog-controls">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="blog-controls-actions">
            {isAdmin ? (
              <>
                <button
                  className="new-post-btn"
                  onClick={() => setShowForm(true)}
                >
                  + New Post
                </button>
                <button
                  className="admin-btn logout"
                  onClick={handleAdminLogout}
                  title="Logout from admin mode"
                >
                  🔒 Logout
                </button>
              </>
            ) : (
              <button
                className="admin-btn unlock"
                onClick={handleAdminUnlock}
                title="Unlock admin mode"
              >
                🔓 Admin
              </button>
            )}
          </div>
        </div>

        <div className="filter-tags">
          {categories.map(cat => (
            <button
              key={cat}
              className={`tag ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {showForm && (
          <div className="blog-form-overlay">
            <div className="blog-form">
              <div className="form-header">
                <h3>{editingId ? 'Edit Post' : 'Create New Post'}</h3>
                <button className="close-btn" onClick={resetForm}>
                  <X size={20} />
                </button>
              </div>

              <input
                type="text"
                placeholder="Post Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input"
              />

              <textarea
                placeholder="Post Content (markdown supported)"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="form-textarea"
              />

              <input
                type="text"
                placeholder="Featured Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="form-input"
              />

              <div className="form-row">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                >
                  {DEFAULT_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <input
                  type="number"
                  min="1"
                  max="60"
                  value={formData.readingTime}
                  onChange={(e) => setFormData({ ...formData, readingTime: parseInt(e.target.value) })}
                  className="form-input"
                  placeholder="Reading time (minutes)"
                />
              </div>

              <button className="save-btn" onClick={handleSavePost}>
                {editingId ? 'Update Post' : 'Publish Post'}
              </button>
            </div>
          </div>
        )}

        {viewingPostId && posts.find(p => p.id === viewingPostId) && (
          <div className="blog-form-overlay" onClick={() => setViewingPostId(null)}>
            <div className="blog-reader" onClick={(e) => e.stopPropagation()}>
              <div className="reader-header">
                <h2>{posts.find(p => p.id === viewingPostId)?.title}</h2>
                <button className="close-btn" onClick={() => setViewingPostId(null)}>
                  <X size={20} />
                </button>
              </div>

              {posts.find(p => p.id === viewingPostId)?.image && (
                <div className="reader-image">
                  <img src={posts.find(p => p.id === viewingPostId)?.image} alt="Post cover" />
                </div>
              )}

              <div className="reader-meta">
                <span className="category-tag">{posts.find(p => p.id === viewingPostId)?.category}</span>
                <span className="reading-time">📖 {posts.find(p => p.id === viewingPostId)?.readingTime} min read</span>
                <span className="reader-date">{posts.find(p => p.id === viewingPostId)?.date}</span>
              </div>

              <div className="reader-content">
                {posts.find(p => p.id === viewingPostId)?.content.split('\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="blog-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="blog-card">
                {post.image && (
                  <div className="blog-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                )}

                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="category-tag">{post.category}</span>
                    <span className="reading-time">📖 {post.readingTime} min read</span>
                  </div>

                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">
                    {post.content.substring(0, 150)}...
                  </p>

                  <div className="blog-footer">
                    <span className="blog-date">{post.date}</span>
                    <div className="blog-actions">
                      <button
                        className="action-btn read"
                        onClick={() => setViewingPostId(post.id)}
                        title="Read Full Post"
                      >
                        <ArrowUpRight size={16} />
                      </button>
                      {isAdmin && (
                        <>
                          <button
                            className="action-btn edit"
                            onClick={() => handleEditPost(post)}
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeletePost(post.id)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-posts">
              <p>No blog posts yet. Create your first post!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
