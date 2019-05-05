import { getManager, getRepository } from 'typeorm';
import { SoapService, SoapOperation } from 'soap-decorators';
import { IdInput } from '../models/inputs/IdInput';
import { UserInput } from '../models/inputs/UserInput';
import { UserOuput } from '../models/outputs/UserOutput';
import { User } from '../entities/user';
import { LoginInput } from '../models/inputs/LoginInput';

@SoapService({
  portName: 'UserPort',
  serviceName: 'UserService'
})
export class UserController {
  @SoapOperation(UserOuput)
  async register(data: UserInput): Promise<UserOuput> {
    const entityManager = getManager();
    const user = data.toUser();
    let output = new UserOuput();
    const { identifiers } = await entityManager.insert(User, user);
    const id = identifiers[identifiers.length - 1].id;
    if (id > 0) {
      user.id = id;
      output = new UserOuput(user);
    }
    return output;
  }

  @SoapOperation(UserOuput)
  async login(data: LoginInput): Promise<UserOuput> {
    const user: User = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.email ilike :email', { email: data.email })
      .andWhere('user.passsword like :password', { password: data.password })
      .getOne();
    const output = new UserOuput(user);
    return output;
  }

  @SoapOperation(UserOuput)
  async detail(): Promise<UserOuput> {
    const output = new UserOuput();
    return output;
  }
}
