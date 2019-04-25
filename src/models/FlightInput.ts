import { XSDComplexType, XSDElement } from 'xsd-decorators';

@XSDComplexType
export class FlightInput {
  @XSDElement
  date: Date;

  @XSDElement
  from: string;

  @XSDElement
  to: string;

  @XSDElement
  duration: number;

  @XSDElement
  distance: number;

  @XSDElement
  plane: number;
}

@XSDComplexType
export class FlightExtendedInput {
  @XSDElement
  id: number;

  @XSDElement
  date: Date;

  @XSDElement
  from: string;

  @XSDElement
  to: string;

  @XSDElement
  duration: number;

  @XSDElement
  distance: number;

  @XSDElement
  plane: number;
}

@XSDComplexType
export class FlightIdInput {
  @XSDElement
  id: number;
}
