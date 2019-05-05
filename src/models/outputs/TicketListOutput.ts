import { XSDComplexType, XSDElement } from 'xsd-decorators';
import { UserOutput } from './UserOutput';
import { User } from '../../entities/user';
import { TicketOutput } from './TicketOutput';
import { Ticket } from '../../entities/ticket';

@XSDComplexType
export class TicketListOutput {
  @XSDElement({
    type: TicketOutput
  })
  tickets: TicketOutput[];

  constructor(tickets?: Ticket[]) {
    if (tickets) {
      this.tickets = tickets.map(ticket => new TicketOutput(ticket));
    }
  }
}
