import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Toast({ type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-up">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-xl ${
          type === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        }`}
      >
        {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-4 hover:bg-white/20 rounded p-1">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
