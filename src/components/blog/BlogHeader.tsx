interface BlogHeaderProps {
  isAdmin: boolean;
  onNewPost: () => void;
  onAdminUnlock: () => void;
  onAdminLogout: () => void;
}

export function BlogHeader({ isAdmin, onNewPost, onAdminUnlock, onAdminLogout }: BlogHeaderProps) {
  return (
    <div className="blog-header">
      <h2>/BLOG</h2>
      <p className="blog-subtitle">Thoughts on web development, design, and tech</p>

      <div className="blog-controls-actions">
        {isAdmin && (
          <button className="new-post-btn" onClick={onNewPost}>
            + New Post
          </button>
        )}

        {isAdmin ? (
          <button className="admin-btn logout" onClick={onAdminLogout}>
            Logout
          </button>
        ) : (
          <button className="admin-btn unlock" onClick={onAdminUnlock}>
            🔓 Admin
          </button>
        )}
      </div>
    </div>
  );
}
