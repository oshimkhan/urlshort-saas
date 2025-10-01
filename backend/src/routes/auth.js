import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signJwt, setAuthCookie, clearAuthCookie, authMiddleware } from '../utils/jwt.js';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log('Signup attempt:', { email, name });
    
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, name });
    const token = signJwt({ id: user._id, email: user.email, plan: user.plan });
    setAuthCookie(res, token);
    
    console.log('Signup successful:', user.email);
    res.json({ user: { id: user._id, email: user.email, plan: user.plan, name: user.name }, token });
  } catch (e) {
    console.error('Signup error:', e);
    res.status(500).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ error: 'User not found' });
    }
    
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      console.log('Invalid password for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = signJwt({ id: user._id, email: user.email, plan: user.plan });
    setAuthCookie(res, token);
    
    console.log('Login successful:', user.email);
    res.json({ user: { id: user._id, email: user.email, plan: user.plan, name: user.name }, token });
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ error: e.message });
  }
});

router.post('/logout', (req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  res.json({ user });
});

export default router;
