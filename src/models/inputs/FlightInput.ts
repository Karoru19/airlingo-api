import { XSDComplexType, XSDElement } from 'xsd-decorators';
import { Flight } from '../../entities/flight';

@XSDComplexType
export class FlightInput {
  @XSDElement
  id: number;

  @XSDElement
  date: Date;

  @XSDElement
  from: string;

  @XSDElement
  to: string;

  @XSDElement
  departureTime: string;

  @XSDElement
  duration: number;

  @XSDElement
  distance: number;

  @XSDElement
  plane: number;

  toFlight(): Flight {
    const flight = new Flight();
    flight.id = this.id;
    flight.from = this.from;
    flight.to = this.to;
    flight.departureTime = this.departureTime;
    flight.date = this.date;
    flight.distance = this.distance;
    flight.duration = this.duration;
    flight.plane = this.plane;
    return flight;
  }
}
