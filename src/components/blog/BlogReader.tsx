import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { BlogPost } from '../../types/blog';

interface BlogReaderProps {
  post: BlogPost;
  onClose: () => void;
}

export function BlogReader({ post, onClose }: BlogReaderProps) {
  const readerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!readerRef.current) return;

    // Set initial state - rolled up like carpet
    gsap.set(readerRef.current, {
      rotationX: -72,
      transformPerspective: 900,
      transformOrigin: '50% 100%',
      opacity: 0,
    });

    // Roll in animation - unfurl like carpet
    gsap.to(readerRef.current, {
      rotationX: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power2.inOut',
    });

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, []);

  const handleClose = () => {
    // Roll out animation - roll up like carpet
    gsap.to(readerRef.current, {
      rotationX: -72,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: onClose,
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    });
  };

  return (
    <div className="blog-form-overlay" onClick={handleClose} ref={overlayRef}>
      <div className="blog-reader" onClick={(e) => e.stopPropagation()} ref={readerRef}>
        <div className="reader-header">
          <h2>{post.title}</h2>
          <button className="close-btn" onClick={handleClose}>
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
