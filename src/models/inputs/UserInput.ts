import { XSDComplexType, XSDElement } from 'xsd-decorators';
import { User } from '../../entities/user';
import { Group } from '../../enums/group';

@XSDComplexType
export class UserInput {
  @XSDElement
  id: number;

  @XSDElement
  firstName: string;

  @XSDElement
  lastName: string;

  @XSDElement
  email: string;

  @XSDElement
  password: string;

  toUser(): User {
    const user = new User();
    user.id = this.id;
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.email = this.email;
    user.password = this.password;
    user.group = Group.Client;
    return user;
  }
}