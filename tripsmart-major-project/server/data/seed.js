import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Destination from '../models/Destination.js';
import Hotel from '../models/Hotel.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);
await Promise.all([User.deleteMany(), Destination.deleteMany(), Hotel.deleteMany()]);
await User.create([
  { name: 'Admin', email: 'admin@tripsmart.ai', password: 'admin123', role: 'admin' },
  { name: 'Demo User', email: 'user@tripsmart.ai', password: 'user123', role: 'user' }
]);
await Destination.create([
  { name: 'Araku Valley', state: 'Andhra Pradesh', category: 'Nature', bestSeason: 'Oct-Mar', avgBudget: 6000, attractions: ['Borra Caves', 'Coffee Museum', 'Tribal Museum'] },
  { name: 'Coorg', state: 'Karnataka', category: 'Nature', bestSeason: 'Oct-Feb', avgBudget: 12000, attractions: ['Abbey Falls', 'Raja Seat', 'Coffee Estates'] },
  { name: 'Goa', state: 'Goa', category: 'Beach', bestSeason: 'Nov-Feb', avgBudget: 15000, attractions: ['Baga Beach', 'Fort Aguada', 'Dudhsagar Falls'] },
  { name: 'Manali', state: 'Himachal Pradesh', category: 'Mountains', bestSeason: 'Oct-Jun', avgBudget: 18000, attractions: ['Solang Valley', 'Hadimba Temple', 'Rohtang Pass'] },
  { name: 'Jaipur', state: 'Rajasthan', category: 'Heritage', bestSeason: 'Nov-Feb', avgBudget: 10000, attractions: ['Amber Fort', 'Hawa Mahal', 'City Palace'] }
]);
await Hotel.create([
  { name: 'Araku Green Stay', location: 'Araku Valley', pricePerNight: 1500, rating: 4.2, amenities: ['WiFi', 'Breakfast'] },
  { name: 'Coorg Coffee Resort', location: 'Coorg', pricePerNight: 2800, rating: 4.5, amenities: ['Pool', 'Breakfast'] },
  { name: 'Goa Beach Inn', location: 'Goa', pricePerNight: 2200, rating: 4.3, amenities: ['Beach access', 'WiFi'] },
  { name: 'Manali Mountain View', location: 'Manali', pricePerNight: 2500, rating: 4.4, amenities: ['Heater', 'Mountain view'] }
]);
console.log('Seed completed');
await mongoose.disconnect();
