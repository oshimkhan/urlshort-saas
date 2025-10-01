import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, ChevronDown } from 'lucide-react';

export default function NavigationHeader() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const platformItems = [
    { title: 'URL Shortener', desc: 'Create and manage short links', href: '#' },
    { title: 'QR Code Generator', desc: 'Generate dynamic QR codes', href: '#' },
    { title: 'Analytics', desc: 'Track and analyze performance', href: '#' },
    { title: 'Link Management', desc: 'Organize all your links', href: '#' }
  ];

  const solutionsItems = [
    { title: 'Retail', desc: 'Drive in-store and online sales', href: '#' },
    { title: 'Consumer Goods', desc: 'Connect with customers', href: '#' },
    { title: 'Hospitality', desc: 'Enhance guest experience', href: '#' },
    { title: 'Healthcare', desc: 'Improve patient engagement', href: '#' },
    { title: 'Technology', desc: 'Scale your tech business', href: '#' },
    { title: 'Education', desc: 'Engage students and faculty', href: '#' }
  ];

  const resourcesItems = [
    { title: 'Blog', desc: 'Latest insights and tips', href: '#' },
    { title: 'Guides & eBooks', desc: 'In-depth resources', href: '#' },
    { title: 'Customer Stories', desc: 'Success stories', href: '#' },
    { title: 'Help Center', desc: 'Get support', href: '#' },
    { title: 'API Documentation', desc: 'Developer resources', href: '#' },
    { title: 'Integrations', desc: 'Connect your tools', href: '#' }
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-2 text-center">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-bold">NEW</span>
            <span className="text-gray-700 dark:text-gray-300">
              Get fresh insights into how marketers are using QR Codes in 2025 and beyond.{' '}
              <a href="#" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Read the report →
              </a>
            </span>
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-2xl font-bold text-orange-500 cursor-pointer"
          >
            <Link2 className="w-8 h-8" />
            <span>URLShort</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Platform Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('platform')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
                Platform <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === 'platform' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
                  <div className="space-y-2">
                    {platformItems.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="font-semibold text-gray-900 dark:text-white">{item.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('solutions')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
                Solutions <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === 'solutions' && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {solutionsItems.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => navigate('/auth')}
                        className="w-full text-left block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pricing Link */}
            <a
              href="/auth"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
            >
              Pricing
            </a>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('resources')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
                Resources <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
                  <div className="space-y-2">
                    {resourcesItems.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => navigate('/auth')}
                        className="w-full text-left block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="font-semibold text-gray-900 dark:text-white">{item.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
              🌐 EN <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
            >
              Log in
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
            >
              Get a Quote
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Sign up Free
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
