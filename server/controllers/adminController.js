import User from '../models/User.js';
import Trip from '../models/Trip.js';
import Destination from '../models/Destination.js';
import Hotel from '../models/Hotel.js';

export const stats = async (req, res) => {
  const [users, trips, destinations, hotels] = await Promise.all([
    User.countDocuments(), Trip.countDocuments(), Destination.countDocuments(), Hotel.countDocuments()
  ]);
  res.json({ users, trips, destinations, hotels });
};
export const users = async (req, res) => res.json(await User.find().select('-password').sort({ createdAt: -1 }));
export const createHotel = async (req, res) => res.status(201).json(await Hotel.create(req.body));
export const hotels = async (req, res) => res.json(await Hotel.find().sort({ location: 1 }));
