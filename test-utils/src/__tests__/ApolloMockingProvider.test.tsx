import React from 'react';
import { GraphQLError } from 'graphql';
import { IMocks } from 'graphql-tools';
import gql from 'graphql-tag';
import { render as renderWithoutProviders, wait } from '@testing-library/react';
import { useQuery } from '@apollo/react-hooks';
import { ApolloMockingProvider } from '../ApolloMockingProvider';

// Mock the schema so we are really just testing the component itself
jest.mock('../../../graphql/src/schema.graphql');

// An example query that is valid within the mocked schema
const GET_FOO = gql`
  {
    foo {
      bar
    }
  }
`;

describe('<ApolloMockingProvider />', () => {
  it('renders without exploding', async () => {
    renderWithoutProviders(<ApolloMockingProvider />);
    await wait();
  });

  it('renders its children', () => {
    const { getByTestId } = renderWithoutProviders(
      <ApolloMockingProvider>
        <div data-testid="child" />
      </ApolloMockingProvider>
    );
    expect(getByTestId('child')).toBeInTheDocument();
  });

  it('provides mocked data', async done => {
    const mocks: IMocks = {
      Foo: () => ({
        bar: 'baz'
      })
    };

    // Helper component that consumes Apollo context and makes assertions
    const TestConsumer: React.FC = () => {
      const { loading, error, data } = useQuery(GET_FOO);
      if (!loading) {
        expect(error).toBeUndefined();
        expect(data).toHaveProperty('foo');
        expect(data.foo.bar).toBe('baz');
        done();
      }
      return null;
    };

    renderWithoutProviders(
      <ApolloMockingProvider mocks={mocks}>
        <TestConsumer />
      </ApolloMockingProvider>
    );

    await wait();
  });

  it('provides loading state on first render', async done => {
    let firstRender = true;

    // Helper component that consumes Apollo context and makes assertions
    const TestConsumer: React.FC = () => {
      const { loading } = useQuery(GET_FOO);
      if (firstRender) {
        expect(loading).toBe(true);
        firstRender = false;
        done();
      }
      return null;
    };

    renderWithoutProviders(
      <ApolloMockingProvider>
        <TestConsumer />
      </ApolloMockingProvider>
    );

    await wait();
  });

  it('provides errors', async done => {
    // What errors we expect to be returned
    const errors = [new GraphQLError('Something went wrong')];

    // Helper component that consumes Apollo context and makes assertions
    const TestConsumer: React.FC = () => {
      // It doesn't matter what we request,
      // since the provider should return an error anyway
      const { loading, error } = useQuery(GET_FOO);
      if (!loading) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Something went wrong');
        done();
      }
      return null;
    };

    renderWithoutProviders(
      <ApolloMockingProvider errors={errors}>
        <TestConsumer />
      </ApolloMockingProvider>
    );

    await wait();
  });
});
