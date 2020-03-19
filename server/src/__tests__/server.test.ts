import { ApolloServer } from 'apollo-server-koa';
import { createTestClient } from 'apollo-server-testing';
import request from 'supertest';
import typeDefs from '../../../graphql/src/schema.graphql';
import { resolvers } from '../api';
import { FileListDocument } from '../../../graphql/src';
import { start } from '../server';

jest.mock('../../../graphql/src/schema.graphql');
jest.mock('../api');

describe('Server', () => {
  it('responds to HTTP requests', async () => {
    const server = start(process.env.PORT || 4000);
    const response = await request(server).get('/');
    expect(response).not.toBeNull();
    server.close();
  });

  it('fetches file list', async () => {
    // create a test server to test against, using our production typeDefs,
    // resolvers, and dataSources.
    const server = new ApolloServer({ typeDefs, resolvers });

    // use the test server to create a query function
    const { query } = createTestClient(server);

    // run query against the server and snapshot the output
    const res = await query({ query: FileListDocument });
    expect(res).toMatchSnapshot();
  });

  // TODO: test some GraphQL requests
});
