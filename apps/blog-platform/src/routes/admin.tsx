import { createFileRoute, Outlet, useMatches } from '@tanstack/react-router';
import { AdminPage } from '../pages/AdminPage';

export const Route = createFileRoute('/admin')({
  component: AdminLayoutComponent,
});

function AdminLayoutComponent() {
  const matches = useMatches();

  // If only the /admin route is matched (no child routes), show AdminPage
  // Otherwise, render child routes via Outlet
  const isAdminIndex =
    matches.length === 2 && matches[matches.length - 1]?.id === '/admin';

  if (isAdminIndex) {
    return <AdminPage />;
  }

  return <Outlet />;
}
