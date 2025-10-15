import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'next-themes';
import './styles/globals.css';
import HomeNew from './src/pages/HomeNew';

const path = window.location.pathname;

const container = document.getElementById('root')!;
createRoot(container).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {path === '/' ? <HomeNew /> : <App />}
    </ThemeProvider>
  </React.StrictMode>
);

