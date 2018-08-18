import { IRepository } from '@dialexa/knex-plus';
import { inject, injectable } from "inversify";
import * as _ from 'lodash';
import "reflect-metadata";

import { IUser } from '@src/core';
import { isConflictError, UserAlreadyExistsError } from '@src/lib/errors';
import { go } from '@src/lib/utils';
import Vault from '@src/lib/vault';
import { Types as RepositoryTypes } from '@src/repositories';
import { IUserService } from '@src/services/interfaces';

@injectable()
export default class UserService implements IUserService {
  @inject(RepositoryTypes.UserRepository)
  private userRepository: IRepository<IUser>

  public async create(params: { email: string, username: string, password: string }) : Promise<void> {
    const { email, username, password } = params;

    const vault = new Vault();
    const { salt, secret } = await vault.encrypt(password);

    const [err] = await go(this.userRepository.create({ email, username, salt, secret }));

    if (isConflictError(err)) { throw new UserAlreadyExistsError(); }
  }

  public async find(id: string) : Promise<IUser> {
    return await this.userRepository.findBy({ id });
  }

  public async findByLogin(params: { email?: string, username?: string }) : Promise<IUser> {
    const identifier = _.pickBy(params, _.identity);

    return await this.userRepository.findBy(identifier);
  }

  public async list() : Promise<IUser[]> {
    return await this.userRepository.list();
  }
}
