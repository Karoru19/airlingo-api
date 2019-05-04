import { XSDComplexType, XSDElement } from "xsd-decorators";


@XSDComplexType
export class ResultOutput {
  @XSDElement
  result: string;
}