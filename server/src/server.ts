import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import { ApolloServer } from 'apollo-server-koa';
import cors from '@koa/cors';
import typeDefs from '../../graphql/schema.graphql';
import { resolvers } from './api';

export function start(port: number | string) {
  const app = new Koa();

  // Register API middleware
  const apollo = new ApolloServer({ typeDefs, resolvers });
  apollo.applyMiddleware({ app });

  // Enable CORS to allow access from client
  app.use(cors());

  // Serve static client build in production
  if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode');
    const staticPath = path.resolve(__dirname, '../../client/dist');
    app.use(serve(staticPath));
  }

  const server = app.listen(port);
  console.info(`🚀  Server listening on port ${port}`);
  return server;
}
