export function buildRuleBasedPlan(input, destinations = [], hotels = []) {
  const days = Math.max(1, Number(input.days || 3));
  const budget = Number(input.budget || 10000);
  const travelers = Math.max(1, Number(input.travelers || 1));
  const interests = Array.isArray(input.interests) ? input.interests : String(input.interests || '').split(',').map(i => i.trim()).filter(Boolean);
  const perDay = Math.round(budget / days);
  const destination = input.destination || recommendDestination(interests, budget, destinations);

  const hotelBudget = Math.round(budget * 0.35);
  const transportBudget = Math.round(budget * 0.25);
  const foodBudget = Math.round(budget * 0.2);
  const activityBudget = Math.round(budget * 0.15);
  const emergencyBudget = budget - hotelBudget - transportBudget - foodBudget - activityBudget;

  const itinerary = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    morning: i === 0 ? `Travel from ${input.source || 'your city'} to ${destination}` : `Visit a popular ${interests[0] || 'local'} attraction`,
    afternoon: `Explore ${destination} local experiences and food spots`,
    evening: i === days - 1 ? 'Shopping, return preparation, and budget review' : 'Relax, sunset point, cafe, or cultural walk',
    estimatedCost: perDay
  }));

  const matchedHotels = hotels.filter(h => h.location?.toLowerCase().includes(destination.toLowerCase())).slice(0, 3);

  return {
    destination,
    summary: `${days}-day personalized trip plan for ${travelers} traveler(s) from ${input.source || 'your city'} to ${destination}.`,
    budgetBreakdown: {
      transport: transportBudget,
      hotels: hotelBudget,
      food: foodBudget,
      activities: activityBudget,
      emergency: emergencyBudget
    },
    itinerary,
    recommendedHotels: matchedHotels.length ? matchedHotels : [
      { name: 'Budget Stay', location: destination, pricePerNight: Math.round(hotelBudget / days), rating: 4.1 },
      { name: 'Comfort Hotel', location: destination, pricePerNight: Math.round((hotelBudget / days) * 1.3), rating: 4.4 }
    ],
    travelTips: [
      'Book transport early to reduce cost.',
      'Keep 10% of budget for emergency expenses.',
      'Check weather before final booking.',
      'Use maps to group nearby attractions day-wise.'
    ]
  };
}

function recommendDestination(interests, budget, destinations) {
  if (destinations.length) {
    const found = destinations.find(d =>
      d.avgBudget <= budget && interests.some(i => d.category?.toLowerCase().includes(i.toLowerCase()))
    );
    if (found) return found.name;
    return destinations.sort((a, b) => Math.abs(a.avgBudget - budget) - Math.abs(b.avgBudget - budget))[0]?.name || 'Custom Destination';
  }
  if (budget < 6000) return 'Nearby Weekend Destination';
  if (interests.join(' ').toLowerCase().includes('beach')) return 'Goa or Pondicherry';
  if (interests.join(' ').toLowerCase().includes('nature')) return 'Coorg or Araku Valley';
  return 'Best Matching Indian Destination';
}
