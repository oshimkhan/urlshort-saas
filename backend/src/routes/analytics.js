import { Router } from 'express';
import Url from '../models/Url.js';
import Click from '../models/Click.js';
import { authMiddleware } from '../utils/jwt.js';

const router = Router();

router.use(authMiddleware);

router.get('/overview', async (req, res) => {
  try {
    const totalUrls = await Url.countDocuments({ owner: req.user.id });
    const urls = await Url.find({ owner: req.user.id });
    const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);
    res.json({ totalUrls, totalClicks });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:urlId', async (req, res) => {
  try {
    const url = await Url.findOne({ _id: req.params.urlId, owner: req.user.id });
    if (!url) return res.status(404).json({ error: 'Not found' });

    const clicks = await Click.find({ url: url._id }).sort({ createdAt: -1 }).limit(100);
    res.json({ url, clicks });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
