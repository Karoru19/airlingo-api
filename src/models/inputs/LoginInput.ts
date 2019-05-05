import { XSDComplexType, XSDElement } from 'xsd-decorators';

@XSDComplexType
export class LoginInput {
  @XSDElement
  email: string;

  @XSDElement
  password: string;
}