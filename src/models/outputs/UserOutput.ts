import { XSDComplexType, XSDElement } from 'xsd-decorators';
import { User } from '../../entities/user';

@XSDComplexType
export class UserOutput {
  @XSDElement
  id: number;

  @XSDElement
  firstName: string;

  @XSDElement
  lastName: string;

  @XSDElement
  email: string;

  @XSDElement
  group: number;

  // @XSDElement({
  //   type: TicketOutput
  // })
  // tickets: TicketOuput[];

  constructor(user?: User) {
    if (!!user) {
      this.id = user.id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.group = user.group;
    }
  }
}
