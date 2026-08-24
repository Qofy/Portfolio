import { useState } from 'react';
import { Edit2, Trash2, MessageCircle } from 'lucide-react';
import { BlogPost } from '../../types/blog';
import { BlogLikesDislikes } from './BlogLikesDislikes';
import { CommentPopup } from './CommentPopup';

interface BlogCardProps {
  post: BlogPost;
  isAdmin: boolean;
  onView: (postId: string) => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (postId: string) => void;
}

export function BlogCard({ post, isAdmin, onView, onEdit, onDelete }: BlogCardProps) {
  const [showCommentPopup, setShowCommentPopup] = useState(false);

  return (
    <>
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
          <button
            onClick={() => onView(post.id)}
            className="read-more-btn"
          >
            Read More
          </button>

          {post.tags && post.tags.length > 0 && (
            <div className="blog-tags">
              {post.tags.map(tag => (
                <span key={tag} className="blog-tag">{tag}</span>
              ))}
            </div>
          )}

          <div className="blog-card-footer">
            <div className="blog-actions">

              {isAdmin && (
                <div className="admin-actions">
                  <button
                    onClick={() => onEdit(post)}
                    className="icon-btn"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this post?')) {
                        onDelete(post.id);
                      }
                    }}
                    className="icon-btn"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="blog-engagement-icons">
              <button
                onClick={() => setShowCommentPopup(true)}
                className="engagement-btn"
                title="Comments"
              >
                <MessageCircle size={16} />
              </button>

              <BlogLikesDislikes
                postId={post.id}
                initialLikes={post.likes || 0}
                initialDislikes={post.dislikes || 0}
              />
            </div>
          </div>
        </div>
      </div>

      {showCommentPopup && (
        <CommentPopup postId={post.id} onClose={() => setShowCommentPopup(false)} />
      )}
    </>
  );
}
