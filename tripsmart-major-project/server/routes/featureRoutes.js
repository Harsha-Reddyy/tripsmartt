import express from 'express';
const router = express.Router();

const destinations = [
  { name:'Goa', state:'Goa', type:'Beach', emoji:'🏖️', rating:4.8, minBudget:1500, recommended:3000, bestSeason:'Nov-Feb' },
  { name:'Manali', state:'Himachal Pradesh', type:'Mountains', emoji:'🏔️', rating:4.9, minBudget:800, recommended:2000, bestSeason:'Oct-Jun' },
  { name:'Varanasi', state:'Uttar Pradesh', type:'Heritage', emoji:'🕌', rating:4.7, minBudget:600, recommended:1200, bestSeason:'Oct-Mar' },
  { name:'Coorg', state:'Karnataka', type:'Nature', emoji:'🌿', rating:4.6, minBudget:1000, recommended:2500, bestSeason:'Sep-Mar' },
  { name:'Rishikesh', state:'Uttarakhand', type:'Adventure', emoji:'🚣', rating:4.8, minBudget:500, recommended:1000, bestSeason:'Sep-Jun' },
  { name:'Jaisalmer', state:'Rajasthan', type:'Desert', emoji:'🐪', rating:4.7, minBudget:700, recommended:1500, bestSeason:'Nov-Feb' },
  { name:'Leh-Ladakh', state:'Ladakh', type:'Mountains', emoji:'🏍️', rating:4.9, minBudget:1500, recommended:3500, bestSeason:'May-Sep' },
  { name:'Mysuru', state:'Karnataka', type:'Heritage', emoji:'🏰', rating:4.5, minBudget:600, recommended:1200, bestSeason:'Oct-Feb' },
  { name:'Hampi', state:'Karnataka', type:'Heritage', emoji:'🛕', rating:4.7, minBudget:500, recommended:1000, bestSeason:'Oct-Feb' },
  { name:'Araku Valley', state:'Andhra Pradesh', type:'Nature', emoji:'🌄', rating:4.6, minBudget:700, recommended:1600, bestSeason:'Oct-Mar' }
];

const stays = [
  { name:'Zostel Goa', location:'Goa', type:'Hostel', price:350, verified:true, rating:4.4 },
  { name:'Backpacker’s Inn Manali', location:'Manali', type:'Hostel', price:400, verified:true, rating:4.3 },
  { name:'Ganges View PG', location:'Varanasi', type:'PG', price:280, verified:true, rating:4.1 },
  { name:'Rishikesh Yog Hostel', location:'Rishikesh', type:'Hostel', price:299, verified:true, rating:4.2 },
  { name:'Desert Camp Jaisalmer', location:'Jaisalmer', type:'Camping', price:800, verified:true, rating:4.5 },
  { name:'Dharamshala Pilgrim Niwas', location:'Varanasi', type:'Dharamshala', price:150, verified:true, rating:4.0 },
  { name:'Gokulam Mysuru PG', location:'Mysuru', type:'PG', price:350, verified:false, rating:4.0 },
  { name:'Hampi Guesthouse', location:'Hampi', type:'Budget Hotel', price:450, verified:true, rating:4.2 }
];

const discounts = [
  { title:'IRCTC Student Concession', category:'Transport', offer:'Up to 50% off', requirement:'Valid college ID' },
  { title:'Student Travel Card', category:'Transport', offer:'Up to 30% off', requirement:'Student ID + age proof' },
  { title:'ASI Monuments Student Entry', category:'Monuments', offer:'Free / discounted entry', requirement:'College ID' },
  { title:'National Museum Student Ticket', category:'Museums', offer:'Low-cost entry', requirement:'Student ID' },
  { title:'HRTC Student Bus Pass', category:'Transport', offer:'Up to 50% off', requirement:'State eligibility' },
  { title:'BookMyShow Student Offers', category:'Entertainment', offer:'Up to 25% off', requirement:'Offer availability' },
  { title:'IndiGo Student Fares', category:'Transport', offer:'Special baggage + fare benefit', requirement:'Student verification' },
  { title:'Local Food Coupons', category:'Food', offer:'Budget meal deals', requirement:'App coupons' }
];

router.get('/destinations', (req, res) => {
  const { type, budget, state } = req.query;
  let list = [...destinations];
  if (type && type !== 'All') list = list.filter(d => d.type.toLowerCase() === type.toLowerCase());
  if (state) list = list.filter(d => d.state.toLowerCase().includes(String(state).toLowerCase()));
  if (budget) list = list.filter(d => d.minBudget <= Number(budget));
  res.json(list);
});

router.get('/stays', (req, res) => {
  const { type, location, maxPrice } = req.query;
  let list = [...stays];
  if (type && type !== 'All') list = list.filter(s => s.type.toLowerCase() === type.toLowerCase());
  if (location) list = list.filter(s => s.location.toLowerCase().includes(String(location).toLowerCase()));
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
  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const people = members.length || 1;
  const perPerson = Math.round(total / people);
  const paid = Object.fromEntries(members.map(m => [m, 0]));
  expenses.forEach(e => { paid[e.paidBy] = (paid[e.paidBy] || 0) + Number(e.amount || 0); });
  const balances = members.map(name => ({ name, paid: paid[name] || 0, share: perPerson, balance: (paid[name] || 0) - perPerson }));
  res.json({ total, perPerson, balances });
});

export default router;
