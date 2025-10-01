import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, Zap, BarChart3, QrCode, Shield, Globe, ArrowRight, Github, Twitter, Linkedin, Users, MousePointer, TrendingUp, Star } from 'lucide-react';
import NavigationHeader from '../components/NavigationHeader';
import ThemeToggle from '../components/ThemeToggle';

export default function Landing() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ urls: 12543, clicks: 1284567, users: 8234 });
  const [activeTab, setActiveTab] = useState('shortlink');
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        urls: prev.urls + Math.floor(Math.random() * 3),
        clicks: prev.clicks + Math.floor(Math.random() * 50),
        users: prev.users + Math.floor(Math.random() * 2)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: <Link2 className="w-8 h-8" />, title: 'Custom Short Links', desc: 'Create branded short URLs with custom aliases' },
    { icon: <BarChart3 className="w-8 h-8" />, title: 'Real-time Analytics', desc: 'Track clicks, locations, and referrers instantly' },
    { icon: <QrCode className="w-8 h-8" />, title: 'QR Code Generation', desc: 'Generate and download QR codes for your links' },
    { icon: <Shield className="w-8 h-8" />, title: 'Secure & Private', desc: 'Enterprise-grade security for your data' },
    { icon: <Zap className="w-8 h-8" />, title: 'Lightning Fast', desc: 'Redirect users in milliseconds worldwide' },
    { icon: <Globe className="w-8 h-8" />, title: 'Global CDN', desc: 'Powered by edge locations around the world' }
  ];

  const handleCreateShortUrl = async () => {
    if (!longUrl.trim()) {
      alert('Please enter a URL');
      return;
    }
    
    // For demo without login, generate a simple short URL
    setLoading(true);
    setTimeout(() => {
      const randomId = Math.random().toString(36).substring(2, 8);
      setShortUrl(`${window.location.origin}/r/${randomId}`);
      setLoading(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Build stronger digital connections
            </h1>
            <p className="text-xl text-gray-300">
              Use our URL shortener, QR Codes, and landing pages to engage your audience and connect them to the right information. Build, edit, and track everything inside the URLShort Connections Platform.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('shortlink')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'shortlink'
                  ? 'bg-white text-gray-900'
                  : 'bg-transparent text-white border-2 border-white/30 hover:border-white/50'
              }`}
            >
              <Link2 className="w-5 h-5 text-orange-500" />
              Short link
            </button>
            <button
              onClick={() => setActiveTab('qrcode')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'qrcode'
                  ? 'bg-orange-500 text-white'
                  : 'bg-transparent text-white border-2 border-orange-500 hover:bg-orange-500/10'
              }`}
            >
              <QrCode className="w-5 h-5" />
              QR Code
            </button>
          </div>

          {/* URL Shortener Form */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {activeTab === 'shortlink' ? 'Shorten a long link' : 'Create a QR Code'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">No credit card required.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Paste your long link here
                </label>
                <input
                  type="url"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="https://example.com/my-long-url"
                  className="w-full px-6 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg"
                />
              </div>

              {shortUrl && (
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your short URL:</div>
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 font-semibold text-lg hover:underline"
                      >
                        {shortUrl}
                      </a>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleCreateShortUrl}
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Creating...' : activeTab === 'shortlink' ? 'Get your link for free' : 'Generate QR Code'}
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                By clicking, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Counter */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { label: 'URLs Shortened', value: stats.urls.toLocaleString() },
            { label: 'Total Clicks', value: stats.clicks.toLocaleString() },
            { label: 'Active Users', value: stats.users.toLocaleString() }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-bounce-slow">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
          Everything You Need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Try It Section */}
      <section className="container mx-auto px-6 py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Try it now - No credit card required
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 shadow-xl">
            <label className="block text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Paste your long link here
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                placeholder="https://example.com/my-very-long-url"
                className="flex-1 px-6 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-lg"
              />
              <button
                onClick={() => navigate('/auth')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                Get your link <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
              Sign up for free. Your free plan includes:
            </p>
            <div className="flex justify-center gap-8 mt-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                50 links/month
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                Unlimited clicks
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                QR Codes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          The URLShort Connections Platform
        </h2>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
          All the products you need to build brand connections, manage links and QR Codes, and connect with audiences everywhere, in a single unified platform.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-transparent hover:border-blue-500">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <Link2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">URL Shortener</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A comprehensive solution to help make every point of connection between your content and your audience more powerful.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                Custom short links
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                Branded domains
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                Link management
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-transparent hover:border-purple-500">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">QR Codes</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              QR Code solutions for every customer, business and brand experience.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                Fully customizable QR Codes
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                Dynamic QR Codes
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                Download & print
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-transparent hover:border-green-500">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Understand your audience and measure the performance of your campaigns.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                Real-time click tracking
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                Geographic insights
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                Performance reports
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="flex items-center justify-center mb-3">
                <Users className="w-10 h-10" />
              </div>
              <div className="text-5xl font-bold mb-2">600K+</div>
              <div className="text-xl opacity-90">Global paying customers</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <Link2 className="w-10 h-10" />
              </div>
              <div className="text-5xl font-bold mb-2">256M</div>
              <div className="text-xl opacity-90">Links & QR Codes created monthly</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-10 h-10" />
              </div>
              <div className="text-5xl font-bold mb-2">800+</div>
              <div className="text-xl opacity-90">App integrations</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <MousePointer className="w-10 h-10" />
              </div>
              <div className="text-5xl font-bold mb-2">10B</div>
              <div className="text-xl opacity-90">Connections (clicks & scans) monthly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-20 bg-white dark:bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          What our customers are saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {[
            {
              text: "URLShort has transformed how we track our marketing campaigns. The analytics are incredible!",
              author: "Sarah Johnson",
              role: "Marketing Director",
              company: "TechCorp",
              rating: 5
            },
            {
              text: "The QR code feature is a game-changer for our offline marketing. Easy to use and very professional.",
              author: "Michael Chen",
              role: "Brand Manager",
              company: "RetailPro",
              rating: 5
            },
            {
              text: "Best URL shortener we've used. The custom domains feature helps maintain our brand identity.",
              author: "Emily Davis",
              role: "Digital Strategist",
              company: "Creative Agency",
              rating: 5
            }
          ].map((testimonial, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg italic">"{testimonial.text}"</p>
              <div>
                <div className="font-bold text-gray-800 dark:text-white">{testimonial.author}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                <div className="text-sm text-gray-500 dark:text-gray-500">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
          Simple Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: 'Free', price: '$0', features: ['50 URLs', 'Basic Analytics', 'QR Codes', 'Community Support'] },
            { name: 'Pro', price: '$9', features: ['500 URLs', 'Advanced Analytics', 'Custom Domains', 'Priority Support'], popular: true },
            { name: 'Business', price: '$29', features: ['Unlimited URLs', 'Team Collaboration', 'API Access', '24/7 Support'] }
          ].map((plan, i) => (
            <div
              key={i}
              className={`p-8 rounded-xl ${plan.popular ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white scale-105' : 'bg-white dark:bg-gray-800'} shadow-xl`}
            >
              {plan.popular && <div className="text-sm font-semibold mb-2">MOST POPULAR</div>}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6">
                {plan.price}<span className="text-lg">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/auth')}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            {/* Why URLShort */}
            <div>
              <h4 className="font-bold mb-4 text-orange-400">Why URLShort?</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Integrations & API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise Class</a></li>
                <li><a href="/auth" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-bold mb-4 text-orange-400">Products</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">URL Shortener</a></li>
                <li><a href="#" className="hover:text-white transition-colors">QR Code Generator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Link Management</a></li>
              </ul>
              <h4 className="font-bold mb-4 mt-6 text-orange-400">Features</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Branded Links</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Links</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Campaign Management</a></li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="font-bold mb-4 text-orange-400">Solutions</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Retail</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consumer Goods</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hospitality</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Media & Entertainment</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Technology</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Healthcare</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Insurance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Financial Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Professional Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Education</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold mb-4 text-orange-400">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides & eBooks</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Videos & Webinars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Customer Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">QR Code Gallery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Developers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Apps & Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trust Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Browser Extension</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-4 text-orange-400">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Acceptable Use Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Code of Conduct</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4 text-orange-400">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About URLShort</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
              </ul>
              <div className="mt-6">
                <h4 className="font-bold mb-3 text-orange-400">Connect</h4>
                <div className="flex gap-3">
                  <a href="https://twitter.com/urlshort" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="https://github.com/urlshort" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href="https://linkedin.com/company/urlshort" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 URLShort. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6">
        <ThemeToggle />
      </div>
    </div>
  );
}
