# Firestore access

The browser connects directly to Firestore using the web app configuration in `.env.example`. Firestore Security Rules determine which reads and writes each client can perform.

## Collections used by the blog

| Collection | Access the UI uses |
| --- | --- |
| `blogPosts` | Reads posts ordered by `date`. The editor creates, updates, and deletes documents. |
| `blogComments` | Reads comments for a `postId` and creates new comment documents. The comment list orders by `createdAt` descending. |
| `postLikes` | Reads and updates reaction counts and device reactions in a document keyed by post ID. |

If Firestore reports a missing index for the comment query, use the index creation link in its error to configure the `postId` and `createdAt` query.

## Editor access

`VITE_BLOG_ADMIN_PASSWORD` controls whether the React editor is visible. Vite ships its value in the frontend bundle, and the browser remembers the unlocked state in local storage. The app currently has no Firebase Authentication integration, so this editor gate cannot authorize Firestore writes.

Granting public write access to `blogPosts` allows clients to bypass the editor and change or delete articles directly. The reader renders stored article HTML, so restrict post writes to trusted authors. A public read-only blog can allow post reads and deny client writes. To use the editor with protected writes, add Firebase Authentication and enforce author permissions in Firestore rules.

Comments and reactions have separate write paths. Define and validate those operations in their own rules if enabling them. The browser-generated device ID used for reactions is mutable and does not establish a user’s identity.
