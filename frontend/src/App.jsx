import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { useAuthStore } from './store/auth';
import { api } from './lib/api';
import { LanguageProvider } from './contexts/LanguageContext';

function ProtectedRoute({ children }) {
  const { user } = useAuthStore();
  return user ? children : <Navigate to="/auth" />;
}

function App() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Check for OAuth token in URL
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get('token');
    
    if (oauthToken) {
      localStorage.setItem('token', oauthToken);
      window.history.replaceState({}, document.title, '/dashboard');
      window.location.href = '/dashboard';
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then((res) => setUser(res.data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setUser, setLoading]);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
