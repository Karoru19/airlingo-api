import { XSDComplexType, XSDElement } from "xsd-decorators";
import { FlightOutput } from "./FlightOutput";
import { Flight } from "../../entities/flight";


@XSDComplexType
export class FlightListOutput {
  @XSDElement({
    type: FlightOutput
  })
  flights: FlightOutput[];

  constructor(flights?: Flight[]) {
    if (flights) {
      this.flights = flights.map(flight => new FlightOutput(flight));
    }
  }
}