import UserResolvers from '@src/graphql/users/resolvers';
import { context, db, random } from '@test/utils';
import { expect } from 'chai';

describe('(Users) (Mutations) createUser', () => {
  beforeEach(() => db.clear());

  afterEach(() => db.clear());

  const createUserResolver = UserResolvers.Mutation.createUser;

  it('should create a user', async () => {
    const { email, username, password } = random.user();
    const result = await createUserResolver(null, { email, username, password }, context);

    expect(result).to.be.true;

    const user = await db.knex('users').first();

    expect(user).to.not.be.undefined;
    expect(user.email).to.equal(email);
    expect(user.username).to.equal(username);
  });
});
