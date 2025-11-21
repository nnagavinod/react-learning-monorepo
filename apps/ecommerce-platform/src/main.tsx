import { StrictMode, useState, useEffect } from 'react';
import { CustomProvider } from 'rsuite';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import './styles.css';

function Root() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'high-contrast'>(() => {
    const saved = localStorage.getItem('ecommerce-theme');
    return (saved as 'light' | 'dark' | 'high-contrast') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('ecommerce-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <CustomProvider theme={theme}>
      <App />
    </CustomProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);
