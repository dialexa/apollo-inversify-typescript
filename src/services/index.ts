import { Container } from 'inversify';
import "reflect-metadata";

import { IAuthService, IUserService } from '@src/services/interfaces';

import { default as Types } from '@src/services/types';

import { default as AuthService } from '@src/services/auth';
import { default as UserService } from '@src/services/user';

export const bind = (container: Container) => {
  container.bind<IAuthService>(Types.AuthService).to(AuthService).inRequestScope();
  container.bind<IUserService>(Types.UserService).to(UserService).inRequestScope();
}

export { IAuthService, IUserService };

export { Types };
