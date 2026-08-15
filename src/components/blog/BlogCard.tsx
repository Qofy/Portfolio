import { Edit2, Trash2 } from 'lucide-react';
import { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
  isAdmin: boolean;
  onView: (postId: string) => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (postId: string) => void;
}

export function BlogCard({ post, isAdmin, onView, onEdit, onDelete }: BlogCardProps) {
  return (
    <div className={`blog-card ${post.isFeatured ? 'featured' : ''} animate`}>
      {post.isFeatured && <div className="featured-badge">⭐</div>}

      {post.image && (
        <div className="blog-image">
          <img src={post.image} alt={post.title} />
        </div>
      )}

      <div className="blog-content">
        <h3 className="blog-title">{post.title}</h3>

        {post.excerpt && <p className="blog-excerpt">{post.excerpt}</p>}

        <div className="blog-meta">
          <span className="category-tag">{post.category}</span>
          <span className="reading-time">📖 {post.readingTime} min</span>
          {post.wordCount && <span className="word-count">✍️ {post.wordCount} words</span>}
        </div>

        {post.author && <p className="blog-author">By {post.author}</p>}

        {post.tags && post.tags.length > 0 && (
          <div className="blog-tags">
            {post.tags.map(tag => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="blog-actions">
          <button
            onClick={() => onView(post.id)}
            style={{
              background: '#e93f5b',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              (e.target as HTMLButtonElement).style.background = '#c72a47';
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLButtonElement).style.background = '#e93f5b';
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            Read More
          </button>

          {isAdmin && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => onEdit(post)}
                title="Edit"
                style={{
                  background: 'none',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  color: '#666',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseOver={(e) => {
                  (e.target as HTMLButtonElement).style.borderColor = '#e93f5b';
                  (e.target as HTMLButtonElement).style.color = '#e93f5b';
                }}
                onMouseOut={(e) => {
                  (e.target as HTMLButtonElement).style.borderColor = '#e0e0e0';
                  (e.target as HTMLButtonElement).style.color = '#666';
                }}
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => {
                  if (confirm('Delete this post?')) {
                    onDelete(post.id);
                  }
                }}
                title="Delete"
                style={{
                  background: 'none',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  color: '#666',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseOver={(e) => {
                  (e.target as HTMLButtonElement).style.borderColor = '#e93f5b';
                  (e.target as HTMLButtonElement).style.color = '#e93f5b';
                }}
                onMouseOut={(e) => {
                  (e.target as HTMLButtonElement).style.borderColor = '#e0e0e0';
                  (e.target as HTMLButtonElement).style.color = '#666';
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
