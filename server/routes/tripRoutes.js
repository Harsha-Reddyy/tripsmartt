import express from 'express';
import { deleteTrip, generateTrip, getTrips, saveTrip } from '../controllers/tripController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.post('/generate', protect, generateTrip);
router.post('/', protect, saveTrip);
router.get('/', protect, getTrips);
router.delete('/:id', protect, deleteTrip);
export default router;
