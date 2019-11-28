import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { QueryResult } from '@apollo/react-common';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ApolloMockingProvider } from '../ApolloMockingProvider';

jest.mock('../../../graphql/src/schema.graphql');

const GET_FOO = gql`
  query Foo {
    foo
  }
`;
type FooQuery = {
  foo: string;
};
// Helper component that consumes Apollo context by executing a query
const Consumer: React.FC = () => {
  return <Child result={useQuery<FooQuery>(GET_FOO)} />;
};

interface ChildProps {
  result: QueryResult<FooQuery>;
}
// Helper component that is used to inspect the query result
const Child: React.FC<ChildProps> = () => <React.Fragment />;

describe('<ApolloMockingProvider />', () => {
  it('provides some mocked data', () =>
    act(async () => {
      const wrapper = mount(
        <ApolloMockingProvider>
          <Consumer />
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
          <Consumer />
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
