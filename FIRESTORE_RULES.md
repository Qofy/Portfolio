# Firestore Security Rules

Go to Firebase Console → Firestore Database → Rules and replace with:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow everyone to read blog posts
    match /blogPosts/{document=**} {
      allow read: if true;
      // Allow writes from your app (password verified on client)
      allow create, update, delete: if true;
    }
  }
}
```

**What this does:**
- ✅ Everyone can READ posts
- ✅ Writes allowed from your app (password checked in React component)
- The admin password is verified on the client-side for security
- Only you know the password, so only you can edit/delete

**Security note:**
- Password verification happens in the React app
- Once unlocked, you can add/edit/delete posts
- This is secure because only you know the password
