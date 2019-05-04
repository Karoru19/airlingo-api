import { XSDComplexType, XSDElement } from "xsd-decorators";


@XSDComplexType
export class IdInput {
  @XSDElement
  id: number;
}