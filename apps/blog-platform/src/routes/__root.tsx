import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { RootLayout } from '../components/layout/RootLayout';

export const Route = createRootRoute({
  component: () => (
    <RootLayout>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </RootLayout>
  ),
});
