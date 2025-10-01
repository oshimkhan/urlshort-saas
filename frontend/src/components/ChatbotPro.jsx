import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User as UserIcon } from 'lucide-react';

export default function ChatbotPro() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! 👋 I\'m your URLShort assistant. How can I help you today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    'How do I create a short URL?',
    'What are the pricing plans?',
    'How to generate QR codes?',
    'Contact support'
  ];

  const getAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // Intelligent response mapping
    if (msg.includes('create') || msg.includes('shorten') || msg.includes('url')) {
      return 'To create a short URL:\n\n1. Click the "Create Short URL" button\n2. Paste your long URL\n3. (Optional) Add a custom alias\n4. Click "Create"\n\nYour short link will be ready instantly! 🚀';
    }
    
    if (msg.includes('price') || msg.includes('plan') || msg.includes('upgrade') || msg.includes('cost')) {
      return 'We offer 3 plans:\n\n💚 **Free**: 50 URLs, Basic Analytics\n💙 **Pro ($9/mo)**: 500 URLs, Advanced Analytics, Custom Domains\n💜 **Business ($29/mo)**: Unlimited URLs, Team Features, API Access\n\nClick "Settings" → "Upgrade Plan" to get started!';
    }
    
    if (msg.includes('qr') || msg.includes('code')) {
      return 'To generate a QR code:\n\n1. Go to "My Links" or "Dashboard"\n2. Click the QR icon next to any link\n3. Download or share the QR code\n\nQR codes are perfect for print materials, posters, and offline marketing! 📱';
    }
    
    if (msg.includes('analytic') || msg.includes('track') || msg.includes('click')) {
      return 'Track your link performance:\n\n📊 Go to "Analytics" to see:\n• Total clicks and URLs\n• Click-through rates\n• Top performing links\n• Real-time updates\n\nAll data updates instantly with Socket.io! ⚡';
    }
    
    if (msg.includes('support') || msg.includes('help') || msg.includes('contact')) {
      return 'Need assistance? We\'re here to help!\n\n📧 Email: support@urlshort.com\n💬 Live Chat: Available 24/7\n📚 Documentation: Check the Help section\n\nOr click "Help" in the sidebar for FAQs and guides.';
    }
    
    if (msg.includes('custom') || msg.includes('domain')) {
      return 'Custom domains are available on Pro and Business plans!\n\nBenefits:\n• Branded short links (e.g., go.yourbrand.com)\n• Increased trust and click-through rates\n• Professional appearance\n\nUpgrade to Pro or Business to unlock this feature! 🎯';
    }
    
    if (msg.includes('api') || msg.includes('integrate')) {
      return 'API access is available on Business plan!\n\nFeatures:\n• RESTful API endpoints\n• Bulk URL creation\n• Analytics data export\n• Webhook support\n\nPerfect for developers and automation! 🔧';
    }
    
    if (msg.includes('thank') || msg.includes('thanks')) {
      return 'You\'re welcome! 😊 Is there anything else I can help you with?';
    }
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return 'Hello! 👋 Great to see you! How can I assist you today?';
    }
    
    // Default intelligent response
    return 'I\'m here to help! I can assist you with:\n\n• Creating short URLs\n• Pricing and plans\n• QR code generation\n• Analytics and tracking\n• Account settings\n• Technical support\n\nWhat would you like to know more about?';
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        role: 'bot',
        text: getAIResponse(input),
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 700); // Random delay for realism
  };

  const handleQuickReply = (reply) => {
    setInput(reply);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all flex items-center justify-center z-50 animate-bounce"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[420px] h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold text-lg">URLShort Assistant</div>
                <div className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-lg p-2 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  }`}>
                    {msg.role === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div>
                    <div
                      className={`p-3 rounded-2xl whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-tl-none shadow-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 items-end">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none shadow-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick replies:</div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
