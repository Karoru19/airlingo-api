import { XSDComplexType, XSDElement } from 'xsd-decorators';
import { FlightOutput } from './FlightOutput';
import { Ticket } from '../../entities/ticket';
import { Flight } from '../../entities/flight';
import { fileToBase64 } from '../../shared/file-to-base64';

@XSDComplexType
export class TicketOutput {
  @XSDElement
  id: number;

  @XSDElement
  firstName: string;

  @XSDElement
  lastName: string;

  @XSDElement
  email: string;

  @XSDElement
  flight: FlightOutput;

  @XSDElement
  price: number;

  @XSDElement
  discount: number;

  @XSDElement
  window: boolean;

  @XSDElement
  business: boolean;

  @XSDElement
  pdf: string;

  constructor(ticket?: Ticket) {
    if (!!ticket) {
      this.id = ticket.id;
      this.firstName = ticket.firstName;
      this.lastName = ticket.lastName;
      this.email = ticket.email;
      if (typeof ticket.flight !== 'number') {
        this.flight = new FlightOutput(ticket.flight);
      }
      this.price = ticket.price;
      this.discount = ticket.discount;
      this.window = ticket.window;
      this.business = ticket.business;
      this.pdf = fileToBase64(ticket.pdf);
    }
  }
}
