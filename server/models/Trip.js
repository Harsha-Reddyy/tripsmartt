import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  source: String,
  destination: String,
  budget: Number,
  days: Number,
  travelers: Number,
  interests: [String],
  plan: Object,
  isFavorite: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Trip', tripSchema);
