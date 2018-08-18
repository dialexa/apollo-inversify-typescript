import { IContext } from '@src/graphql/context';
import { isAuthenticatedResolver } from '@src/lib/resolvers';
import * as Joi from 'joi';

const schemas = {
  create: Joi.object().keys({
    email: Joi.string().email().lowercase().trim().required(),
    username: Joi.string().lowercase().trim().regex(/^[0-9a-z_]{2,15}$/).required(),
    password: Joi.string().min(6).max(128).required()
  })
}

interface ICredentials {
  email: string;
  username: string;
  password: string;
}

export default {
  Query: {
    profile: isAuthenticatedResolver.createResolver(
      (root, query, { user }: IContext) => user
    ),
    users: isAuthenticatedResolver.createResolver(
      (root, query, { userService }: IContext) => userService.list()
    )
  },
  Mutation: {
    createUser: async (root, query, ctx: IContext) : Promise<boolean> => {
      const credentials: ICredentials = await Joi.validate(query, schemas.create, { abortEarly: false });
      await ctx.userService.create(credentials);

      return true;
    }
  }
}
