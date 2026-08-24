import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

export function useCommentCount(postId: string) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const commentsRef = collection(db, 'blogComments');
    const q = query(commentsRef, where('postId', '==', postId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCount(snapshot.size);
    });

    return () => unsubscribe();
  }, [postId]);

  return count;
}
