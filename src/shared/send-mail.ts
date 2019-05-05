import { Ticket } from '../entities/ticket';

const mailer = require('nodemailer');
const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'javaeepb@gmail.com',
    pass: 'projektna5'
  }
});

export function sendMail(ticket: Ticket): any {
  const mailOptions = {
    from: 'javaeepb@gmail.com',
    to: ticket.email,
    subject: 'Flight Reservation',
    html:
      `<h1>Hello ${ticket.firstName},</h1>` +
      `<p>You made flight reservation #${ticket.id}.</p>` +
      '<p>If you want to check your ticket, below is access token:</p>' +
      `<p>${ticket.token}</p>`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}
