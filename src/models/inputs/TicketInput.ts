import { XSDComplexType, XSDElement } from 'xsd-decorators';
import { Ticket } from '../../entities/ticket';

@XSDComplexType
export class TicketInput {
  @XSDElement
  firstName: string;

  @XSDElement
  lastName: string;

  @XSDElement
  email: string;

  @XSDElement
  user: number;

  @XSDElement
  flight: number;

  @XSDElement
  price: number;

  @XSDElement
  discount: number;

  @XSDElement
  window: boolean;

  @XSDElement
  business: boolean;

  toTicket(): Ticket {
    const ticket = new Ticket();
    ticket.firstName = this.firstName;
    ticket.lastName = this.lastName;
    ticket.email = this.email;
    ticket.user = this.user;
    ticket.flight = this.flight;
    ticket.price = this.price;
    ticket.discount = this.discount;
    ticket.business = this.business;
    ticket.window = this.window;
    return ticket;
  }
}
