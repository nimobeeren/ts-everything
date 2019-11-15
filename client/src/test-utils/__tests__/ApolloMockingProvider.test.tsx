import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { QueryResult } from '@apollo/react-common';
import { useFileListQuery, FileListQuery, FileListQueryVariables } from '../../graphql';
import { ApolloMockingProvider } from '../ApolloMockingProvider';

// Helper component that executes a query by consuming Apollo context
const Consumer: React.FC = () => <Child result={useFileListQuery()} />;

// Helper component that is used to inspect the query result
interface ChildProps {
  result: QueryResult<FileListQuery, FileListQueryVariables>;
}
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
        String: () => 'Baz'
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
      expect(data.files[0].title).toBe('Baz');
      expect(data.files[0].path).toBe('Baz');
    }));
});
