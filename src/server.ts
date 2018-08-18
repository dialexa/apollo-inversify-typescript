import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';

import { container } from '@src/container';
import { formatError, resolvers, typeDefs } from '@src/graphql';
import { IContextProvider, Type as ContextProviderType } from '@src/graphql/context';

export default class Server {
  public start () : void {
    const context = ({ req }) => {
      const info = container.get<IContextProvider>(ContextProviderType);

      return Object.assign(info, { headers: req.headers })
    }

    const server = new ApolloServer({ context, formatError, resolvers, typeDefs });

    const app = express();
    server.applyMiddleware({ app });

    const port = parseInt(process.env.APP_PORT, 10) || 3000;

    app.listen(port, () => console.log('🚀 Server is listening at: ', port));
  }
}
