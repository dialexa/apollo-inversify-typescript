import { container } from '@src/container';
import { IUserService, Types as ServiceTypes } from '@src/services';

exports.seed = async (): Promise<void> => {
  const userService = container.get<IUserService>(ServiceTypes.UserService);

  const username = 'luke';
  const email = 'luke@dialexa.com';
  // tslint:disable-next-line
  const password = 'password';

  await userService.create({ username, email, password });
};
