import AuthResolvers from '@src/graphql/auth/resolvers';
import UserResolvers from '@src/graphql/users/resolvers';
import { context, db, random } from '@test/utils';
import { expect } from 'chai';

describe('(Users) (Queries) profile', () => {
  beforeEach(() => db.clear());

  afterEach(() => db.clear());

  const createAccessTokenResolver = AuthResolvers.Mutation.createAccessToken;
  const createUserResolver = UserResolvers.Mutation.createUser;
  const profileUserResolver = UserResolvers.Query.profile;

  it('should return a user\'s profile', async () => {
    const { email, username, password } = random.user();
    await createUserResolver(null, { email, username, password }, context);

    const { token } = await createAccessTokenResolver(null, { username, password }, context);
    const authorization = `Bearer ${token}`;
    const headers = { authorization };

    const profile = await profileUserResolver(null, null, Object.assign({}, context, { headers }), null);

    expect(profile).to.not.be.undefined;

    expect(profile.id).to.exist;
    expect(profile.email).to.equal(email);
    expect(profile.username).to.equal(username);
  });
});
