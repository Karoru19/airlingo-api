import { XSDComplexType, XSDElement } from "xsd-decorators";
import { PlaneOutput } from "./PlaneOutput";
import { Plane } from "../../entities/plane";


@XSDComplexType
export class PlaneListOutput {
  @XSDElement({
    type: PlaneOutput
  })
  planes: PlaneOutput[];

  constructor(planes?: Plane[]) {
    if (planes) {
      this.planes = planes.map(plane => new PlaneOutput(plane));
    }
  }
}