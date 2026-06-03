import Trip from '../models/Trip.js';
import Destination from '../models/Destination.js';
import Hotel from '../models/Hotel.js';
import { buildRuleBasedPlan } from '../utils/planner.js';

export const generateTrip = async (req, res) => {
  const destinations = await Destination.find();
  const hotels = await Hotel.find();
  const plan = buildRuleBasedPlan(req.body, destinations, hotels);
  res.json({ plan });
};

export const saveTrip = async (req, res) => {
  const trip = await Trip.create({ ...req.body, user: req.user._id });
  res.status(201).json(trip);
};

export const getTrips = async (req, res) => {
  const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(trips);
};

export const deleteTrip = async (req, res) => {
  const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!trip) return res.status(404).json({ message: 'Trip not found' });
  res.json({ message: 'Trip deleted' });
};
