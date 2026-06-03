import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, default: 4 },
  amenities: [String]
}, { timestamps: true });

export default mongoose.model('Hotel', hotelSchema);
