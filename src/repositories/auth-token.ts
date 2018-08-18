import { inject, injectable } from "inversify";
import "reflect-metadata";

import { Repository } from '@dialexa/knex-plus';
import * as Knex from 'knex';

import { IAuthToken, Types as CoreTypes } from '@src/core';


@injectable()
export default class AuthTokenRepository extends Repository<IAuthToken> {
  constructor (@inject(CoreTypes.Knex) knex: Knex) {
    super(knex, 'auth_tokens');
  }
}
