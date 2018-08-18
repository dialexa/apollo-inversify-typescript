import { IRepository } from '@dialexa/knex-plus';
import { IAuthToken, IUser } from '@src/core';
import Vault from '@src/lib/vault';
import { Types as RepositoryTypes } from '@src/repositories';
import { IAuthService, IUserService, Types as ServiceTypes } from '@src/services';
import * as crypto from 'crypto';
import * as addSeconds from 'date-fns/add_seconds';
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class AuthService implements IAuthService {
  @inject(RepositoryTypes.AuthTokenRepository)
  private authTokenRepository: IRepository<IAuthToken>;

  @inject(ServiceTypes.UserService)
  private userService: IUserService;

  public async login (params: { email?: string, username?: string, password: string }) : Promise<string> {
    const { email, username, password } = params;

    const user = await this.userService.findByLogin({ email, username });

    if (!user) { return Promise.resolve(null); }

    const { secret, salt } = user;

    const vault = new Vault();
    const valid = await vault.verify(password, { secret, salt });

    if (!valid) { return Promise.resolve(null); }

    return this.createToken(user.id);
  }

  public async authenticate (token: string) : Promise<IUser> {
    const result = await this.authTokenRepository.findBy({ token });
    if (!result) { return Promise.resolve(null); }

    const expiresAt = addSeconds(new Date(), this.ttl);

    await this.authTokenRepository.update({ id: result.id }, { expiresAt });

    return await this.userService.find(result.userId);
  }

  private async createToken(userId) : Promise<string> {
    const token = crypto.randomBytes(64).toString('base64');
    const expiresAt = addSeconds(new Date(), this.ttl);

    await this.authTokenRepository.create({ userId, token, expiresAt });

    return Promise.resolve(token);
  }

  private get ttl () {
    return parseInt(process.env.SESSION_TTL, 10) || 7 * 24 * 60 * 60;
  }
}
