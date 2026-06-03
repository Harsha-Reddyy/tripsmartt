import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  category: { type: String, required: true },
  bestSeason: { type: String, default: 'All year' },
  avgBudget: { type: Number, default: 5000 },
  description: String,
  attractions: [String],
  imageUrl: String
}, { timestamps: true });

export default mongoose.model('Destination', destinationSchema);
