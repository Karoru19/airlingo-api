import { XSDComplexType, XSDElement } from "xsd-decorators";
import { FlightOutput } from "./FlightOutput";


@XSDComplexType
export class FlightListOutput {
  @XSDElement({
    type: FlightOutput
  })
  flights: FlightOutput[];
}