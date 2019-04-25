import { XSDComplexType, XSDElement } from 'xsd-decorators';

@XSDComplexType
export class PlaneInput {
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

@XSDComplexType
export class PlaneExtendedInput {
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

@XSDComplexType
export class PlaneIdInput {
  @XSDElement
  id: number;
}
