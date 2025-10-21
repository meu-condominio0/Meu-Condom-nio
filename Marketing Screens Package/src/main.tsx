import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ThemeProvider from './components/ThemeProvider';
import './styles/tokens.css';
import './styles/globals.css';
import './index.css';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
