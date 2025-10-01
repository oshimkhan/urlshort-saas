import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/urlshort');
    console.log('✅ MongoDB connected successfully');

    // Test creating a simple document
    const testSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', testSchema);

    const test = new TestModel({ name: 'test' });
    await test.save();
    console.log('✅ Test document saved');

    await TestModel.deleteOne({ name: 'test' });
    console.log('✅ Test document deleted');

    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
    console.log('🎉 Backend should work!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
}

testConnection();
