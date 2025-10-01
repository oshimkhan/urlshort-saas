import { Router } from 'express';
import Url from '../models/Url.js';
import Click from '../models/Click.js';
import { emitClickEvent } from '../sockets.js';

const router = Router();

router.get('/r/:shortId', async (req, res) => {
  try {
    console.log('=== REDIRECT REQUEST ===');
    console.log('ShortId:', req.params.shortId);
    console.log('User-Agent:', req.headers['user-agent']);
    console.log('Referer:', req.headers.referer);
    
    const url = await Url.findOne({ shortId: req.params.shortId });
    console.log('Found URL:', url ? { 
      shortId: url.shortId, 
      longUrl: url.longUrl,
      clicks: url.clicks 
    } : 'Not found');
    
    if (!url) {
      console.log('Returning 404 - URL not found');
      return res.status(404).send('Short URL not found');
    }

    // Track click
    url.clicks += 1;
    await url.save();

    const click = await Click.create({
      url: url._id,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      referrer: req.headers.referer || req.headers.referrer
    });

    // Emit real-time event
    emitClickEvent(url.owner.toString(), { urlId: url._id, shortId: url.shortId, clicks: url.clicks });

    console.log('Redirecting to:', url.longUrl);
    console.log('=== END REDIRECT REQUEST ===');
    res.redirect(url.longUrl);
  } catch (e) {
    console.error('Redirect error:', e);
    res.status(500).send('Server error');
  }
});

export default router;
