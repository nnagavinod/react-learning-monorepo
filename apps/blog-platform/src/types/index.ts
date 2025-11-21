// Branded types for IDs to prevent mixing different ID types
export type UserId = number & { readonly __brand: 'UserId' };
export type PostId = number & { readonly __brand: 'PostId' };
export type CommentId = number & { readonly __brand: 'CommentId' };

// Core entity types
export interface User {
  id: UserId;
  username: string;
  email: string;
  avatar?: string | undefined;
  bio?: string | undefined;
  createdAt: string;
}

export interface Post {
  id: PostId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | undefined;
  authorId: UserId;
  author?: User | undefined;
  tags: string[];
  published: boolean;
  featured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: CommentId;
  postId: PostId;
  userId: UserId;
  user?: User | undefined;
  content: string;
  createdAt: string;
}

// Filter and pagination types
export interface PostFilters {
  search?: string;
  tag?: string;
  authorId?: UserId;
  featured?: boolean;
  published?: boolean;
}

// Type guard for branded types
export const asUserId = (id: number): UserId => id as UserId;
export const asPostId = (id: number): PostId => id as PostId;
export const asCommentId = (id: number): CommentId => id as CommentId;

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Route search params
export interface PostsSearchParams {
  page?: number;
  search?: string;
  tag?: string;
}

export interface PostDetailParams {
  id: string;
}

// Auth context
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}
