import { getManager, getRepository } from 'typeorm';
import { SoapService, SoapOperation } from 'soap-decorators';
import { Plane } from '../entities/plane';
import { FlightOutput } from '../models/outputs/FlightOutput';
import { FlightInput } from '../models/inputs/FlightInput';
import { Flight } from '../entities/flight';
import { dateFormat } from '../shared/date-format';
import { PlaneOutput } from '../models/outputs/PlaneOutput';
import { IdInput } from '../models/inputs/IdInput';
import { FlightListOutput } from '../models/outputs/FlightListOutput';
import { ResultOutput } from '../models/outputs/ResultOutput';

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
    const output = new FlightListOutput();
    output.flights = [];
    flights.map(flight => {
      const flightOutput = new FlightOutput();
      Object.keys(flight).map(key => (flightOutput[key] = flight[key]));
      flightOutput.date = dateFormat(flight.date);
      output.flights.push(flightOutput);
    });
    return output;
  }

  @SoapOperation(FlightOutput)
  async create(data: FlightInput): Promise<FlightOutput> {
    const entityManager = getManager();
    const flight = new Flight();
    const output = new FlightOutput();
    Object.keys(data).map(key => (flight[key] = data[key]));

    const plane: Plane = await getRepository(Plane)
      .createQueryBuilder('plane')
      .where('plane.id = :id', { id: flight.plane })
      .getOne();

    if (plane) {
      const { identifiers } = await entityManager.insert(Flight, flight);
      const id = identifiers[identifiers.length - 1].id;
      if (id > 0) {
        Object.keys(flight).map(key => (output[key] = flight[key]));
        output.id = id;
        output.date = dateFormat(flight.date);
        const planeOutput = new PlaneOutput();
        Object.keys(plane).map(key => (planeOutput[key] = plane[key]));
        output.plane = planeOutput;
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
    const output = new FlightOutput();
    if (flight) {
      Object.keys(flight).map(key => (output[key] = flight[key]));
      output.date = dateFormat(flight.date);
    }
    return output;
  }

  @SoapOperation(FlightOutput)
  async update(data: FlightInput): Promise<FlightOutput> {
    const entityManager = getManager();
    const flight = await entityManager.findOne(Flight, data.id);
    const output = new FlightOutput();
    if (flight) {
      Object.keys(data).map(key => (flight[key] = data[key]));
      await entityManager.update(Plane, flight.id, flight);
      Object.keys(flight).map(key => (output[key] = flight[key]));
      output.date = dateFormat(flight.date);
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
}
