import { inject, injectable } from 'inversify';
import "reflect-metadata";

import { AuditableRepository } from '@dialexa/knex-plus';
import * as Knex from 'knex';

import { IUser, Types as CoreTypes } from '@src/core';

@injectable()
export default class UserRepository extends AuditableRepository<IUser> {
  constructor (@inject(CoreTypes.Knex) knex: Knex) {
    super(knex, 'users');
  }
}
