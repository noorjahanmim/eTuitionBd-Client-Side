import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.jsx';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';

// ✅ AOS Animation Import & Init
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Toaster />
  </StrictMode>
);
