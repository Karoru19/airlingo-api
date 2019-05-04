import { XSDComplexType, XSDElement } from "xsd-decorators";
import { PlaneOutput } from "./PlaneOutput";


@XSDComplexType
export class PlaneListOutput {
  @XSDElement({
    type: PlaneOutput
  })
  planes: PlaneOutput[];
}