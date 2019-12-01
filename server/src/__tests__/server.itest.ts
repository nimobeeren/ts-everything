import { ApolloServer } from 'apollo-server-koa';
import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import typeDefs from '../../../graphql/src/schema.graphql';
import { resolvers } from '../api';
import GET_FILE_LIST from '../../../graphql/src/documents/queries.graphql';

describe('Integration: Server', () => {
  it('fetches file list', async () => {
    console.log({ GET_FILE_LIST });
    const parsed = gql`
      ${GET_FILE_LIST}
    `;
    console.log(JSON.stringify(parsed, null, 2));

    // create a test server to test against, using our production typeDefs,
    // resolvers, and dataSources.
    const server = new ApolloServer({ typeDefs, resolvers });

    // use the test server to create a query function
    const { query } = createTestClient(server);

    // run query against the server and snapshot the output
    const res = await query({ query: GET_FILE_LIST });
    expect(res).toMatchSnapshot();
  });
});
