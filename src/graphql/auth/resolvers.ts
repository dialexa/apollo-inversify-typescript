import { IContextProvider } from '@src/graphql/context';
import { UnauthorizedError } from '@src/lib/errors';
import * as Joi from 'joi';

const schemas = {
  session: Joi.object().keys({
    email: Joi.string().email().lowercase().trim(),
    username: Joi.string().lowercase().trim().regex(/^[0-9a-z_]{2,15}$/),
    password: Joi.string().min(6).max(128).required()
  }).xor('email', 'username')
}

interface ISession {
  email: string;
  username: string;
  password: string;
}

export default {
  Mutation: {
    createAccessToken: async (root, query, ctx: IContextProvider) : Promise<{ token: string }> => {
      const credentials: ISession = await Joi.validate(query, schemas.session, { abortEarly: false });
      const token = await ctx.authService.login(credentials);

      if (!token) { throw new UnauthorizedError(); }

      return { token }
    }
  }
}
