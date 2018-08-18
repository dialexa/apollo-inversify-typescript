import { mergeTypes } from 'merge-graphql-schemas';

import { typeDefs as authTypes } from '@src/graphql/auth';
import { typeDefs as userTypes } from '@src/graphql/users';

export default mergeTypes([ authTypes, userTypes ], { all: true });
