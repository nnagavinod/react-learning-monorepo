import { supabase } from './supabase';
import {
  Post,
  Comment,
  User,
  PostFilters,
  PaginationParams,
  PaginatedResponse,
} from '../types';

// Helper to map database row to User
function mapToUser(row: any): User {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    avatar: row.avatar || undefined,
    bio: row.bio || undefined,
    createdAt: row.created_at,
  };
}

// Helper to map database row to Post
function mapToPost(row: any): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image || undefined,
    authorId: row.author_id,
    author: row.blog_users ? mapToUser(row.blog_users) : undefined,
    tags: row.tags || [],
    published: row.published,
    featured: row.featured,
    views: row.views,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Helper to map database row to Comment
function mapToComment(row: any): Comment {
  return {
    id: row.id,
    postId: row.post_id,
    userId: row.user_id,
    user: row.blog_users ? mapToUser(row.blog_users) : undefined,
    content: row.content,
    createdAt: row.created_at,
  };
}

// User operations
export async function getUserByUsername(username: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('blog_users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !data) return null;
  return mapToUser(data);
}

export async function getUserById(id: number): Promise<User | null> {
  const { data, error } = await supabase
    .from('blog_users')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return mapToUser(data);
}

// Post operations
export async function getAllPosts(
  filters: PostFilters = {},
  pagination?: PaginationParams
): Promise<PaginatedResponse<Post>> {
  let query = supabase
    .from('blog_posts')
    .select('*, blog_users(*)', { count: 'exact' })
    .order('created_at', { ascending: false });

  // Apply filters
  if (filters.published !== undefined) {
    query = query.eq('published', filters.published);
  }

  if (filters.featured !== undefined) {
    query = query.eq('featured', filters.featured);
  }

  if (filters.tag) {
    query = query.contains('tags', [filters.tag]);
  }

  if (filters.authorId) {
    query = query.eq('author_id', filters.authorId);
  }

  // Apply pagination
  if (pagination) {
    const { page = 1, limit = 10 } = pagination;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  const page = pagination?.page || 1;
  const limit = pagination?.limit || 10;
  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  if (error) {
    console.error('Error fetching posts:', error);
    return { data: [], total: 0, page, limit, totalPages: 0 };
  }

  return {
    data: data?.map(mapToPost) || [],
    total,
    page,
    limit,
    totalPages,
  };
}

export async function getPostById(id: number): Promise<Post | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, blog_users(*)')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return mapToPost(data);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, blog_users(*)')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return mapToPost(data);
}

export async function incrementPostViews(id: number): Promise<void> {
  const { error } = await supabase.rpc('increment_views', { post_id: id });
  
  // Fallback if RPC doesn't exist
  if (error) {
    const { data: post } = await supabase
      .from('blog_posts')
      .select('views')
      .eq('id', id)
      .single();
    
    if (post) {
      await supabase
        .from('blog_posts')
        .update({ views: post.views + 1 })
        .eq('id', id);
    }
  }
}

export async function createPost(post: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  authorId: number;
  tags: string[];
  published?: boolean;
  featured?: boolean;
}): Promise<Post> {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.coverImage || null,
      author_id: post.authorId,
      tags: post.tags,
      published: post.published ?? true,
      featured: post.featured ?? false,
    })
    .select('*, blog_users(*)')
    .single();

  if (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }

  return mapToPost(data);
}

export async function updatePost(
  id: number,
  updates: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    tags?: string[];
    published?: boolean;
    featured?: boolean;
  }
): Promise<Post> {
  const updateData: any = {};

  if (updates.title !== undefined) updateData.title = updates.title;
  if (updates.slug !== undefined) updateData.slug = updates.slug;
  if (updates.excerpt !== undefined) updateData.excerpt = updates.excerpt;
  if (updates.content !== undefined) updateData.content = updates.content;
  if (updates.coverImage !== undefined) updateData.cover_image = updates.coverImage;
  if (updates.tags !== undefined) updateData.tags = updates.tags;
  if (updates.published !== undefined) updateData.published = updates.published;
  if (updates.featured !== undefined) updateData.featured = updates.featured;

  const { data, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select('*, blog_users(*)')
    .single();

  if (error) {
    console.error('Error updating post:', error);
    throw new Error('Failed to update post');
  }

  return mapToPost(data);
}

export async function deletePost(id: number): Promise<void> {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
}

export async function getAllTags(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('tags')
    .eq('published', true);

  if (error || !data) return [];

  const allTags = new Set<string>();
  data.forEach((row) => {
    if (row.tags) {
      row.tags.forEach((tag: string) => allTags.add(tag));
    }
  });

  return Array.from(allTags).sort();
}

// Comment operations
export async function getCommentsByPostId(postId: number): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('blog_comments')
    .select('*, blog_users(*)')
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data.map(mapToComment);
}

export async function createComment(
  postId: number,
  userId: number,
  content: string
): Promise<Comment> {
  const { data, error } = await supabase
    .from('blog_comments')
    .insert({
      post_id: postId,
      user_id: userId,
      content,
    })
    .select('*, blog_users(*)')
    .single();

  if (error) {
    console.error('Error creating comment:', error);
    throw new Error('Failed to create comment');
  }

  return mapToComment(data);
}

export async function deleteComment(id: number): Promise<void> {
  const { error } = await supabase
    .from('blog_comments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting comment:', error);
    throw new Error('Failed to delete comment');
  }
}

// Search functionality
export async function searchPosts(query: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, blog_users(*)')
    .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data.map(mapToPost);
}
