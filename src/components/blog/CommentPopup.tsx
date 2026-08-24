import { useState, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { collection, query, where, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Comment } from '../../types/comments';

interface CommentPopupProps {
  postId: string;
  onClose: () => void;
}

export function CommentPopup({ postId, onClose }: CommentPopupProps) {
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
    <div className="comment-popup-overlay" onClick={onClose}>
      <div className="comment-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <div className="popup-title">
            <MessageCircle size={20} />
            <h3>Comments ({comments.length})</h3>
          </div>
          <button className="popup-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="popup-form">
          <input
            type="text"
            placeholder="Your name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="popup-input"
            maxLength={50}
          />
          <textarea
            placeholder="Share your thoughts..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="popup-textarea"
            rows={2}
            maxLength={500}
          />
          <button type="submit" disabled={isSubmitting} className="popup-submit">
            {isSubmitting ? 'Posting...' : (
              <>
                <Send size={16} />
                Post
              </>
            )}
          </button>
        </form>

        {/* Comments List */}
        <div className="popup-comments">
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be first! 💬</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="popup-comment">
                <strong>{comment.author}</strong>
                <span className="comment-time">{comment.timestamp}</span>
                <p>{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
