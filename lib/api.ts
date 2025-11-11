import { Post, CreatePostDto, UpdatePostDto } from '@/types/post';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7198';

export async function getAllPosts(search?: string, sort: 'asc' | 'desc' = 'asc'): Promise<Post[]> {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  params.append('sort', sort);
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts?${params.toString()}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}. ${errorText}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Cannot connect to backend API at ${API_BASE_URL}. Make sure the backend is running.`);
    }
    throw error;
  }
}

export async function getPostById(id: number): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/api/posts/${id}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
}

export async function createPost(dto: CreatePostDto): Promise<Post> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to create post: ${response.status} ${response.statusText}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.title || errorMessage;
      } catch {
        if (errorText) errorMessage += `. ${errorText}`;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Cannot connect to backend API at ${API_BASE_URL}. Make sure the backend is running.`);
    }
    throw error;
  }
}

export async function updatePost(id: number, dto: UpdatePostDto): Promise<Post> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to update post: ${response.status} ${response.statusText}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.title || errorMessage;
      } catch {
        if (errorText) errorMessage += `. ${errorText}`;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Cannot connect to backend API at ${API_BASE_URL}. Make sure the backend is running.`);
    }
    throw error;
  }
}

export async function deletePost(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete post');
}

