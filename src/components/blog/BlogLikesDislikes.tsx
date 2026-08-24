import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useLikesDislikes } from '../../hooks/useLikesDisikes';

interface BlogLikesDislikesProps {
  postId: string;
  initialLikes: number;
  initialDislikes: number;
}

export function BlogLikesDislikes({
  postId,
  initialLikes,
  initialDislikes,
}: BlogLikesDislikesProps) {
  const { likes, dislikes, userReaction, handleLike, handleDislike } =
    useLikesDislikes({
      postId,
      initialLikes,
      initialDislikes,
    });

  return (
    <div className="blog-likes-dislikes">
      <button
        className={`like-btn ${userReaction === 'like' ? 'active' : ''}`}
        onClick={handleLike}
        title={userReaction === 'like' ? 'Unlike' : 'Like'}
      >
        <ThumbsUp size={18} />
        <span>{likes}</span>
      </button>

      <div className="reaction-divider" />

      <button
        className={`dislike-btn ${userReaction === 'dislike' ? 'active' : ''}`}
        onClick={handleDislike}
        title={userReaction === 'dislike' ? 'Remove dislike' : 'Dislike'}
      >
        <ThumbsDown size={18} />
        <span>{dislikes}</span>
      </button>
    </div>
  );
}
