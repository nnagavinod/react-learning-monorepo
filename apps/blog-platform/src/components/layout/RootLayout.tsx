import { Header } from './Header';
import { Footer } from './Footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
