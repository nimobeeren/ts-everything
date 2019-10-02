import path from 'path';
import fs from 'fs';
import Koa from 'koa';
import koaWebpack from 'koa-webpack';
import serve from 'koa-static';
import { ApolloServer } from 'apollo-server-koa';
import { webpackDevConfig } from '../../webpack.dev';
import { webpackProdConfig } from '../../webpack.prod';
import { resolvers } from './api';

const PORT = process.env.PORT || 3000;

async function start(): Promise<void> {
  const app = new Koa();

  // Register API middleware
  const typeDefs = fs.readFileSync(path.resolve(__dirname, 'schema.graphql'), 'utf8');
  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });

  // Serve client
  if (process.env.NODE_ENV !== 'production') {
    // Use middleware to support HMR
    const devMiddleware = await koaWebpack({ config: webpackDevConfig });
    app.use(devMiddleware);

    // Serve HTML from memory, generated by HTML Webpack Plugin
    app.use(async ctx => {
      const filename = path.resolve(webpackDevConfig.output.path, 'index.html');
      const devFs = devMiddleware.devMiddleware.fileSystem;
      ctx.response.type = 'html';
      ctx.response.body = devFs.createReadStream(filename);
    });
  } else {
    // Serve static build
    console.log('Running in production mode');
    const staticPath = webpackProdConfig.output.path;
    app.use(serve(path.resolve(staticPath)));
  }

  app.listen(PORT);
  console.info(`🚀 Server listening on port ${PORT}`);
}

start();
