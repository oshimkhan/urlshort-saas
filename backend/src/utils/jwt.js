import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const COOKIE_NAME = 'uid';

export function signJwt(payload, opts = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d', ...opts });
}

export function verifyJwt(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export function setAuthCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME);
}

export function authMiddleware(req, res, next) {
  const bearer = req.headers.authorization?.split(' ')[1];
  const cookie = req.cookies?.[COOKIE_NAME];
  const token = bearer || cookie;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const decoded = verifyJwt(token);
  if (!decoded) return res.status(401).json({ error: 'Invalid token' });
  req.user = decoded;
  next();
}
