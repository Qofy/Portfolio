import { X } from 'lucide-react';
import { BlogPost } from '../../types/blog';

interface BlogReaderProps {
  post: BlogPost;
  onClose: () => void;
}

export function BlogReader({ post, onClose }: BlogReaderProps) {
  return (
    <div className="blog-form-overlay" onClick={onClose}>
      <div className="blog-reader" onClick={(e) => e.stopPropagation()}>
        <div className="reader-header">
          <h2>{post.title}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {post.image && (
          <div className="reader-image">
            <img src={post.image} alt="Post cover" />
          </div>
        )}

        <div className="reader-author">
          <span>By {post.author || 'Kofi Agyekum'}</span>
          <span>•</span>
          <span className="reader-date">{post.date}</span>
        </div>

        <div className="reader-meta">
          <span className="category-tag">{post.category}</span>
          <span className="reading-time">📖 {post.readingTime} min read</span>
          {post.wordCount && (
            <span className="word-count">✍️ {post.wordCount} words</span>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="reader-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="reader-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
