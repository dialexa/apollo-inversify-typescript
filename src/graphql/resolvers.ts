import { mergeResolvers } from 'merge-graphql-schemas';

import { resolvers as auth } from '@src/graphql/auth';
import { resolvers as users } from '@src/graphql/users';

export default mergeResolvers([ auth, users ], { all: true });
