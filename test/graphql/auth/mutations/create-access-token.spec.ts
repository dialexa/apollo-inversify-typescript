import AuthResolvers from '@src/graphql/auth/resolvers';
import UserResolvers from '@src/graphql/users/resolvers';
import { context, db, random } from '@test/utils';
import { expect } from 'chai';

describe('(Auth) (Mutations)', () => {
  beforeEach(() => db.clear());

  afterEach(() => db.clear());

  describe('createAccessToken', () => {
    const createUserResolver = UserResolvers.Mutation.createUser;
    const createAccessTokenResolver = AuthResolvers.Mutation.createAccessToken;

    it('(by username) should create an access token for a user', async () => {
      const { email, username, password } = random.user();
      await createUserResolver(null, { email, username, password }, context);

      const result = await createAccessTokenResolver(null, { username, password }, context);

      expect(typeof result).to.equal('object');
      expect(result.token).to.exist;
    });

    it('(by email) should create an access token for a user', async () => {
      const { email, username, password } = random.user();
      await createUserResolver(null, { email, username, password }, context);

      const result = await createAccessTokenResolver(null, { email, password }, context);

      expect(typeof result).to.equal('object');
      expect(result.token).to.exist;
    });
  });
});
