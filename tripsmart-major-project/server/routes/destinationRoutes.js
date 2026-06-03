import express from 'express';
import { listDestinations, createDestination, deleteDestination } from '../controllers/destinationController.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = express.Router();
router.get('/', listDestinations);
router.post('/', protect, adminOnly, createDestination);
router.delete('/:id', protect, adminOnly, deleteDestination);
export default router;
