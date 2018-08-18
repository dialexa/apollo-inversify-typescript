import * as Chance from 'chance';

interface IRandomUser {
  username: string;
  email: string;
  password: string;
}

interface IMixins {
  username(): string,
  password(): string,
  user(args?: { username?: string, email?: string, password?: string }): IRandomUser
}

const random = new Chance() as Chance.Chance & IMixins;

random.mixin({
  username: () : string => random.word({ length: 8 }),
  password: () : string => random.word({ length: 8 }),
  user: (args: { username?: string, email?: string, password?: string } = {}) : IRandomUser => {
    const username = random.username();
    const email = random.email({ domain: 'dialexa.com' });
    const password = random.password()

    return Object.assign({}, { username, email, password }, args);
  }
});

export default random;
