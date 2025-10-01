# URLShort - Modern URL Shortener SaaS

A full-stack URL shortener application inspired by Bitly, built with React, Node.js, Express, MongoDB, Socket.io, and Stripe.

## 🚀 Features

- **URL Shortening**: Create custom short links with optional aliases
- **Real-time Analytics**: Track clicks, referrers, and locations with Socket.io
- **QR Code Generation**: Generate and download QR codes for any link
- **Stripe Subscriptions**: Free, Pro, and Business plans with billing portal
- **Authentication**: JWT-based auth with secure cookies
- **Dark Mode**: Beautiful UI with dark/light theme toggle
- **Responsive Dashboard**: Modern UI inspired by Bitly and Canva
- **Live Chat**: Built-in chatbot for support
- **Copy/Download**: Easy copy-to-clipboard and QR download functionality

## 📦 Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.io for real-time updates
- Stripe for payments
- JWT authentication
- QRCode generation

### Frontend
- React 18 + Vite
- TailwindCSS for styling
- Zustand for state management
- Lucide React for icons
- Axios for API calls
- React Router for navigation

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Stripe account (for billing features)

### 1. Clone and Setup

```bash
cd /Users/oseempathan/CascadeProjects/urlshort-saas
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- MongoDB URI
- JWT secret
- Stripe keys
- Frontend/backend URLs

### 3. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 4. Run Development Servers

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:4000`

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### 5. MongoDB

Make sure MongoDB is running:
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

## 🐳 Docker Setup (Alternative)

```bash
# Build and run with Docker Compose
docker-compose up --build

# Frontend: http://localhost:5173
# Backend: http://localhost:4000
# MongoDB: localhost:27017
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### URLs
- `GET /api/urls` - Get user's URLs
- `POST /api/urls` - Create short URL
- `GET /api/urls/:id` - Get URL details
- `PUT /api/urls/:id` - Update URL
- `DELETE /api/urls/:id` - Delete URL
- `GET /api/urls/:id/qr` - Get QR code

### Redirect
- `GET /r/:shortId` - Redirect to long URL (tracks click)

### Analytics
- `GET /api/analytics/overview` - Get user stats
- `GET /api/analytics/:urlId` - Get URL analytics

### Billing
- `POST /api/billing/create-checkout` - Create Stripe checkout
- `POST /api/billing/create-portal` - Create billing portal
- `POST /webhooks/stripe` - Stripe webhook handler

## 🎨 Features Breakdown

### Frontend Components
- **Landing**: Hero section with animations, features, pricing, footer
- **Auth**: Login/signup with form validation
- **Dashboard**: URL management, stats, billing
- **Header**: Navigation with theme toggle
- **Sidebar**: Dashboard navigation
- **UrlTable**: Display and manage URLs
- **QRModal**: Generate and download QR codes
- **Chatbot**: Support chat widget
- **ThemeToggle**: Dark/light mode switcher
- **Toast**: Notification system

### Backend Features
- JWT authentication with HTTP-only cookies
- Rate limiting for API protection
- Real-time click tracking with Socket.io
- Stripe webhook handling for subscriptions
- QR code generation
- MongoDB models for User, Url, Click
- Custom short ID generation with nanoid

## 🔐 Security Features

- HTTP-only cookies for JWT
- CORS configuration
- Helmet.js security headers
- Rate limiting
- Password hashing with bcrypt
- Input validation

## 💳 Stripe Integration

1. Create products in Stripe Dashboard
2. Get price IDs for Pro and Business plans
3. Add price IDs to `.env`
4. Configure webhook endpoint in Stripe
5. Add webhook secret to `.env`

## 📊 Database Schema

### User
- email, passwordHash, name
- plan (free/pro/business)
- stripeCustomerId, stripeSubscriptionId
- subscriptionStatus
- limits (maxUrls, customDomains)

### Url
- shortId, longUrl, owner
- title, tags, domain
- expiresAt, clicks

### Click
- url, ip, userAgent
- referrer, country
- timestamp

## 🚀 Deployment

### Backend
- Deploy to Railway, Render, or Heroku
- Set environment variables
- Connect to MongoDB Atlas

### Frontend
- Deploy to Vercel, Netlify, or Cloudflare Pages
- Set `VITE_API_URL` and `VITE_SOCKET_URL`

### MongoDB
- Use MongoDB Atlas for production
- Set up indexes for performance

## 📱 Screenshots

- Landing page with hero and animations
- Auth page with modern design
- Dashboard with real-time stats
- URL table with copy/QR/delete actions
- QR modal with download
- Dark mode support

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📄 License

MIT

## 🙏 Credits

Inspired by Bitly and Canva's beautiful UI/UX design.

---

**Happy URL Shortening! 🎉**
