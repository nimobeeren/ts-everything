import React from 'react';
import { makeExecutableSchema, addMockFunctionsToSchema, IMocks } from 'graphql-tools';
import ApolloClient from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { GraphQLError } from 'graphql';
import { ApolloLink, Observable, split } from 'apollo-link';
import typeDefs from '../../graphql/src/schema.graphql';

interface ApolloMockingProviderProps {
  mocks?: IMocks;
  errors?: GraphQLError[];
}

export const ApolloMockingProvider: React.FC<ApolloMockingProviderProps> = ({
  mocks,
  errors,
  children
}) => {
  // Create a link that will return an error if they are passed
  const errorLink = new ApolloLink(() => {
    return new Observable(observer => {
      observer.next({ errors });
      observer.complete();
    });
  });

  // Create a link that takes a query and returns a mocked result
  const schema = makeExecutableSchema({ typeDefs });
  addMockFunctionsToSchema({ schema, mocks });
  const schemaLink = new SchemaLink({ schema });

  // If errors are defined, use the error link, otherwise use the mocked schema link
  const splitLink = split(() => !!errors, errorLink, schemaLink);

  const mockedClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={mockedClient}>{children}</ApolloProvider>;
};
