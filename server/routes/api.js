// Routes principales de l'API
import express from 'express';
import authRoutes from './auth.js';
import quoteRoutes from './quotes.js';
import transportRoutes from './transports.js';
import trackingRoutes from './tracking.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/quotes', quoteRoutes);
router.use('/transports', transportRoutes);
router.use('/tracking', trackingRoutes);

export default router;