export interface Post {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostDto {
  name: string;
  description: string;
  imageUrl?: string | null;
}

export interface UpdatePostDto {
  name: string;
  description: string;
  imageUrl?: string | null;
}

