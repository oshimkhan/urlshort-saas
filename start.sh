#!/bin/bash

echo "🚀 Starting URLShort SaaS Application..."
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   Option 1: brew services start mongodb-community"
    echo "   Option 2: mongod --dbpath ~/data/db"
    echo ""
    exit 1
fi

echo "✅ MongoDB is running"
echo ""

# Start backend in background
echo "🔧 Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"
echo "   Backend URL: http://localhost:4000"
echo ""

# Wait a bit for backend to start
sleep 3

# Start frontend in background
echo "🎨 Starting Frontend Server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"
echo "   Frontend URL: http://localhost:5173"
echo ""

echo "✨ Application is running!"
echo ""
echo "📝 To stop the servers:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop all servers..."

# Wait for user interrupt
wait
