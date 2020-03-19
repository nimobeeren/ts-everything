import { Server } from 'http';
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
  let httpServer: Server;
  beforeAll(() => {
    httpServer = start(process.env.PORT || 4000);
  });
  afterAll(() => {
    httpServer.close();
  });

  it('responds to HTTP requests on the GraphQL endpoint', async () => {
    const response = await request(httpServer).post('/graphql');
    // We don't care exactly what the response is, as long as we get one
    // The implementation of the GraphQL server is not our responsiblity
    expect(response.status).toMatchSnapshot();
  });

  it('serves a file list', async () => {
    // create a test server to test against
    const apolloServer = new ApolloServer({ typeDefs, resolvers });

    // use the test server to create a query function
    const { query } = createTestClient(apolloServer);

    // run query against the server and snapshot the output
    const res = await query({ query: FileListDocument });
    expect(res).toMatchSnapshot();
  });
});
