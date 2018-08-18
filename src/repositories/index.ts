import { Container, decorate, injectable } from 'inversify';
import "reflect-metadata";

import { AuditableRepository, IRepository, Repository } from '@dialexa/knex-plus';
import { IAuthToken, IUser } from '@src/core';

import { default as AuthTokenRepository } from '@src/repositories/auth-token';
import { default as UserRepository } from '@src/repositories/user';

import { default as Types } from '@src/repositories/types';

decorate(injectable(), Repository);
decorate(injectable(), AuditableRepository);

export const bind = (container: Container) => {
  container.bind<IRepository<IAuthToken>>(Types.AuthTokenRepository).to(AuthTokenRepository).inRequestScope();
  container.bind<IRepository<IUser>>(Types.UserRepository).to(UserRepository).inRequestScope();
}

export { Types };
