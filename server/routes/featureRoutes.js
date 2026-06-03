import express from 'express';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.use(protect);

const destinations = [
  { name:'Goa', state:'Goa', type:'Beach', emoji:'🏖️', rating:4.8, minBudget:1500, recommended:3000, bestSeason:'Nov-Feb' },
  { name:'Visakhapatnam', state:'Andhra Pradesh', type:'Beach', emoji:'🌊', rating:4.7, minBudget:900, recommended:2200, bestSeason:'Oct-Mar' },
  { name:'Araku Valley', state:'Andhra Pradesh', type:'Nature', emoji:'🌄', rating:4.6, minBudget:700, recommended:1600, bestSeason:'Oct-Mar' },
  { name:'Tirupati', state:'Andhra Pradesh', type:'Heritage', emoji:'🛕', rating:4.9, minBudget:500, recommended:1200, bestSeason:'All Year' },
  { name:'Hyderabad', state:'Telangana', type:'Heritage', emoji:'🏰', rating:4.7, minBudget:800, recommended:2000, bestSeason:'Oct-Feb' },
  { name:'Warangal', state:'Telangana', type:'Heritage', emoji:'🛕', rating:4.5, minBudget:600, recommended:1500, bestSeason:'Oct-Feb' },
  { name:'Ananthagiri Hills', state:'Telangana', type:'Nature', emoji:'🌿', rating:4.5, minBudget:700, recommended:1500, bestSeason:'Jul-Feb' },
  { name:'Bengaluru', state:'Karnataka', type:'Nature', emoji:'🌆', rating:4.6, minBudget:1000, recommended:2500, bestSeason:'Oct-Feb' },
  { name:'Mysuru', state:'Karnataka', type:'Heritage', emoji:'🏰', rating:4.5, minBudget:600, recommended:1200, bestSeason:'Oct-Feb' },
  { name:'Coorg', state:'Karnataka', type:'Nature', emoji:'🌿', rating:4.6, minBudget:1000, recommended:2500, bestSeason:'Sep-Mar' },
  { name:'Hampi', state:'Karnataka', type:'Heritage', emoji:'🛕', rating:4.7, minBudget:500, recommended:1000, bestSeason:'Oct-Feb' },
  { name:'Gokarna', state:'Karnataka', type:'Beach', emoji:'🏖️', rating:4.7, minBudget:800, recommended:1800, bestSeason:'Oct-Mar' },
  { name:'Ooty', state:'Tamil Nadu', type:'Mountains', emoji:'🏔️', rating:4.8, minBudget:1000, recommended:2500, bestSeason:'Sep-Jun' },
  { name:'Kodaikanal', state:'Tamil Nadu', type:'Mountains', emoji:'🌄', rating:4.7, minBudget:900, recommended:2200, bestSeason:'Oct-Jun' },
  { name:'Rameswaram', state:'Tamil Nadu', type:'Heritage', emoji:'🌊', rating:4.7, minBudget:700, recommended:1600, bestSeason:'Oct-Mar' },
  { name:'Kanyakumari', state:'Tamil Nadu', type:'Beach', emoji:'🌅', rating:4.7, minBudget:800, recommended:1800, bestSeason:'Oct-Mar' },
  { name:'Munnar', state:'Kerala', type:'Nature', emoji:'🍃', rating:4.9, minBudget:1200, recommended:2800, bestSeason:'Sep-Mar' },
  { name:'Alleppey', state:'Kerala', type:'Nature', emoji:'⛵', rating:4.8, minBudget:1200, recommended:3000, bestSeason:'Sep-Mar' },
  { name:'Wayanad', state:'Kerala', type:'Nature', emoji:'🌿', rating:4.8, minBudget:1000, recommended:2500, bestSeason:'Oct-May' },
  { name:'Varkala', state:'Kerala', type:'Beach', emoji:'🏖️', rating:4.7, minBudget:900, recommended:2200, bestSeason:'Oct-Mar' },
  { name:'Mumbai', state:'Maharashtra', type:'Heritage', emoji:'🌆', rating:4.6, minBudget:1200, recommended:3000, bestSeason:'Oct-Feb' },
  { name:'Lonavala', state:'Maharashtra', type:'Nature', emoji:'🌧️', rating:4.6, minBudget:800, recommended:2000, bestSeason:'Jul-Feb' },
  { name:'Ajanta Caves', state:'Maharashtra', type:'Heritage', emoji:'🗿', rating:4.8, minBudget:700, recommended:1800, bestSeason:'Oct-Mar' },
  { name:'Jaipur', state:'Rajasthan', type:'Heritage', emoji:'🏰', rating:4.8, minBudget:800, recommended:2200, bestSeason:'Oct-Mar' },
  { name:'Udaipur', state:'Rajasthan', type:'Heritage', emoji:'🏯', rating:4.9, minBudget:1200, recommended:3000, bestSeason:'Oct-Mar' },
  { name:'Jaisalmer', state:'Rajasthan', type:'Desert', emoji:'🐪', rating:4.7, minBudget:700, recommended:1500, bestSeason:'Nov-Feb' },
  { name:'Agra', state:'Uttar Pradesh', type:'Heritage', emoji:'🕌', rating:4.8, minBudget:700, recommended:1800, bestSeason:'Oct-Mar' },
  { name:'Varanasi', state:'Uttar Pradesh', type:'Heritage', emoji:'🕌', rating:4.7, minBudget:600, recommended:1200, bestSeason:'Oct-Mar' },
  { name:'Delhi', state:'Delhi', type:'Heritage', emoji:'🏛️', rating:4.6, minBudget:1000, recommended:2500, bestSeason:'Oct-Mar' },
  { name:'Amritsar', state:'Punjab', type:'Heritage', emoji:'🛕', rating:4.8, minBudget:700, recommended:1800, bestSeason:'Oct-Mar' },
  { name:'Manali', state:'Himachal Pradesh', type:'Mountains', emoji:'🏔️', rating:4.9, minBudget:800, recommended:2000, bestSeason:'Oct-Jun' },
  { name:'Shimla', state:'Himachal Pradesh', type:'Mountains', emoji:'❄️', rating:4.7, minBudget:900, recommended:2200, bestSeason:'Oct-Jun' },
  { name:'Spiti Valley', state:'Himachal Pradesh', type:'Adventure', emoji:'🏍️', rating:4.8, minBudget:1200, recommended:2500, bestSeason:'May-Oct' },
  { name:'Rishikesh', state:'Uttarakhand', type:'Adventure', emoji:'🚣', rating:4.8, minBudget:500, recommended:1000, bestSeason:'Sep-Jun' },
  { name:'Nainital', state:'Uttarakhand', type:'Mountains', emoji:'🏞️', rating:4.7, minBudget:900, recommended:2200, bestSeason:'Mar-Jun' },
  { name:'Leh-Ladakh', state:'Ladakh', type:'Mountains', emoji:'🏍️', rating:4.9, minBudget:1500, recommended:3500, bestSeason:'May-Sep' },
  { name:'Srinagar', state:'Jammu and Kashmir', type:'Nature', emoji:'🚤', rating:4.9, minBudget:1200, recommended:3000, bestSeason:'Apr-Oct' },
  { name:'Darjeeling', state:'West Bengal', type:'Mountains', emoji:'🚂', rating:4.8, minBudget:900, recommended:2200, bestSeason:'Mar-Jun' },
  { name:'Gangtok', state:'Sikkim', type:'Mountains', emoji:'🏔️', rating:4.8, minBudget:1000, recommended:2500, bestSeason:'Mar-Jun' },
  { name:'Shillong', state:'Meghalaya', type:'Nature', emoji:'🌧️', rating:4.8, minBudget:900, recommended:2200, bestSeason:'Oct-May' },
  { name:'Kaziranga', state:'Assam', type:'Adventure', emoji:'🦏', rating:4.8, minBudget:1000, recommended:2500, bestSeason:'Nov-Apr' },
  { name:'Puri', state:'Odisha', type:'Beach', emoji:'🌊', rating:4.7, minBudget:700, recommended:1800, bestSeason:'Oct-Mar' },
  { name:'Bodh Gaya', state:'Bihar', type:'Heritage', emoji:'☸️', rating:4.8, minBudget:600, recommended:1500, bestSeason:'Oct-Mar' },
  { name:'Kutch', state:'Gujarat', type:'Desert', emoji:'🏜️', rating:4.8, minBudget:1000, recommended:2500, bestSeason:'Nov-Feb' },
  { name:'Gir National Park', state:'Gujarat', type:'Adventure', emoji:'🦁', rating:4.7, minBudget:1000, recommended:2500, bestSeason:'Dec-Mar' },
  { name:'Khajuraho', state:'Madhya Pradesh', type:'Heritage', emoji:'🛕', rating:4.8, minBudget:700, recommended:1800, bestSeason:'Oct-Mar' },
  { name:'Pachmarhi', state:'Madhya Pradesh', type:'Nature', emoji:'🌲', rating:4.7, minBudget:900, recommended:2200, bestSeason:'Oct-Jun' },
  { name:'Chitrakote Falls', state:'Chhattisgarh', type:'Nature', emoji:'💦', rating:4.7, minBudget:700, recommended:1800, bestSeason:'Jul-Feb' },
  { name:'Pondicherry', state:'Puducherry', type:'Beach', emoji:'🏖️', rating:4.7, minBudget:900, recommended:2200, bestSeason:'Oct-Mar' },
  { name:'Port Blair', state:'Andaman and Nicobar Islands', type:'Beach', emoji:'🏝️', rating:4.8, minBudget:1800, recommended:4000, bestSeason:'Oct-May' },
  { name:'Havelock Island', state:'Andaman and Nicobar Islands', type:'Beach', emoji:'🏝️', rating:4.9, minBudget:2000, recommended:4500, bestSeason:'Oct-May' }
];

