-- Create blog_users table
CREATE TABLE IF NOT EXISTS blog_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  avatar TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_id BIGINT NOT NULL REFERENCES blog_users(id) ON DELETE CASCADE,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  published BOOLEAN DEFAULT true NOT NULL,
  featured BOOLEAN DEFAULT false NOT NULL,
  views INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create blog_comments table
CREATE TABLE IF NOT EXISTS blog_comments (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES blog_users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS blog_posts_author_id_idx ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts(published);
CREATE INDEX IF NOT EXISTS blog_posts_featured_idx ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS blog_comments_post_id_idx ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS blog_comments_user_id_idx ON blog_comments(user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to update updated_at on blog_posts
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE blog_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_users
CREATE POLICY "Allow public read access to users" ON blog_users
  FOR SELECT USING (true);

CREATE POLICY "Allow users to update their own profile" ON blog_users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Create policies for blog_posts
CREATE POLICY "Allow public read access to published posts" ON blog_posts
  FOR SELECT USING (published = true OR auth.uid()::text = author_id::text);

CREATE POLICY "Allow authenticated users to create posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authors to update their own posts" ON blog_posts
  FOR UPDATE USING (auth.uid()::text = author_id::text);

CREATE POLICY "Allow authors to delete their own posts" ON blog_posts
  FOR DELETE USING (auth.uid()::text = author_id::text);

-- Create policies for blog_comments
CREATE POLICY "Allow public read access to comments" ON blog_comments
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create comments" ON blog_comments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow users to update their own comments" ON blog_comments
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Allow users to delete their own comments" ON blog_comments
  FOR DELETE USING (auth.uid()::text = user_id::text);
