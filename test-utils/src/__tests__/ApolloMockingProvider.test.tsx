import React from 'react';
import { mount } from 'enzyme';
import { ApolloConsumer } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { IMocks } from 'graphql-tools';
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
    const mocks: IMocks = {
      Foo: () => ({
        items: []
      })
    };

    mount(
      <ApolloMockingProvider mocks={mocks}>
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
});
