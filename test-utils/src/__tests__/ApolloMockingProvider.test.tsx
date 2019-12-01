import React from 'react';
import { mount } from 'enzyme';
import { ApolloMockingProvider } from '../ApolloMockingProvider';

describe('<ApolloMockingProvider />', () => {
  it('renders without exploding', () => {
    const wrapper = mount(<ApolloMockingProvider />);
    expect(wrapper.is(ApolloMockingProvider)).toBe(true);
  });
});
