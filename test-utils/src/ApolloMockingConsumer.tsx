import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';

const GET_FOO = gql`
  query Foo {
    foo
  }
`;
type FooQuery = {
  foo: string;
};

// Helper component that is used to inspect the query result
export const Child: React.FC<{ result: QueryResult<FooQuery> }> = () => <React.Fragment />;

// Helper component that consumes Apollo context by executing a query
export const ApolloMockingConsumer: React.FC = () => {
  return <Child result={useQuery<FooQuery>(GET_FOO)} />;
};
