import { Ticket } from '../entities/ticket';
import { dateFormat } from './date-format';
import { Flight } from '../entities/flight';
import { resolve } from 'bluebird';
const markdownpdf = require('markdown-pdf');

export async function generatePdf(
  ticket: Ticket,
  flight: Flight
): Promise<string> {
  const output = `assets/tickets/ticket-${ticket.id}.pdf`;
  if (typeof flight.plane === 'number') return '';
  let markdownString =
    `# Ticket #${ticket.id}\n\n` +
    '## Personal Info\n\n' +
    `**First Name:** ${ticket.firstName}\n\n` +
    `**Last Name:** ${ticket.lastName}\n\n` +
    `**Email:** ${ticket.email}\n\n` +
    '## Flight Info\n\n' +
    `**From:** ${flight.from}\n\n` +
    `**To:** ${flight.to}\n\n` +
    `**Date:** ${dateFormat(flight.date)}\n\n` +
    `**Duration:** ${flight.duration} h\n\n` +
    `**Distance:** ${flight.distance} km\n\n` +
    '### Plane\n\n' +
    `**Name:** ${flight.plane.name}\n\n` +
    `**Luggage Limit:** ${flight.plane.luggageLimit} kg\n\n` +
    `**Hand Luggage Limit:** ${flight.plane.handLuggageLimit} kg\n\n` +
    '## Finance Info\n\n' +
    `**Price:** $${ticket.price}\n\n` +
    `**Discount:** ${ticket.discount}%`;
  return new Promise<string>((resolve, reject) => {
    try {
      markdownpdf()
        .from.string(markdownString)
        .to(output, () => resolve(output));
    } catch (error) {
      reject(error);
    }
  });
}
