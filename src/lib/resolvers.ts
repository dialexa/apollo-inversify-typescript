import { IContext } from '@src/graphql/context';
import { UnauthorizedError } from '@src/lib/errors';
import { createResolver } from 'apollo-resolvers';

export const isAuthenticatedResolver = createResolver(
  async (root, query, context: IContext) => {
    const { authService, headers } = context;

    if (!headers.authorization || !(typeof headers.authorization === 'string')) {
      throw new UnauthorizedError();
    }

    const token = headers.authorization.replace(/Bearer /, '');
    const user = await authService.authenticate(token);

    if (!user) { throw new UnauthorizedError(); }

    Object.assign(context, { user });
  }
);
