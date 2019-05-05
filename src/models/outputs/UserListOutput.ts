import { XSDComplexType, XSDElement } from 'xsd-decorators';
import { UserOutput } from './UserOutput';
import { User } from '../../entities/user';

@XSDComplexType
export class UserListOutput {
  @XSDElement({
    type: UserOutput
  })
  users: UserOutput[];

  constructor(users?: User[]) {
    if (users) {
      this.users = users.map(user => new UserOutput(user));
    }
  }
}
