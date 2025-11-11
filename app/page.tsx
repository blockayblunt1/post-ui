'use client';

import { useState, useEffect } from 'react';
import { Post, CreatePostDto, UpdatePostDto } from '@/types/post';
import { getAllPosts, createPost, updatePost, deletePost } from '@/lib/api';
import PostCard from '@/components/PostCard';
import PostForm from '@/components/PostForm';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPosts(search || undefined, sort);
      setPosts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load posts';
      setError(errorMessage);
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort]);

  const handleCreate = async (dto: CreatePostDto) => {
    try {
      await createPost(dto);
      setShowForm(false);
      setError(null);
      await loadPosts();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
      setError(errorMessage);
      throw err; // Re-throw so PostForm can also show the error
    }
  };

  const handleUpdate = async (dto: UpdatePostDto) => {
    if (!editingPost) return;
    try {
      await updatePost(editingPost.id, dto);
      setEditingPost(null);
      setError(null);
      await loadPosts();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update post';
      setError(errorMessage);
      throw err; // Re-throw so PostForm can also show the error
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      await loadPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Post Management
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage your posts with ease
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full sm:w-auto">
            <div className="flex-1 sm:max-w-xs">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts..."
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as 'asc' | 'desc')}
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="asc">Sort A-Z</option>
              <option value="desc">Sort Z-A</option>
            </select>
          </div>
          <button
            onClick={() => {
              setEditingPost(null);
              setShowForm(true);
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium whitespace-nowrap"
          >
            + Create Post
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-800 dark:text-red-200">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 text-red-600 dark:text-red-400 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Form Modal */}
        {(showForm || editingPost) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h2>
              <PostForm
                post={editingPost}
                onSubmit={editingPost ? handleUpdate : handleCreate}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading posts...</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && (
          <>
            {posts.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                  {search ? 'No posts found matching your search.' : 'No posts yet. Create your first post!'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
