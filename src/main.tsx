import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './context/AuthProvider';
import App from './App';
import './styles/index.css';
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('No se encontró el elemento #root.');
createRoot(rootElement).render(<StrictMode><BrowserRouter><AuthProvider><App /></AuthProvider></BrowserRouter></StrictMode>);
