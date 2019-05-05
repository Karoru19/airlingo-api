import { XSDComplexType, XSDElement } from 'xsd-decorators';
import { Plane } from '../../entities/plane';

@XSDComplexType
export class PlaneInput {
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

  toPlane(): Plane {
    const plane = new Plane();
    plane.id = this.id;
    plane.name = this.name;
    plane.pricePerKm = this.pricePerKm;
    plane.seats = this.seats;
    plane.seatsInRow = this.seatsInRow;
    plane.seatsInBusinessClass = this.seatsInBusinessClass;
    plane.luggageLimit = this.luggageLimit;
    plane.handLuggageLimit = this.handLuggageLimit;
    return plane;
  }
}
