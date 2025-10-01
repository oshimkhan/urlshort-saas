import React, { useState, useEffect } from 'react';
import { Plus, LogOut, CreditCard, Search } from 'lucide-react';
import { api } from '../lib/api';
import { useAuthStore } from '../store/auth';
import { useSocket } from '../hooks/useSocket';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import UrlTable from '../components/UrlTable';
import QRModal from '../components/QRModal';
import ChatbotPro from '../components/ChatbotPro';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import Toast from '../components/Toast';
import PaymentModal from '../components/PaymentModal';
import { useLanguage } from '../contexts/LanguageContext';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState('dashboard');
  const [urls, setUrls] = useState([]);
  const [stats, setStats] = useState({ totalUrls: 0, totalClicks: 0 });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [qrModal, setQrModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ longUrl: '', customId: '', title: '' });
  const [paymentModal, setPaymentModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useSocket((data) => {
    // Real-time click updates
    setUrls((prev) =>
      prev.map((u) => (u._id === data.urlId ? { ...u, clicks: data.clicks } : u))
    );
    setStats((prev) => ({ ...prev, totalClicks: prev.totalClicks + 1 }));
  });

  useEffect(() => {
    fetchUrls();
    fetchStats();
  }, []);

  const fetchUrls = async () => {
    const res = await api.get('/urls');
    setUrls(res.data.urls);
  };

  const fetchStats = async () => {
    const res = await api.get('/analytics/overview');
    setStats(res.data);
  };

  const filteredUrls = urls.filter(url => 
    url.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.longUrl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createUrl = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/urls', form);
      setUrls([res.data.url, ...urls]);
      setForm({ longUrl: '', customId: '', title: '' });
      setShowCreateModal(false);
      setToast({ type: 'success', message: t('urlCreated') });
      fetchStats();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.error || t('failedToCreate') });
    }
  };

  const deleteUrl = async (id) => {
    try {
      await api.delete(`/urls/${id}`);
      setUrls(urls.filter((u) => u._id !== id));
      setToast({ type: 'success', message: t('urlDeleted') });
      fetchStats();
    } catch (err) {
      setToast({ type: 'error', message: t('failedToDelete') });
    }
  };

  const handleBilling = async (type, plan = 'pro') => {
    if (type === 'checkout') {
      setPaymentModal(plan);
    } else {
      try {
        const res = await api.post('/billing/create-portal', {});
        window.location.href = res.data.url;
      } catch (err) {
        setToast({ type: 'error', message: 'Failed to open billing portal' });
      }
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('totalUrls')}</div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.totalUrls}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('totalClicks')}</div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{stats.totalClicks}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('plan')}</div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2 capitalize">{user?.plan || 'Free'}</div>
                <button
                  onClick={() => handleBilling(user?.plan === 'free' ? 'checkout' : 'portal')}
                  className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <CreditCard className="w-4 h-4" />
                  {user?.plan === 'free' ? t('upgrade') : t('manageSubscription')}
                </button>
              </div>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {t('createShortUrl')}
              </button>
              
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <UrlTable urls={filteredUrls} onDelete={deleteUrl} onQR={(url) => setQrModal(url)} />
          </>
        );

      case 'links':
        return (
          <>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">{t('myLinks')}</h2>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {t('createShortUrl')}
              </button>
              
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <UrlTable urls={filteredUrls} onDelete={deleteUrl} onQR={(url) => setQrModal(url)} />
          </>
        );

      case 'analytics':
        return <AnalyticsDashboard urls={urls} stats={stats} />;

      case 'settings':
        return (
          <>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Settings</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Plan</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={(user?.plan || 'free').toUpperCase()}
                      disabled
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={() => handleBilling(user?.plan === 'free' ? 'checkout' : 'portal', 'pro')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                      {user?.plan === 'free' ? 'Upgrade Plan' : 'Manage Billing'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Usage Limits</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">URLs Created</span>
                    <span className="font-semibold text-gray-800 dark:text-white">{stats.totalUrls} / {user?.limits?.maxUrls || 50}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min((stats.totalUrls / (user?.limits?.maxUrls || 50)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'help':
        return (
          <>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Help & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Getting Started</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li>• Click "Create Short URL" to shorten your first link</li>
                  <li>• Add a custom alias for branded links</li>
                  <li>• Generate QR codes for offline sharing</li>
                  <li>• Track clicks in real-time on the Analytics page</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Features</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li>• Custom short URLs with your own aliases</li>
                  <li>• QR code generation and download</li>
                  <li>• Real-time click tracking</li>
                  <li>• Analytics dashboard</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Upgrade Benefits</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li>• Pro: 500 URLs, Advanced Analytics</li>
                  <li>• Business: Unlimited URLs, Team Features</li>
                  <li>• Custom domains and branded links</li>
                  <li>• Priority support</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Contact & Support</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Need help? Reach out to us through any of these channels:
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:support@urlshort.com"
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                  >
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">Email</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">support@urlshort.com</div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">WhatsApp</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">+1 (234) 567-890</div>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/urlshort"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">Instagram</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">@urlshort</div>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/company/urlshort"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                  >
                    <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">LinkedIn</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">URLShort Company</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        
        <main className="flex-1 p-8 ml-64">
          {renderContent()}
        </main>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{t('createShortUrl')}</h3>
            <form onSubmit={createUrl} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('longUrl')} *</label>
                <input
                  type="url"
                  required
                  value={form.longUrl}
                  onChange={(e) => setForm({ ...form, longUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://example.com/very/long/url"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('customAlias')}</label>
                <input
                  type="text"
                  value={form.customId}
                  onChange={(e) => setForm({ ...form, customId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="my-custom-link"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('title')}</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="My Campaign Link"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                >
                  {t('create')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {qrModal && <QRModal url={qrModal} onClose={() => setQrModal(null)} />}
      {paymentModal && <PaymentModal plan={paymentModal} onClose={() => setPaymentModal(null)} />}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <ChatbotPro />
    </div>
  );
}
