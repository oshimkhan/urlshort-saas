import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, Mail, Lock, User } from 'lucide-react';
import { api } from '../lib/api';
import { useAuthStore } from '../store/auth';
import Toast from '../components/Toast';
import SocialLogin from '../components/SocialLogin';
import { useLanguage } from '../contexts/LanguageContext';

export default function Auth() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      console.log('Submitting to:', endpoint, { email: form.email });
      
      const res = await api.post(endpoint, form);
      console.log('Auth response:', res.data);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      
      if (res.data.user) {
        setUser(res.data.user);
        setToast({ type: 'success', message: `${t('welcome')} ${isLogin ? t('welcomeBack') : ''}!` });
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        throw new Error('No user data received');
      }
    } catch (err) {
      console.error('Auth error:', err);
      const errorMsg = err.response?.data?.error || err.message || t('connectionFailed');
      setToast({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-4xl font-bold text-blue-600 mb-4">
            <Link2 className="w-10 h-10" />
            URLShort
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isLogin ? t('welcomeBack') : t('createAccount')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isLogin ? t('signInToAccount') : t('startShortening')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('name')}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('loading') : isLogin ? t('signIn') : t('createAccount')}
            </button>
          </form>

          <div className="mt-6">
            <SocialLogin />
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}
            </button>
          </div>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
