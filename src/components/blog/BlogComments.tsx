import { useState, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { collection, query, where, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Comment } from '../../types/comments';

interface BlogCommentsProps {
  postId: string;
}

export function BlogComments({ postId }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load comments from Firebase
  useEffect(() => {
    const commentsRef = collection(db, 'blogComments');
    const q = query(
      commentsRef,
      where('postId', '==', postId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedComments: Comment[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        loadedComments.push({
          id: doc.id,
          postId: data.postId,
          author: data.author,
          text: data.text,
          timestamp: data.timestamp,
          createdAt: data.createdAt,
        });
      });
      setComments(loadedComments);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authorName.trim() || !commentText.trim()) {
      alert('Please enter your name and comment');
      return;
    }

    setIsSubmitting(true);

    try {
      const now = new Date();
      await addDoc(collection(db, 'blogComments'), {
        postId,
        author: authorName.trim(),
        text: commentText.trim(),
        timestamp: now.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        createdAt: now.getTime(),
      });

      setAuthorName('');
      setCommentText('');
      alert('Comment posted! ✅');
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Error posting comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="blog-comments-section">
      <div className="comments-header">
        <MessageCircle size={20} />
        <h3>Comments ({comments.length})</h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="comment-form">
        <input
          type="text"
          placeholder="Your name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="comment-input"
          maxLength={50}
        />
        <textarea
          placeholder="Share your thoughts..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="comment-textarea"
          rows={3}
          maxLength={500}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="comment-submit-btn"
        >
          {isSubmitting ? 'Posting...' : (
            <>
              <Send size={16} />
              Post Comment
            </>
          )}
        </button>
      </form>

      {/* Comments List */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment! 💬</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <strong className="comment-author">{comment.author}</strong>
                <span className="comment-date">{comment.timestamp}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
