import { BlogCard } from './BlogCard';
import { BlogPost } from '../../types/blog';

interface BlogPostListProps {
  posts: BlogPost[];
  isAdmin: boolean;
  onViewPost: (postId: string) => void;
  onEditPost: (post: BlogPost) => void;
  onDeletePost: (postId: string) => void;
}

export function BlogPostList({
  posts,
  isAdmin,
  onViewPost,
  onEditPost,
  onDeletePost,
}: BlogPostListProps) {
  if (posts.length === 0) {
    return (
      <div className="no-posts">
        <p>No blog posts found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="blog-grid">
      {posts.map(post => (
        <BlogCard
          key={post.id}
          post={post}
          isAdmin={isAdmin}
          onView={onViewPost}
          onEdit={onEditPost}
          onDelete={onDeletePost}
        />
      ))}
    </div>
  );
}
