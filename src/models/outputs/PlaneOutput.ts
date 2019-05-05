import { XSDComplexType, XSDElement } from 'xsd-decorators';
import { Plane } from '../../entities/plane';

@XSDComplexType
export class PlaneOutput {
  @XSDElement
  id: number;

  @XSDElement
  name: string;

  @XSDElement
  pricePerKm: number;

  @XSDElement
  seats: number;

  @XSDElement
  seatsInRow: number;

  @XSDElement
  seatsInBusinessClass: number;

  @XSDElement
  luggageLimit: number;

  @XSDElement
  handLuggageLimit: number;

  constructor(plane?: Plane) {
    if (plane) {
      this.id = plane.id;
      this.name = plane.name;
      this.pricePerKm = plane.pricePerKm;
      this.seats = plane.seats;
      this.seatsInRow = plane.seatsInRow;
      this.seatsInBusinessClass = plane.seatsInBusinessClass;
      this.luggageLimit = plane.luggageLimit;
      this.handLuggageLimit = plane.handLuggageLimit;
    }
  }
}
