import Destination from '../models/Destination.js';
export const listDestinations = async (req, res) => res.json(await Destination.find().sort({ name: 1 }));
export const createDestination = async (req, res) => res.status(201).json(await Destination.create(req.body));
export const deleteDestination = async (req, res) => { await Destination.findByIdAndDelete(req.params.id); res.json({ message: 'Destination removed' }); };
