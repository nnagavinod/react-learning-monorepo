-- Function to increment post views atomically
CREATE OR REPLACE FUNCTION increment_views(post_id INT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE blog_posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$;
