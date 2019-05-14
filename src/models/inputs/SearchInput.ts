import { XSDComplexType, XSDElement } from 'xsd-decorators';

@XSDComplexType
export class SearchInput {
  @XSDElement
  date: string;

  @XSDElement
  from: string;

  @XSDElement
  to: string;

  @XSDElement
  window: boolean;

  @XSDElement
  business: boolean;
}
