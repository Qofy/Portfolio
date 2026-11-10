import '../../styles/components/BlogSection.scss';
import { SectionMesh } from '../common/SectionMesh';
import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { BlogPost, FormData, ADMIN_PASSWORD, INITIAL_FORM_DATA } from '../../types/blog';
import { useAIBlogSearch, useBlogScrollSequence } from '../../hooks';
import { BlogFilters } from '../blog/BlogFilters';
import { BlogPostList } from '../blog/BlogPostList';
import { BlogForm } from '../blog/BlogForm';
import { BlogReader } from '../blog/BlogReader';
import { BlogHeader } from '../blog/BlogHeader';

export function BlogSection() {
  // State for posts
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');

  // State for UI
  const [showForm, setShowForm] = useState(false);
  const [viewingPostId, setViewingPostId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // State for form
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [editingId, setEditingId] = useState<string | null>(null);

  const sectionRef = useBlogScrollSequence(filteredPosts);

  // AI Search hook
  const { searchPosts, isSearching: isAISearching } = useAIBlogSearch();
  const [useAISearch, setUseAISearch] = useState(false);

  // Check admin status on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem('portfolioAdmin');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Load posts from Firestore in real-time
  useEffect(() => {
    const postsRef = collection(db, 'blogPosts');
    const postsQuery = query(postsRef, orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot) => {
        const loadedPosts: BlogPost[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          loadedPosts.push({
            id: docSnap.id,
            title: data.title,
            content: data.content,
            category: data.category,
            date: data.date,
            time: data.time || '00:00',
            readingTime: data.readingTime,
            image: data.image,
            author: data.author || 'Kofi Agyekum',
            excerpt: data.excerpt,
            tags: data.tags || [],
            wordCount: data.wordCount,
            isFeatured: data.isFeatured || false,
            updatedDate: data.updatedDate,
          });
        });
        setPosts(loadedPosts);
      },
      (error) => {
        console.error('Error loading posts:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Filter posts based on search, category, and date with AI-powered search
  useEffect(() => {
    const applyFilters = async () => {
      let filtered = posts;

      // Apply category filter
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(post => post.category === selectedCategory);
      }

      // Apply date filter
      if (selectedDate !== 'All') {
        filtered = filtered.filter(post => post.date === selectedDate);
      }

      // Apply search (with AI enhancement if enabled)
      if (searchTerm) {
        filtered = await searchPosts(filtered, searchTerm, useAISearch);
      }

      // Sort by date
      filtered.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB.getTime() - dateA.getTime();
      });

      setFilteredPosts(filtered);
    };

    applyFilters();
  }, [posts, searchTerm, selectedCategory, selectedDate, searchPosts, useAISearch]);

  // Firebase operations
  const handleSavePost = async (data: FormData) => {
    try {
      const wordCount = data.content.split(/\s+/).length;
      const excerpt = data.excerpt || data.content.substring(0, 200).replace(/\n/g, ' ') + '...';
      const tagsArray = typeof data.tags === 'string'
        ? data.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
        : [];

      if (editingId) {
        const postDoc = doc(db, 'blogPosts', editingId);
        await updateDoc(postDoc, {
          title: data.title,
          content: data.content,
          category: data.category,
          image: data.image,
          readingTime: data.readingTime,
          time: data.time,
          author: data.author,
          excerpt,
          tags: tagsArray,
          wordCount,
          isFeatured: data.isFeatured,
          updatedDate: new Date().toISOString().split('T')[0],
        });
      } else {
        await addDoc(collection(db, 'blogPosts'), {
          title: data.title,
          content: data.content,
          category: data.category,
          date: new Date().toISOString().split('T')[0],
          time: data.time,
          readingTime: data.readingTime,
          image: data.image,
          author: data.author,
          excerpt,
          tags: tagsArray,
          wordCount,
          isFeatured: data.isFeatured,
        });
      }

      alert(editingId ? 'Post updated!' : 'Post published!');
      resetForm();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post. Please try again.');
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const postDoc = doc(db, 'blogPosts', id);
      await deleteDoc(postDoc);
      alert('Post deleted!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post. Please try again.');
    }
  };

  const handleEditPost = (post: BlogPost) => {
    const tagsString = Array.isArray(post.tags) ? post.tags.join(', ') : '';
    setFormData({
      title: post.title,
      content: post.content,
      category: post.category,
      image: post.image,
      readingTime: post.readingTime,
      time: post.time,
      author: post.author || 'Kofi Agyekum',
      excerpt: post.excerpt || '',
      tags: tagsString,
      isFeatured: post.isFeatured || false,
      date: post.date,
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleAdminUnlock = () => {
    const password = prompt('Enter admin password:');
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('portfolioAdmin', 'true');
      alert('Admin mode unlocked!');
    } else if (password !== null) {
      alert('Incorrect password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('portfolioAdmin');
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setEditingId(null);
    setShowForm(false);
  };

  const viewedPost = posts.find(p => p.id === viewingPostId);

  return (
    <section className="blog" data-section="blog" ref={sectionRef}>
      <SectionMesh />
      <div className="blog-container">
        <div className="blog-intro" data-blog-reveal="intro">
          <BlogHeader
            isAdmin={isAdmin}
            onNewPost={() => setShowForm(true)}
            onAdminUnlock={handleAdminUnlock}
            onAdminLogout={handleAdminLogout}
          />

          <BlogFilters
            posts={posts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            useAISearch={useAISearch}
            setUseAISearch={setUseAISearch}
            isAISearching={isAISearching}
          />
        </div>

        <BlogPostList
          posts={filteredPosts}
          isAdmin={isAdmin}
          onViewPost={setViewingPostId}
          onEditPost={handleEditPost}
          onDeletePost={handleDeletePost}
        />

        {showForm && (
          <BlogForm
            onClose={resetForm}
            onSave={handleSavePost}
            editingPost={editingId ? posts.find(p => p.id === editingId) : null}
            initialFormData={INITIAL_FORM_DATA}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {viewedPost && (
          <BlogReader
            post={viewedPost}
            onClose={() => setViewingPostId(null)}
          />
        )}
      </div>
    </section>
  );
}
