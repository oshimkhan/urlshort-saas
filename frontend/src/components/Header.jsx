import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { api } from '../lib/api';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { t } = useLanguage();

  const handleLogout = async () => {
    await api.post('/auth/logout');
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-2xl font-bold text-blue-600 cursor-pointer"
        >
          <Link2 className="w-8 h-8" />
          URLShort
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector />
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {t('logout')}
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              {t('signIn')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
