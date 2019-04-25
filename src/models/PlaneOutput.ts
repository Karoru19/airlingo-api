import { XSDComplexType, XSDElement } from 'xsd-decorators';

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
}

@XSDComplexType
export class PlaneResultOutput {
  @XSDElement
  result: string;
}

@XSDComplexType
export class PlaneListOutput {
  @XSDElement({
    type: PlaneOutput
  })
  result: PlaneOutput[];
}
