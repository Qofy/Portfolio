export interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  timestamp: string;
  createdAt?: number;
}

export interface PostLikes {
  postId: string;
  likes: number;
  dislikes: number;
}

export type UserReaction = 'like' | 'dislike' | null;
