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
