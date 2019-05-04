import { XSDComplexType, XSDElement } from 'xsd-decorators';

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
}
