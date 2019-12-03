import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { GraphQLError } from 'graphql';
import { IMocks } from 'graphql-tools';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { ApolloConsumer, useQuery } from '@apollo/react-hooks';
import { ApolloMockingProvider } from '../ApolloMockingProvider';

// Mock the schema so we are really just testing the component itself
jest.mock('../../../graphql/src/schema.graphql');

describe('<ApolloMockingProvider />', () => {
  it('renders without exploding', () => {
    const wrapper = mount(<ApolloMockingProvider />);
    expect(wrapper.is(ApolloMockingProvider)).toBe(true);
  });

  it('renders its children', () => {
    const wrapper = mount(
      <ApolloMockingProvider>
        <div id="child" />
      </ApolloMockingProvider>
    );
    expect(wrapper.find('#child')).toHaveLength(1);
  });

  it('provides Apollo context', done => {
    mount(
      <ApolloMockingProvider>
        <ApolloConsumer>
          {client => {
            expect(client).toBeInstanceOf(ApolloClient);
            done();
            return null;
          }}
        </ApolloConsumer>
      </ApolloMockingProvider>
    );
  });

  it('provides mocked data', async done => {
    await act(async () => {
      const mocks: IMocks = {
        Foo: () => ({
          bar: 'baz'
        })
      };

      const GET_FOO = gql`
        {
          foo {
            bar
          }
        }
      `;

      // Helper component that consumes Apollo context and makes assertions
      const TestConsumer: React.FC = () => {
        const { loading, error, data } = useQuery(GET_FOO);
        if (!loading) {
          expect(error).toBeUndefined();
          expect(data).toHaveProperty('foo');
          expect(data.foo.bar).toBe('baz');
          setImmediate(done); // needs a tick to clean up before calling done
        }
        return null;
      };

      mount(
        <ApolloMockingProvider mocks={mocks}>
          <TestConsumer />
        </ApolloMockingProvider>
      );
    });
  });

  it('provides errors', async done => {
    await act(async () => {
      // What errors we expect to be returned
      const errors = [new GraphQLError('Something went wrong')];

      // It doesn't matter what we request,
      // since the provider should return an error anyway
      const GET_BAR = gql`
        {
          foo {
            bar
          }
        }
      `;

      // Helper component that consumes Apollo context and makes assertions
      const TestConsumer: React.FC = () => {
        const { loading, error } = useQuery(GET_BAR);
        if (!loading) {
          expect(error).toBeDefined();
          expect(error.message).toContain('Something went wrong');
          setImmediate(done); // needs a tick to clean up before calling done
        }
        return null;
      };

      mount(
        <ApolloMockingProvider errors={errors}>
          <TestConsumer />
        </ApolloMockingProvider>
      );
    });
  });
});
