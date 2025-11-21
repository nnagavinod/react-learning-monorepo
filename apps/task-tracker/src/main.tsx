import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { CustomProvider } from 'rsuite';
import App from './app/app';
import './styles.css';

function Root() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'high-contrast'>(() => {
    const saved = localStorage.getItem('tasks-theme');
    return (saved as 'light' | 'dark' | 'high-contrast') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('tasks-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <CustomProvider theme={theme}>
      <App />
    </CustomProvider>
  );
}

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);
