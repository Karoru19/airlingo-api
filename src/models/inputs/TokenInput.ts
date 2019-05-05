import { XSDComplexType, XSDElement } from 'xsd-decorators';

@XSDComplexType
export class TokenInput {
  @XSDElement
  key: string;
}
