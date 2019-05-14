import { getManager, getRepository, SelectQueryBuilder } from 'typeorm';
import { SoapService, SoapOperation } from 'soap-decorators';
import { Plane } from '../entities/plane';
import { FlightOutput } from '../models/outputs/FlightOutput';
import { FlightInput } from '../models/inputs/FlightInput';
import { Flight } from '../entities/flight';
import { IdInput } from '../models/inputs/IdInput';
import { FlightListOutput } from '../models/outputs/FlightListOutput';
import { ResultOutput } from '../models/outputs/ResultOutput';
import { PlaneOutput } from '../models/outputs/PlaneOutput';
import { SearchInput } from '../models/inputs/SearchInput';

@SoapService({
  portName: 'FlightPort',
  serviceName: 'FlightService'
})
export class FlightController {
  @SoapOperation(FlightListOutput)
  async list(data: IdInput): Promise<FlightListOutput> {
    const flights: Flight[] = await getRepository(Flight)
      .createQueryBuilder('flight')
      .leftJoinAndSelect('flight.plane', 'plane')
      .getMany();
    const output = new FlightListOutput(flights);
    return output;
  }

  @SoapOperation(FlightOutput)
  async create(data: FlightInput): Promise<FlightOutput> {
    const entityManager = getManager();
    const flight = data.toFlight();
    let output = new FlightOutput();

    const plane: Plane = await getRepository(Plane)
      .createQueryBuilder('plane')
      .where('plane.id = :id', { id: flight.plane })
      .getOne();

    if (plane) {
      const { identifiers } = await entityManager.insert(Flight, flight);
      const id = identifiers[identifiers.length - 1].id;
      if (id > 0) {
        flight.id = id;
        output = new FlightOutput(flight);
      }
    }
    return output;
  }

  @SoapOperation(FlightOutput)
  async detail(data: IdInput): Promise<FlightOutput> {
    const flight: Flight = await getRepository(Flight)
      .createQueryBuilder('flight')
      .where('flight.id = :id', { id: data.id })
      .leftJoinAndSelect('flight.plane', 'plane')
      .getOne();
    const output = new FlightOutput(flight);
    return output;
  }

  @SoapOperation(FlightOutput)
  async update(data: FlightInput): Promise<FlightOutput> {
    const entityManager = getManager();
    const flight = await entityManager.findOne(Flight, data.id);
    let output = new FlightOutput();
    if (flight) {
      await entityManager.update(Flight, flight.id, data.toFlight());
      output = new FlightOutput(data.toFlight());
      const plane = await entityManager.findOne(Plane, data.plane);
      output.plane = new PlaneOutput(plane);
    }
    return output;
  }

  @SoapOperation(ResultOutput)
  async delete(data: IdInput): Promise<ResultOutput> {
    const entityManager = getManager();
    const { affected } = await entityManager.delete(Flight, data.id);
    const output = new ResultOutput();
    output.result = affected === 1 ? 'success' : 'failed';
    return output;
  }

  @SoapOperation(FlightListOutput)
  async search(data: SearchInput): Promise<FlightListOutput> {
    const query: SelectQueryBuilder<Flight> = getRepository(Flight)
      .createQueryBuilder('flight')
      .leftJoinAndSelect('flight.plane', 'plane')
      .leftJoin('flight.tickets', 'ticket')
      .where('flight."date" > current_date')
      .groupBy('flight.id')
      .addGroupBy('flight.date')
      .addGroupBy('flight.from')
      .addGroupBy('flight.to')
      .addGroupBy('flight.departureTime')
      .addGroupBy('flight.duration')
      .addGroupBy('flight.distance')
      .addGroupBy('plane.id')
      .addGroupBy('plane.name')
      .addGroupBy('plane.pricePerKm')
      .addGroupBy('plane.seats')
      .addGroupBy('plane.seatsInRow')
      .addGroupBy('plane.seatsInBusinessClass')
      .addGroupBy('plane.luggageLimit')
      .addGroupBy('plane.handLuggageLimit')
      .having('COUNT(ticket.id) < plane.seats');
    if (data.business) {
      if (data.window) {
        query.andHaving(
          '(SELECT COUNT(t.id) FROM ticket t WHERE t.business = TRUE AND t.window = TRUE AND t."flightId" = flight.id) < (plane.seatsInBusinessClass / plane.seatsInRow)'
        );
      } else {
        query.andHaving(
          '(SELECT COUNT(t.id) FROM ticket t WHERE t.business = TRUE AND t."flightId" = flight.id) < plane.seatsInBusinessClass'
        );
      }
    } else if (data.window) {
      query.andHaving(
        '(SELECT COUNT(t.id) FROM ticket t WHERE t.window = TRUE AND t."flightId" = flight.id) < ((plane.seats - plane.seatsInBusinessClass) / plane.seatsInRow)'
      );
    }
    if (!!data.from) {
      query.andWhere('flight."from" ilike :from', { from: data.from });
    }
    if (!!data.to) {
      query.andWhere('flight."to" ilike :to', { to: data.to });
    }
    if (!!data.date) {
      query.andWhere('flight."date" = :date', { date: new Date(data.date) });
    }
    console.log(data)
    const flights: Flight[] = await query.getMany();
    const output = new FlightListOutput(flights);
    console.log(output)
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

  @SoapOperation(ResultOutput)
  f(data: IdInput): ResultOutput {
    const output = new ResultOutput();
    return output;
  }
}