const stays = [
  { name:'Budget Hostel', location:'Any City', type:'Hostel', price:400, verified:true, rating:4.1 },
  { name:'Student PG Stay', location:'Any City', type:'PG', price:500, verified:true, rating:4.0 },
  { name:'Budget Hotel', location:'Any City', type:'Budget Hotel', price:900, verified:true, rating:4.2 },
  { name:'Dharamshala / Pilgrim Stay', location:'Pilgrimage Cities', type:'Dharamshala', price:250, verified:true, rating:4.0 },
  { name:'Camping Stay', location:'Hill / Adventure Places', type:'Camping', price:800, verified:true, rating:4.3 }
];

const discounts = [
  { title:'IRCTC Student Concession', category:'Transport', offer:'Student concession where eligible', requirement:'Valid college ID' },
  { title:'Student Travel Card', category:'Transport', offer:'Travel benefits depending on provider', requirement:'Student ID + age proof' },
  { title:'ASI Monuments Student Entry', category:'Monuments', offer:'Student entry benefits at selected monuments', requirement:'College ID' },
  { title:'Museum Student Ticket', category:'Museums', offer:'Low-cost entry at selected museums', requirement:'Student ID' },
  { title:'State Bus Student Pass', category:'Transport', offer:'State-wise bus concession if eligible', requirement:'State eligibility' },
  { title:'Food Coupons', category:'Food', offer:'Budget meal deals from apps/restaurants', requirement:'Offer availability' }
];

