import { Container } from 'inversify';
import "reflect-metadata";

import { Knex, Types as CoreTypes } from '@src/core';
import * as IKnex from 'knex';

import { Context } from '@src/graphql';
import * as Repositories from '@src/repositories';
import * as Services from '@src/services';

// create the container
const container = new Container({ skipBaseClassChecks: true });

// bind knex
container.bind<IKnex>(CoreTypes.Knex).toConstantValue(Knex);
// bind repositories
Repositories.bind(container);
// bind services
Services.bind(container);
// bind GraphQL context
Context.bind(container);

export { container };
