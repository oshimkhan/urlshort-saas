import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, MousePointer, Link as LinkIcon, Globe, Calendar } from 'lucide-react';

export default function AnalyticsDashboard({ urls, stats }) {
  // Prepare data for charts
  const clicksData = urls.slice(0, 7).map((url, i) => ({
    name: url.title || `Link ${i + 1}`,
    clicks: url.clicks,
    shortId: url.shortId
  }));

  // Simulate time-series data (last 7 days)
  const timeSeriesData = [
    { day: 'Mon', clicks: Math.floor(Math.random() * 100) + 20 },
    { day: 'Tue', clicks: Math.floor(Math.random() * 100) + 30 },
    { day: 'Wed', clicks: Math.floor(Math.random() * 100) + 40 },
    { day: 'Thu', clicks: Math.floor(Math.random() * 100) + 35 },
    { day: 'Fri', clicks: Math.floor(Math.random() * 100) + 50 },
    { day: 'Sat', clicks: Math.floor(Math.random() * 100) + 45 },
    { day: 'Sun', clicks: Math.floor(Math.random() * 100) + 30 }
  ];

  // Performance distribution
  const performanceData = [
    { name: 'High (>50 clicks)', value: urls.filter(u => u.clicks > 50).length, color: '#10b981' },
    { name: 'Medium (10-50)', value: urls.filter(u => u.clicks >= 10 && u.clicks <= 50).length, color: '#f59e0b' },
    { name: 'Low (<10)', value: urls.filter(u => u.clicks < 10).length, color: '#ef4444' }
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const avgClicks = stats.totalUrls > 0 ? (stats.totalClicks / stats.totalUrls).toFixed(1) : 0;
  const clickRate = stats.totalUrls > 0 ? ((stats.totalClicks / stats.totalUrls) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <LinkIcon className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1">{stats.totalUrls}</div>
          <div className="text-sm opacity-90">Total URLs</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <MousePointer className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1">{stats.totalClicks.toLocaleString()}</div>
          <div className="text-sm opacity-90">Total Clicks</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Globe className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1">{avgClicks}</div>
          <div className="text-sm opacity-90">Avg Clicks/URL</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1">{clickRate}%</div>
          <div className="text-sm opacity-90">Click Rate</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clicks Over Time */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Clicks Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <defs>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area type="monotone" dataKey="clicks" stroke="#3b82f6" fillOpacity={1} fill="url(#colorClicks)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performing Links */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Top Performing Links</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clicksData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="clicks" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Click Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Click Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Link Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Rank</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Link</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Clicks</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {urls.slice(0, 10).sort((a, b) => b.clicks - a.clicks).map((url, i) => (
                <tr key={url._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      i === 0 ? 'bg-yellow-400 text-yellow-900' :
                      i === 1 ? 'bg-gray-300 text-gray-700' :
                      i === 2 ? 'bg-orange-400 text-orange-900' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {i + 1}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800 dark:text-white">{url.title || 'Untitled'}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{url.shortId}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{url.clicks}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {url.clicks > 50 ? (
                        <><TrendingUp className="w-4 h-4 text-green-500" /><span className="text-green-500 font-medium">Excellent</span></>
                      ) : url.clicks >= 10 ? (
                        <><TrendingUp className="w-4 h-4 text-orange-500" /><span className="text-orange-500 font-medium">Good</span></>
                      ) : (
                        <><TrendingDown className="w-4 h-4 text-red-500" /><span className="text-red-500 font-medium">Needs Boost</span></>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
