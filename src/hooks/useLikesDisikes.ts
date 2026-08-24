import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserReaction } from '../types/comments';

interface UseLikesDisikesOptions {
  postId: string;
}

/**
 * Custom hook for managing like/dislike functionality
 * Stores counts and reactions in Firebase for real-time sync
 * Each user can have only one reaction (like or dislike) at a time
 */
export function useLikesDislikes(options: UseLikesDisikesOptions) {
  const { postId } = options;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState<UserReaction>(null);
  const [loading, setLoading] = useState(true);

  // Generate a unique device ID for this user (stored in localStorage)
  const getDeviceId = () => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  };

  // Load likes/dislikes from Firebase and check user's previous reaction
  useEffect(() => {
    const loadReactions = async () => {
      try {
        const deviceId = getDeviceId();
        const likesRef = doc(db, 'postLikes', postId);
        const likesDoc = await getDoc(likesRef);

        if (likesDoc.exists()) {
          const data = likesDoc.data();
          setLikes(data.likes || 0);
          setDislikes(data.dislikes || 0);

          // Check if this device has already reacted
          if (data.userReactions && data.userReactions[deviceId]) {
            setUserReaction(data.userReactions[deviceId]);
          }
        } else {
          setLikes(0);
          setDislikes(0);
        }
      } catch (error) {
        console.error('Error loading reactions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReactions();
  }, [postId]);

  const handleLike = async () => {
    if (loading) return;

    try {
      const deviceId = getDeviceId();
      const likesRef = doc(db, 'postLikes', postId);

      // Get current data
      const likesDoc = await getDoc(likesRef);
      const currentData = likesDoc.data() || { likes: 0, dislikes: 0, userReactions: {} };
      const currentReactions = currentData.userReactions || {};

      let newLikes = currentData.likes || 0;
      let newDislikes = currentData.dislikes || 0;
      let newUserReaction: UserReaction = null;

      if (userReaction === 'like') {
        // Remove like
        newLikes = Math.max(0, newLikes - 1);
        newUserReaction = null;
      } else if (userReaction === 'dislike') {
        // Switch from dislike to like
        newDislikes = Math.max(0, newDislikes - 1);
        newLikes = newLikes + 1;
        newUserReaction = 'like';
      } else {
        // Add like
        newLikes = newLikes + 1;
        newUserReaction = 'like';
      }

      // Update Firebase
      const newReactions = { ...currentReactions };
      if (newUserReaction) {
        newReactions[deviceId] = newUserReaction;
      } else {
        delete newReactions[deviceId];
      }

      await setDoc(likesRef, {
        likes: newLikes,
        dislikes: newDislikes,
        userReactions: newReactions,
        updatedAt: new Date().toISOString(),
      });

      // Update local state
      setLikes(newLikes);
      setDislikes(newDislikes);
      setUserReaction(newUserReaction);
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleDislike = async () => {
    if (loading) return;

    try {
      const deviceId = getDeviceId();
      const likesRef = doc(db, 'postLikes', postId);

      // Get current data
      const likesDoc = await getDoc(likesRef);
      const currentData = likesDoc.data() || { likes: 0, dislikes: 0, userReactions: {} };
      const currentReactions = currentData.userReactions || {};

      let newLikes = currentData.likes || 0;
      let newDislikes = currentData.dislikes || 0;
      let newUserReaction: UserReaction = null;

      if (userReaction === 'dislike') {
        // Remove dislike
        newDislikes = Math.max(0, newDislikes - 1);
        newUserReaction = null;
      } else if (userReaction === 'like') {
        // Switch from like to dislike
        newLikes = Math.max(0, newLikes - 1);
        newDislikes = newDislikes + 1;
        newUserReaction = 'dislike';
      } else {
        // Add dislike
        newDislikes = newDislikes + 1;
        newUserReaction = 'dislike';
      }

      // Update Firebase
      const newReactions = { ...currentReactions };
      if (newUserReaction) {
        newReactions[deviceId] = newUserReaction;
      } else {
        delete newReactions[deviceId];
      }

      await setDoc(likesRef, {
        likes: newLikes,
        dislikes: newDislikes,
        userReactions: newReactions,
        updatedAt: new Date().toISOString(),
      });

      // Update local state
      setLikes(newLikes);
      setDislikes(newDislikes);
      setUserReaction(newUserReaction);
    } catch (error) {
      console.error('Error updating dislike:', error);
    }
  };

  return {
    likes,
    dislikes,
    userReaction,
    handleLike,
    handleDislike,
    loading,
  };
}
