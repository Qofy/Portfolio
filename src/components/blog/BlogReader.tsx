import { X } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { BlogPost } from '../../types/blog';

interface BlogReaderProps {
  post: BlogPost;
  onClose: () => void;
}

export function BlogReader({ post, onClose }: BlogReaderProps) {
  const rollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const roll = rollRef.current;
    if (!roll) return;

    const previousFocus = document.activeElement;
    closeRef.current?.focus({ preventScroll: true });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      roll.setAttribute('data-rolling', '');
      animation.current = gsap.timeline({ onComplete: () => roll.removeAttribute('data-rolling') })
        .fromTo(roll, { '--reader-roll-end': '0%', '--reader-roll-shadow': 1 }, {
          '--reader-roll-end': '100%',
          duration: 0.75,
          ease: 'power2.inOut',
        })
        .to(roll, { '--reader-roll-shadow': 0, duration: 0.16 }, 0.59)
        .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0);
    }

    return () => {
      animation.current?.kill();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  const closeReader = () => {
    const roll = rollRef.current;
    if (!roll || roll.hasAttribute('data-closing')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose();
      return;
    }

    animation.current?.kill();
    roll.setAttribute('data-closing', '');
    const end = roll.style.getPropertyValue('--reader-roll-end') || '100%';
    animation.current = gsap.timeline({ onComplete: onClose })
      .fromTo(roll, { '--reader-roll-start': '0%', '--reader-roll-shadow': 1 }, {
        '--reader-roll-start': end,
        duration: 0.6,
        ease: 'power2.inOut',
      })
      .to(roll, { '--reader-roll-shadow': 0, duration: 0.15 }, 0.45)
      .to(overlayRef.current, { opacity: 0, duration: 0.18 }, 0.42);
  };

  return (
    <div className="blog-form-overlay" ref={overlayRef} onClick={closeReader}>
      <div
        className="blog-reader-roll"
        ref={rollRef}
        role="dialog"
        aria-modal="true"
        aria-label={post.title}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === 'Escape') closeReader();
        }}
      >
        <div className="blog-reader">
          <div className="reader-header">
            <h2>{post.title}</h2>
            <button type="button" className="close-btn" ref={closeRef} onClick={closeReader} aria-label="Close article">
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
    </div>
  );
}
