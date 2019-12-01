import { ApolloServer } from 'apollo-server-koa';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../../graphql/src/schema.graphql';
import { resolvers } from '../api';
import { FileListDocument } from '../../../graphql/src';

describe('Integration: Server', () => {
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
});