router.get('/destinations', (req, res) => {
  const { type, budget, state, place } = req.query;
  let list = [...destinations];
  const qPlace = String(place || '').trim().toLowerCase();
  const qState = String(state || '').trim().toLowerCase();
  if (qPlace) list = list.filter(d => d.name.toLowerCase().includes(qPlace));
  if (type && type !== 'All') list = list.filter(d => d.type.toLowerCase() === String(type).toLowerCase());
  if (qState) list = list.filter(d => d.state.toLowerCase().includes(qState));
  if (budget) list = list.filter(d => d.minBudget <= Number(budget));

  if (list.length === 0 && (qPlace || qState)) {
    const name = place || 'Custom Destination';
    const st = state || 'India';
    list = [{ name, state: st, type: type && type !== 'All' ? type : 'Nature', emoji:'📍', rating:4.5, minBudget: Number(budget) || 800, recommended: Math.max(Number(budget) || 2000, 1200), bestSeason:'Oct-Mar', custom:true }];
  }
  res.json(list);
});

router.get('/stays', (req, res) => {
  const { type, location, maxPrice } = req.query;
  let list = stays.map(s => location ? {...s, location} : s);
  if (type && type !== 'All') list = list.filter(s => s.type.toLowerCase() === String(type).toLowerCase());
  if (maxPrice) list = list.filter(s => s.price <= Number(maxPrice));
  res.json(list);
});

router.get('/discounts', (req, res) => {
  const { category } = req.query;
  const list = category && category !== 'All' ? discounts.filter(d => d.category === category) : discounts;
  res.json(list);
});

router.post('/expense-split', (req, res) => {
  const { expenses = [], members = [] } = req.body;
  if (!Array.isArray(members) || members.length < 2) return res.status(400).json({ message:'Enter at least 2 members' });
  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const perPerson = Math.round(total / members.length);
  const paid = Object.fromEntries(members.map(m => [m, 0]));
  expenses.forEach(e => { paid[e.paidBy] = (paid[e.paidBy] || 0) + Number(e.amount || 0); });
  const balances = members.map(name => ({ name, paid: paid[name] || 0, share: perPerson, balance: (paid[name] || 0) - perPerson }));
  res.json({ total, perPerson, balances });
});

export default router;
