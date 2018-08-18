import { createError } from 'apollo-errors';
import * as _ from 'lodash';

export const isConflictError = err =>
  _.get(err, 'message', '').indexOf('duplicate key value violates unique constraint') >= 0;

export const BadRequestError = createError('BadRequestError', {
  message: 'A bad request was detected'
});

export const UnauthorizedError = createError('UnauthorizedError', {
  message: 'Unauthorized'
});

export const UnknownError = createError('UnknownError', {
  message: 'An unexpected error has occurred'
});

export const UserAlreadyExistsError = createError('UserAlreadyExistsError', {
  message: 'A user with this email or username already exists'
});
