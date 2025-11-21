import { createFileRoute } from '@tanstack/react-router';
import { ManagePostsPage } from '../pages/ManagePostsPage';

export const Route = createFileRoute('/admin/posts')({
  component: ManagePostsPage,
});
