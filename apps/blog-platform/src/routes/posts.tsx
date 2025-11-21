import { createFileRoute, Outlet } from '@tanstack/react-router';
import { PostsPage } from '../pages/PostsPage';
import { z } from 'zod';

// Search params schema for type safety
const postsSearchSchema = z.object({
  page: z.number().optional().default(1),
  search: z.string().optional(),
  tag: z.string().optional(),
});

export const Route = createFileRoute('/posts')({
  component: PostsLayoutComponent,
  validateSearch: (search) => postsSearchSchema.parse(search),
});

function PostsLayoutComponent() {
  const location = window.location.pathname;

  // If we're at exactly /posts, show the PostsPage
  // Otherwise, render child routes via Outlet
  if (location === '/posts' || location === '/posts/') {
    return <PostsPage />;
  }

  return <Outlet />;
}
