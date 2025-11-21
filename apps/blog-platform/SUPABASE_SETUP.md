# Supabase Setup Guide

This guide will help you set up Supabase for the blog platform application.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new Supabase project

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Project Settings** > **API**
3. Copy the following values:
   - **Project URL** (e.g., `https://xyzcompany.supabase.co`)
   - **anon/public key** (This is safe to use in client-side code)

## Step 2: Configure Environment Variables

1. Open the `.env` file in the workspace root directory
2. Update the following variables with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note:** The `.env` file is already added to `.gitignore` to keep your credentials secure.

## Step 3: Run Database Migrations

You have two options to run the migrations:

### Option A: Using Supabase Dashboard (Recommended for beginners)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of `apps/blog-platform/supabase/migrations/20250121000000_create_blog_tables.sql`
5. Click **Run** to execute the migration
6. Repeat for `apps/blog-platform/supabase/migrations/20250121000001_seed_blog_data.sql`

### Option B: Using Supabase CLI

1. Install the Supabase CLI:

   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:

   ```bash
   supabase login
   ```

3. Link your project (from the blog-platform directory):

   ```bash
   cd apps/blog-platform
   supabase link --project-ref your-project-ref
   ```

4. Push migrations to Supabase:

   ```bash
   supabase db push
   ```

## Step 4: Verify Database Setup

1. Go to your Supabase project dashboard
2. Navigate to **Database** > **Tables**
3. You should see three tables:
   - `blog_users`
   - `blog_posts`
   - `blog_comments`

4. Click on each table to verify the seed data was inserted

## Step 5: Run the Application

```bash
# From the workspace root
npx nx serve blog-platform
```

The application will now use Supabase as its database backend!

## Database Schema

### blog_users

- `id` (bigint, primary key)
- `username` (text, unique)
- `email` (text, unique)
- `avatar` (text, nullable)
- `bio` (text, nullable)
- `created_at` (timestamp)

### blog_posts

- `id` (bigint, primary key)
- `title` (text)
- `slug` (text, unique)
- `excerpt` (text)
- `content` (text)
- `cover_image` (text, nullable)
- `author_id` (bigint, foreign key → blog_users)
- `tags` (text array)
- `published` (boolean)
- `featured` (boolean)
- `views` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### blog_comments

- `id` (bigint, primary key)
- `post_id` (bigint, foreign key → blog_posts)
- `user_id` (bigint, foreign key → blog_users)
- `content` (text)
- `created_at` (timestamp)

## Row Level Security (RLS)

The migrations include Row Level Security policies:

- **blog_users**: Public read access, users can update their own profile
- **blog_posts**: Public can read published posts, authenticated users can create/update/delete their own posts
- **blog_comments**: Public read access, authenticated users can create/update/delete their own comments

## Troubleshooting

### "Missing Supabase environment variables" Error

- Make sure your `.env` file is in the workspace root directory
- Verify that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set correctly
- Restart your development server after updating `.env`

### Database Connection Errors

- Check that your Supabase project is active
- Verify your credentials are correct
- Ensure your IP is not blocked (check Supabase project settings)

### Migration Errors

- Make sure you run migrations in order (create tables before seed data)
- Check that tables don't already exist before running create migrations
- Review the error message in Supabase SQL Editor

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client Docs](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
