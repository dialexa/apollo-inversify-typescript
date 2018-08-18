import { Container, inject, injectable } from "inversify";
import "reflect-metadata";

import { IUser } from '@src/core';
import {
  IAuthService,
  IUserService,
  Types
} from '@src/services';

export const Type = Symbol.for('ContextProvider');

export interface IContextProvider {
  authService: IAuthService;
  userService: IUserService;
}

export interface IContext {
  authService: IAuthService;
  userService: IUserService;
  headers: { authorization?: string };
  user?: IUser;
}

@injectable()
class ContextProvider implements IContextProvider {
  @inject(Types.AuthService)
  public authService: IAuthService;

  @inject(Types.UserService)
  public userService: IUserService;
}

export default {
  bind (container: Container) {
    container.bind<IContextProvider>(Type).to(ContextProvider).inRequestScope();
  }
}
