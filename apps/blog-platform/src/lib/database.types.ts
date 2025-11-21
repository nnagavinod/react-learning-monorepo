export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      blog_users: {
        Row: {
          id: number;
          username: string;
          email: string;
          avatar: string | null;
          bio: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          username: string;
          email: string;
          avatar?: string | null;
          bio?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          username?: string;
          email?: string;
          avatar?: string | null;
          bio?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: number;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          cover_image: string | null;
          author_id: number;
          tags: string[];
          published: boolean;
          featured: boolean;
          views: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          cover_image?: string | null;
          author_id: number;
          tags?: string[];
          published?: boolean;
          featured?: boolean;
          views?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          cover_image?: string | null;
          author_id?: number;
          tags?: string[];
          published?: boolean;
          featured?: boolean;
          views?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'blog_posts_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'blog_users';
            referencedColumns: ['id'];
          }
        ];
      };
      blog_comments: {
        Row: {
          id: number;
          post_id: number;
          user_id: number;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          post_id: number;
          user_id: number;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          post_id?: number;
          user_id?: number;
          content?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'blog_comments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'blog_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'blog_comments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'blog_users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_views: {
        Args: {
          post_id: number;
        };
        Returns: void;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
