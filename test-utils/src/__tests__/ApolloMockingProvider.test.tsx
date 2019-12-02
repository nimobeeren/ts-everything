import React from 'react';
import { mount } from 'enzyme';
import { ApolloConsumer, useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { ApolloMockingProvider } from '../ApolloMockingProvider';
import { IMocks } from 'graphql-tools';
import gql from 'graphql-tag';
import { act } from 'react-dom/test-utils';

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

      const TestConsumer: React.FC = () => {
        const { loading, error, data } = useQuery(GET_FOO);
        if (!loading) {
          expect(error).toBeUndefined();
          expect(data).toHaveProperty('foo.bar', 'baz');
          done();
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
});
