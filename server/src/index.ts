import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import { ApolloServer } from 'apollo-server-koa';
import typeDefs from './schema.graphql';
import { resolvers } from './api';

const PORT = process.env.PORT || 3000;

async function start(): Promise<void> {
  const app = new Koa();

  // Register API middleware
  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });

  // Serve static client build in production
  if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode');
    const staticPath = path.resolve(__dirname, '../../client/dist');
    app.use(serve(staticPath));
  }

  app.listen(PORT);
  console.info(`🚀  Server listening on port ${PORT}`);
}

start();
