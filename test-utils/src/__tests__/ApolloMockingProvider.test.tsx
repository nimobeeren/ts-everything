import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { ApolloMockingProvider } from '../ApolloMockingProvider';
import { ApolloMockingConsumer, Child } from '../ApolloMockingConsumer';

jest.mock('../../../graphql/src/schema.graphql');

describe('<ApolloMockingProvider />', () => {
  it('renders without exploding', () => {
    const wrapper = mount(<ApolloMockingProvider />);
    expect(wrapper.is(ApolloMockingProvider)).toBe(true);
  });

  it('provides some mocked data', () =>
    act(async () => {
      const wrapper = mount(
        <ApolloMockingProvider>
          <ApolloMockingConsumer />
        </ApolloMockingProvider>
      );

      await wait();
      wrapper.update();

      const child = wrapper.find(Child);
      expect(child.prop('result').data).toBeDefined();
    }));

  it('uses passed mocks', () =>
    act(async () => {
      const mocks = {
        String: () => 'bar'
      };

      const wrapper = mount(
        <ApolloMockingProvider mocks={mocks}>
          <ApolloMockingConsumer />
        </ApolloMockingProvider>
      );

      await wait();
      wrapper.update();

      const child = wrapper.find(Child);
      const { data } = child.prop('result');
      expect(data).toBeDefined();
      expect(data.foo).toBe('bar');
      expect(data.foo).toBe('bar');
    }));
});
