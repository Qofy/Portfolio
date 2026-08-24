import { useState, useEffect } from 'react';
import { UserReaction } from '../types/comments';

interface UseLikesDisikesOptions {
  postId: string;
  initialLikes: number;
  initialDislikes: number;
}

/**
 * Custom hook for managing like/dislike functionality
 * Stores user preference in localStorage
 * Ensures only one reaction (like or dislike) can be active at a time
 */
export function useLikesDislikes(options: UseLikesDisikesOptions) {
  const { postId, initialLikes, initialDislikes } = options;
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userReaction, setUserReaction] = useState<UserReaction>(null);

  // Load user's previous reaction from localStorage
  useEffect(() => {
    const storageKey = `blog_reaction_${postId}`;
    const savedReaction = localStorage.getItem(storageKey) as UserReaction;
    setUserReaction(savedReaction);
  }, [postId]);

  const handleLike = () => {
    const storageKey = `blog_reaction_${postId}`;

    if (userReaction === 'like') {
      // Remove like
      setLikes(prev => Math.max(0, prev - 1));
      setUserReaction(null);
      localStorage.removeItem(storageKey);
    } else if (userReaction === 'dislike') {
      // Switch from dislike to like
      setDislikes(prev => Math.max(0, prev - 1));
      setLikes(prev => prev + 1);
      setUserReaction('like');
      localStorage.setItem(storageKey, 'like');
    } else {
      // Add like
      setLikes(prev => prev + 1);
      setUserReaction('like');
      localStorage.setItem(storageKey, 'like');
    }
  };

  const handleDislike = () => {
    const storageKey = `blog_reaction_${postId}`;

    if (userReaction === 'dislike') {
      // Remove dislike
      setDislikes(prev => Math.max(0, prev - 1));
      setUserReaction(null);
      localStorage.removeItem(storageKey);
    } else if (userReaction === 'like') {
      // Switch from like to dislike
      setLikes(prev => Math.max(0, prev - 1));
      setDislikes(prev => prev + 1);
      setUserReaction('dislike');
      localStorage.setItem(storageKey, 'dislike');
    } else {
      // Add dislike
      setDislikes(prev => prev + 1);
      setUserReaction('dislike');
      localStorage.setItem(storageKey, 'dislike');
    }
  };

  return {
    likes,
    dislikes,
    userReaction,
    handleLike,
    handleDislike,
  };
}
