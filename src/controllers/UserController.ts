import { getManager, getRepository } from 'typeorm';
import { SoapService, SoapOperation } from 'soap-decorators';
import { IdInput } from '../models/inputs/IdInput';
import { UserInput } from '../models/inputs/UserInput';
import { UserOutput } from '../models/outputs/UserOutput';
import { User } from '../entities/user';
import { LoginInput } from '../models/inputs/LoginInput';
import { UserListOutput } from '../models/outputs/UserListOutput';

@SoapService({
  portName: 'UserPort',
  serviceName: 'UserService'
})
export class UserController {
  @SoapOperation(UserOutput)
  async register(data: UserInput): Promise<UserOutput> {
    const entityManager = getManager();
    const user = data.toUser();
    let output = new UserOutput();
    const { identifiers } = await entityManager.insert(User, user);
    const id = identifiers[identifiers.length - 1].id;
    if (id > 0) {
      user.id = id;
      output = new UserOutput(user);
    }
    return output;
  }

  @SoapOperation(UserOutput)
  async login(data: LoginInput): Promise<UserOutput> {
    const user: User = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.email ilike :email', { email: data.email })
      .andWhere('user.password like :password', { password: data.password })
      .getOne();
    const output = new UserOutput(user);
    return output;
  }

  @SoapOperation(UserListOutput)
  async list(id: IdInput): Promise<UserListOutput> {
    const users: User[] = await getRepository(User)
      .createQueryBuilder('user')
      .getMany();
    const output = new UserListOutput(users);
    return output;
  }
}
