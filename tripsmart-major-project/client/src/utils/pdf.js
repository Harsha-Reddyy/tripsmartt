import jsPDF from 'jspdf';
export function downloadTripPdf(plan){
  const doc = new jsPDF(); let y=15;
  doc.setFontSize(18); doc.text('TripSmart AI Trip Report', 14, y); y+=12;
  doc.setFontSize(11); doc.text(`Destination: ${plan.destination}`, 14, y); y+=8;
  doc.text(`Summary: ${plan.summary}`, 14, y, { maxWidth: 180 }); y+=16;
  doc.text('Budget Breakdown:', 14, y); y+=8;
  Object.entries(plan.budgetBreakdown || {}).forEach(([k,v])=>{ doc.text(`${k}: Rs.${v}`, 18, y); y+=7; });
  y+=4; doc.text('Itinerary:',14,y); y+=8;
  (plan.itinerary || []).forEach(day=>{ doc.text(`Day ${day.day}: ${day.morning} | ${day.afternoon} | ${day.evening}`, 18, y, { maxWidth: 175 }); y+=16; if(y>270){doc.addPage(); y=15;} });
  doc.save('tripsmart-trip-report.pdf');
}
