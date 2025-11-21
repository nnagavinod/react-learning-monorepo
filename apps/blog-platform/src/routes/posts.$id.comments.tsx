import { createFileRoute } from '@tanstack/react-router';
import { CommentsPage } from '../pages/CommentsPage';

export const Route = createFileRoute('/posts/$id/comments')({
  component: CommentsPage,
});
