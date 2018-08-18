import { BadRequestError, UnknownError } from '@src/lib/errors';
import { formatError as formatApolloError, isInstance } from 'apollo-errors';
import { GraphQLError } from 'graphql';
import * as _ from 'lodash';

class ServerError {
  constructor (private err: GraphQLError) { }

  get isValidationError() : boolean {
    return _.get(this.err, ['extensions', 'exception', 'isJoi'], false);
  }

  get isApolloError () : boolean {
    return isInstance(this.err.originalError);
  }

  get validationErrors() : string[] {
    const details = _.get(this.err, ['extensions', 'exception', 'details'], []);
    return details.map(detail => detail.message.split('\"').join(''));
  }
}

export default function formatError(err: GraphQLError) {
  const error = new ServerError(err);

  if (error.isApolloError) { return formatApolloError(err); }

  if (error.isValidationError) {
    return formatApolloError(new BadRequestError({
      data: { validationErrors: error.validationErrors }
    }));
  }

  return formatApolloError(new UnknownError());
}
