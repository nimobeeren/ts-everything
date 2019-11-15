import React from 'react';
import { makeExecutableSchema, addMockFunctionsToSchema, IMockOptions } from 'graphql-tools';
import ApolloClient from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import typeDefs from '../../../server/src/schema.graphql';

interface ApolloMockingProviderProps {
  mocks?: IMockOptions['mocks'];
}

export const ApolloMockingProvider: React.FC<ApolloMockingProviderProps> = ({ mocks, children }) => {
  const schema = makeExecutableSchema({ typeDefs });
  addMockFunctionsToSchema({ schema, mocks });

  const mockedClient = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={mockedClient}>{children}</ApolloProvider>;
};
