import React, { useEffect, useState } from 'react';
import { X, Download, Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { api } from '../lib/api';

export default function QRModal({ url, onClose }) {
  const [qrData, setQrData] = useState(null);
  const shortUrl = `${window.location.origin}/r/${url.shortId}`;

  useEffect(() => {
    api.get(`/urls/${url._id}/qr`).then((res) => setQrData(res.data.qr));
  }, [url]);

  const downloadQR = () => {
    const canvas = document.createElement('canvas');
    const svg = document.querySelector('#qr-svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = `qr-${url.shortId}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">QR Code</h3>

        <div className="flex flex-col items-center">
          <div className="bg-white p-6 rounded-xl mb-6">
            <QRCodeSVG id="qr-svg" value={shortUrl} size={256} level="H" />
          </div>

          <div className="w-full mb-4">
            <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <code className="flex-1 text-sm text-gray-800 dark:text-gray-200 truncate">{shortUrl}</code>
              <button
                onClick={() => navigator.clipboard.writeText(shortUrl)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={downloadQR}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
}
