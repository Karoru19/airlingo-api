import { getManager, getRepository } from 'typeorm';
import { SoapService, SoapOperation } from 'soap-decorators';
import { IdInput } from '../models/inputs/IdInput';
import { UserInput } from '../models/inputs/UserInput';
import { UserOutput } from '../models/outputs/UserOutput';
import { User } from '../entities/user';
import { LoginInput } from '../models/inputs/LoginInput';
import { UserListOutput } from '../models/outputs/UserListOutput';
import { TicketInput } from '../models/inputs/TicketInput';
import { Ticket } from '../entities/ticket';
import { Flight } from '../entities/flight';
import { FlightOutput } from '../models/outputs/FlightOutput';
import { Plane } from '../entities/plane';
import { PlaneOutput } from '../models/outputs/PlaneOutput';
import { generateToken } from '../shared/generate-token';
import { generatePdf } from '../shared/generate-pdf';
import { TicketOutput } from '../models/outputs/TicketOutput';
import { TicketListOutput } from '../models/outputs/TicketListOutput';
import { TokenInput } from '../models/inputs/TokenInput';
import { sendMail } from '../shared/send-mail';
import { ResultOutput } from '../models/outputs/ResultOutput';

@SoapService({
  portName: 'TicketPort',
  serviceName: 'TicketService'
})
export class TicketController {
  @SoapOperation(TicketOutput)
  async create(data: TicketInput): Promise<TicketOutput> {
    const entityManager = getManager();
    const ticket = data.toTicket();
    let output = new TicketOutput();
    const flight: Flight = await getRepository(Flight)
      .createQueryBuilder('flight')
      .leftJoinAndSelect('flight.plane', 'plane')
      .where('flight.id = :id', { id: ticket.flight })
      .getOne();
    if (!!flight) {
      ticket.token = generateToken();
      const { identifiers } = await entityManager.insert(Ticket, ticket);
      const id = identifiers[identifiers.length - 1].id;
      if (id > 0) {
        ticket.id = id;
        ticket.flight = flight;
        ticket.pdf = await generatePdf(ticket, flight);
        await entityManager.update(Ticket, ticket.id, ticket);
        sendMail(ticket);
        output = new TicketOutput(ticket);
      }
    }
    return output;
  }

  @SoapOperation(TicketListOutput)
  async getByUserId(data: IdInput): Promise<TicketListOutput> {
    let tickets: Ticket[] = [];
    if (Number.isInteger(data.id)) {
      tickets = await getRepository(Ticket)
        .createQueryBuilder('ticket')
        .leftJoinAndSelect('ticket.flight', 'flight')
        .leftJoinAndSelect('flight.plane', 'plane')
        .where('ticket."userId" = :id', { id: data.id })
        .getMany();
    }
    const output = new TicketListOutput(tickets);
    return output;
  }

  @SoapOperation(TicketOutput)
  async getByToken(data: TokenInput): Promise<TicketOutput> {
    let ticket: Ticket = new Ticket();
    if (!!data.key) {
      ticket = await getRepository(Ticket)
        .createQueryBuilder('ticket')
        .leftJoinAndSelect('ticket.flight', 'flight')
        .leftJoinAndSelect('flight.plane', 'plane')
        .where('ticket."token" = :key', { key: data.key })
        .getOne();
    }
    const output = new TicketOutput(ticket);
    return output;
  }

  @SoapOperation(ResultOutput)
  async delete(data: IdInput): Promise<ResultOutput> {
    const entityManager = getManager();
    const ticket: Ticket = await entityManager.findOne(Ticket, data.id);
    const fs = require('fs');
    const { raw, affected } = await entityManager.delete(Ticket, data.id);
    if (affected === 1) {
      fs.unlink(ticket.pdf, () => console.log('Done'));
    }
    const output = new ResultOutput();
    output.result = affected === 1 ? 'success' : 'failed';
    return output;
  }

  @SoapOperation(TicketOutput)
  async detail(data: IdInput): Promise<TicketOutput> {
    const ticket: Ticket = await getRepository(Ticket)
      .createQueryBuilder('ticket')
      .where('ticket.id = :id', { id: data.id })
      .leftJoinAndSelect('ticket.flight', 'flight')
      .leftJoinAndSelect('flight.plane', 'plane')
      .getOne();
    const output = new TicketOutput(ticket);
    return output;
  }

  @SoapOperation(ResultOutput)
  a(data: IdInput): ResultOutput {
    const output = new ResultOutput();
    return output;
  }

  @SoapOperation(ResultOutput)
  b(data: IdInput): ResultOutput {
    const output = new ResultOutput();
    return output;
  }

  @SoapOperation(ResultOutput)
  c(data: IdInput): ResultOutput {
    const output = new ResultOutput();
    return output;
  }

  @SoapOperation(ResultOutput)
  d(data: IdInput): ResultOutput {
    const output = new ResultOutput();
    return output;
  }

  @SoapOperation(ResultOutput)
  e(data: IdInput): ResultOutput {
    const output = new ResultOutput();
    return output;
  }
}
