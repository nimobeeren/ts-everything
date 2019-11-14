import React from 'react';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import ApolloClient from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import typeDefs from '../../../server/src/schema.graphql';

export const ApolloMockingProvider: React.FC = ({ children }) => {
  // TODO: allow overriding schema by prop?
  // TODO: use imported schema
  const schemaString = `
    type Query {
      files: [File!]!
    }
    
    type File {
      title: String
      path: String
    }
  `;

  const schema = makeExecutableSchema({ typeDefs: schemaString });
  addMockFunctionsToSchema({ schema });

  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
