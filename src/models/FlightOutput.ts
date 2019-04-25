import { XSDComplexType, XSDElement } from 'xsd-decorators';
import { PlaneOutput } from './PlaneOutput';

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
}

@XSDComplexType
export class FlightResultOutput {
  @XSDElement
  result: string;
}

@XSDComplexType
export class FlightListOutput {
  @XSDElement({
    type: FlightOutput
  })
  flights: FlightOutput[];
}
