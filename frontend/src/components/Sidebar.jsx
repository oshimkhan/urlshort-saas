import React from 'react';
import { Home, Link2, BarChart3, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar({ activeView, onViewChange }) {
  const items = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', view: 'dashboard' },
    { icon: <Link2 className="w-5 h-5" />, label: 'My Links', view: 'links' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics', view: 'analytics' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', view: 'settings' },
    { icon: <HelpCircle className="w-5 h-5" />, label: 'Help', view: 'help' }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed left-0 top-16 bottom-0 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => onViewChange(item.view)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeView === item.view
                ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
