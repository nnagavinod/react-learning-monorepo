import { createFileRoute } from '@tanstack/react-router';
import { getPostBySlug } from '../lib/db-service';
import { PostDetailPage } from '../pages/PostDetailPage';

export const Route = createFileRoute('/posts/$id')({
  component: PostDetailPage,
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.id);
    if (!post) {
      throw new Error('Post not found');
    }
    return { post };
  },
  // Optional: Add error handling
  errorComponent: ({ error }) => (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
      <p className="text-gray-600">{error.message}</p>
    </div>
  ),
});
