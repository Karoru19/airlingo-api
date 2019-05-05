import { XSDComplexType, XSDElement } from 'xsd-decorators';
import { PlaneOutput } from './PlaneOutput';
import { Flight } from '../../entities/flight';
import { dateFormat } from '../../shared/date-format';

@XSDComplexType
export class FlightOutput {
  @XSDElement
  id: number;

  @XSDElement
  date: string;

  @XSDElement
  from: string;

  @XSDElement
  to: string;

  @XSDElement
  duration: number;

  @XSDElement
  distance: number;

  @XSDElement
  plane: PlaneOutput;

  constructor(flight?: Flight) {
    if (flight) {
      this.id = flight.id;
      this.date = dateFormat(flight.date);
      this.from = flight.from;
      this.to = flight.to;
      this.duration = flight.duration;
      this.distance = flight.distance;
      if (typeof (flight.plane) !== "number") {
        this.plane = new PlaneOutput(flight.plane);
      }
    }
  }
}
